import z from "zod";

export const countSchema = z.object({
  count: z.number(),
  status: z.number(),
  classroom: z.string(),
  user: z.string(),
});

export type countType = z.infer<typeof countSchema>;
