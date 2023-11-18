import exampleProcedure from "~/server/api/procedures/exampleProcedure";
import getOrganizations from "~/server/api/procedures/getOrganizations";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exampleProcedure,
  getOrganizations,
});

// export type definition of API
export type AppRouter = typeof appRouter;
