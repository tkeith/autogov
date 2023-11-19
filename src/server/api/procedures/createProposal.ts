import { publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";
import getProposalCodeFromDescription from "~/lib/getProposalCodeFromDescription";
import uploadToIpfs from "~/lib/uploadToIpfs";

const createProposal = publicProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      creatorAddress: z.string(),
      organizationId: z.number(),
    }),
  )
  .mutation(async ({ input }) => {
    const proposal = await db.proposal.create({
      data: {
        title: input.title.trim(),
        description: input.description.trim(),
        creatorAddress: input.creatorAddress,
        organizationId: input.organizationId,
        codeGenerationStatus: "pending",
        code: "", // Add this line
        status: "voting",
      },
    });

    // grab the org

    const organization = await db.organization.findUniqueOrThrow({
      where: { id: input.organizationId },
    });

    // Kick off a background task to generate the code
    setImmediate(() => {
      (async () => {
        try {
          const { code, status } = await getProposalCodeFromDescription(
            organization.chainId,
            input.description,
          );
          const ipfsUrl = await uploadToIpfs(
            `proposal_${proposal.id}.js`,
            code,
          );
          await db.proposal.update({
            where: { id: proposal.id },
            data: { code, codeGenerationStatus: status, codeIpfsUrl: ipfsUrl },
          });
        } catch (error) {
          console.error("Error generating proposal code:", error);
          // update proposal status
          await db.proposal.update({
            where: { id: proposal.id },
            data: { codeGenerationStatus: "error" },
          });
        }
      })().catch((error) => {
        console.error("Error generating proposal code:", error);
      });
    });
    return proposal;
  });

export default createProposal;
