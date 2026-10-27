export type PerfilUsuario = {
  id_usuario: string;
  nome: string;
  email: string;
  cargo: string;
  nif: string;
};

export type AtualizarUsuario = Pick<PerfilUsuario, "nome" | "email">;