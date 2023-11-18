import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";

const getOrganization = publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async ({ input }) => {
    const organization = await db.organization.findUnique({
      where: { id: input.id },
    });
    return { organization };
  });

export default getOrganization;
