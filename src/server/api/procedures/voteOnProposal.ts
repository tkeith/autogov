import { publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";

const voteOnProposal = publicProcedure
  .input(z.object({ proposalId: z.number(), vote: z.string() }))
  .mutation(async ({ input }) => {
    const proposal = await db.proposal.update({
      where: { id: input.proposalId },
      data: {
        status: input.vote === "yes" ? "accepted" : "rejected",
      },
    });
    return proposal;
  });

export default voteOnProposal;
