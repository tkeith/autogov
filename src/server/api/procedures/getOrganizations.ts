import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";
import getOrganizationAddress from "~/lib/getOrganizationAddress";

const getOrganizations = publicProcedure.input(z.null()).query(async () => {
  const organizations = await db.organization.findMany({});
  // add organization address based on getOrganizationAddress
  const res = await Promise.all(
    organizations.map(async (org) => ({
      id: org.id,
      name: org.name,
      creatorAddress: org.creatorAddress,
      chainId: org.chainId,
      createdAt: org.createdAt,
      address: await getOrganizationAddress(org.id),
    })),
  );
  return {
    organizations: res,
  };
});

export default getOrganizations;
