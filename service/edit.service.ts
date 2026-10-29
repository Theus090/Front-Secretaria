// service/updateUser.service.ts
import api from "../lib/axios.config";
import { AtualizarUsuario, PerfilUsuario } from "../types/usuario";

export async function updateUserById(
  id: string,
  payload: AtualizarUsuario
): Promise<PerfilUsuario> {
  const { data } = await api.put<PerfilUsuario>(`/api/users/${id}`, payload);
  return data;
}