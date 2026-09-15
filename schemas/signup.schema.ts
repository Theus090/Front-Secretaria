
import z from "zod";

enum Cargo {
  direction = "direction",
  teacher = "teacher",
  inspector = "inspector",
  coordination = "coordination",
  kitchen = "kitchen",
  selecionar = "select"
}

export const signUpBase = z.object({
  name: z
    .string()
    .min(5, "Minimo de 5 caracteres")
    .max(50, "Maximo de 50 caracteres"),
  email: z.email("E-mail invalido"),
  password: z
    .string()
    .min(6, "Deve ter no minimo 6 caracteres")
    .regex(/[a-z]/, "Deve ter letra minuscula")
    .regex(/[A-Z]/, "Deve ter letra maiuscula")
    .regex(/\d/, "Deve ter um numero")
    .regex(/[\W_]/, "Deve ter um caractere especial"),
  role: z.enum(['direction','teacher','inspector','coordination','kitchen', 'select']),
  nif: z
  .string()
  .regex(/^[A-Za-z]{2}\d{7}$/, "Deve conter duas letras e 7 numeros").length(9)
});



export type SignUpType = z.infer<typeof signUpBase>;
