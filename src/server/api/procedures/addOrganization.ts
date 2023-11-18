import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";
import chains from "~/lib/chains";
import { ethers } from "ethers";

const addOrganization = publicProcedure
  .input(
    z.object({
      name: z.string(),
      creatorAddress: z.string(),
      chainId: z.number(),
      signerAddress: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const chainExists = chains.some((chain) => chain.chainId === input.chainId);
    if (!chainExists) {
      throw new Error("The selected chain ID does not exist.");
    }
    const keys = ethers.Wallet.createRandom();
    const newOrganization = await db.organization.create({
      data: {
        name: input.name,
        creatorAddress: input.creatorAddress,
        chainId: input.chainId,
        signerAddress: input.signerAddress,
        privKey: keys.privateKey,
        pubKey: keys.publicKey,
      },
    });
    return { newOrganization };
  });

export default addOrganization;
