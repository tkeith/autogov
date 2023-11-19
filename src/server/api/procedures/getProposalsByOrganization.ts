import { publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";

const getProposalsByOrganization = publicProcedure
  .input(z.object({ organizationId: z.number() }))
  .query(async ({ input }) => {
    const proposals = await db.proposal.findMany({
      where: { organizationId: input.organizationId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        creatorAddress: true,
        organizationId: true,
        code: true,
        codeGenerationStatus: true,
        status: true,
        codeIpfsUrl: true,
      },
    });
    return proposals;
  });

export default getProposalsByOrganization;
