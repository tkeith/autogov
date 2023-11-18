import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";
import getOrganizationAddress from "~/lib/getOrganizationAddress";

const getOrganization = publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async ({ input }) => {
    const organization = await db.organization.findUniqueOrThrow({
      where: { id: input.id },
    });
    return {
      organization: {
        id: organization.id,
        name: organization.name,
        creatorAddress: organization.creatorAddress,
        chainId: organization.chainId,
        createdAt: organization.createdAt,
        address: await getOrganizationAddress(organization.id),
      },
    };
  });

export default getOrganization;
