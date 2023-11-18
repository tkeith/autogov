import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";

const exampleProcedure = publicProcedure
  .input(z.object({ text: z.string() }))
  .query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  });

export default exampleProcedure;
