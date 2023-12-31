import exampleProcedure from "~/server/api/procedures/exampleProcedure";
import getOrganizations from "~/server/api/procedures/getOrganizations";
import addOrganization from "~/server/api/procedures/addOrganization";
import getOrganization from "~/server/api/procedures/getOrganization";
import getProposalsByOrganization from "~/server/api/procedures/getProposalsByOrganization";
import createProposal from "~/server/api/procedures/createProposal";
import voteOnProposal from "~/server/api/procedures/voteOnProposal";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exampleProcedure,
  getOrganizations,
  addOrganization,
  getOrganization,
  getProposalsByOrganization,
  createProposal,
  voteOnProposal,
});

// export type definition of API
export type AppRouter = typeof appRouter;
