import z from "zod";

export const updateCountSchema = z.object({
  id: z.number(),
});

export type UpdateCountType = z.infer<typeof updateCountSchema>;
