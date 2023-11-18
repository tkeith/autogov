import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";

const addOrganization = publicProcedure
  .input(
    z.object({
      name: z.string(),
      creatorAddress: z.string(),
      chainId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const newOrganization = await db.organization.create({
      data: {
        name: input.name,
        creatorAddress: input.creatorAddress,
        chainId: Number(input.chainId),
      },
    });
    return { newOrganization };
  });

export default addOrganization;
