// src/types/usuario.ts
export interface PerfilUsuario {
  id_usuario: number;
  nome: string;
  email: string;
  role: string; // ajuste para o nome real do campo de cargo
}

export type UpdateUsuarioDTO = Pick<PerfilUsuario, "nome" | "email" | "role">;