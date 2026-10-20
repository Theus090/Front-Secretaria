import z from "zod";

export const updateSalaSchema = z.object({
  id_sala: z.string(),
  status: z.number(),
});

export type UpdateSalaType = z.infer<typeof updateSalaSchema>;
