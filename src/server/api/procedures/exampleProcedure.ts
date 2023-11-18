import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";

export default publicProcedure
  .input(z.object({ text: z.string() }))
  .query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  });
