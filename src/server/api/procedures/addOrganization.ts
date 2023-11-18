import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";
import chains from "~/lib/chains";

const addOrganization = publicProcedure
  .input(
    z.object({
      name: z.string(),
      creatorAddress: z.string(),
      chainId: z.number(),
      pubKey: z.string(),
      signerAddress: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const chainExists = chains.some((chain) => chain.chainId === input.chainId);
    if (!chainExists) {
      throw new Error("Invalid chain ID");
    }
    const newOrganization = await db.organization.create({
      data: {
        name: input.name,
        creatorAddress: input.creatorAddress,
        chainId: input.chainId,
        pubKey: input.pubKey,
        signerAddress: input.signerAddress,
      },
    });
    return { newOrganization };
  });

export default addOrganization;
