import z from "zod"

export const BaixaSchema = z.object({
    observation: z.string().optional()
})