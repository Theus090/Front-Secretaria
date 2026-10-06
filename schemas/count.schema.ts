import z from "zod";

export const countSchema = z.object({
  count: z.number(),
  status: z.number(),
  classroom: z.number(),
  user: z.number(),
});

export type countType = z.infer<typeof countSchema>;
