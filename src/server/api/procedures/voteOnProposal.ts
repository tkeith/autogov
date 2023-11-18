import { publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";
import runProposalCode from "~/lib/runProposalCode";

const voteOnProposal = publicProcedure
  .input(z.object({ proposalId: z.number(), vote: z.string() }))
  .mutation(async ({ input }) => {
    const proposal = await db.proposal.update({
      where: { id: input.proposalId },
      data: {
        status: input.vote === "yes" ? "accepted" : "rejected",
      },
    });

    if (proposal.status === "accepted") {
      // launch runProposalCode in the background
      void runProposalCode(proposal.id);
    }

    return proposal;
  });

export default voteOnProposal;
