import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";

const getOrganizations = publicProcedure.input(z.null()).query(async () => {
  const organizations = await db.organization.findMany();
  return { organizations };
});

export default getOrganizations;
