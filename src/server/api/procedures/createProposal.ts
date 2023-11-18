import { publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";

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
        title: input.title,
        description: input.description,
        creatorAddress: input.creatorAddress,
        organizationId: input.organizationId,
      },
    });
    return proposal;
  });

export default createProposal;
