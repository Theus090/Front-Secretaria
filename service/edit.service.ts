// service/updateUser.service.ts
import api from "../lib/axios.config";
import { AtualizarUsuario, PerfilUsuario } from "../types/usuario";

type GetUserByIdResponse = {
  data: PerfilUsuario;
};


export async function getUserById(id: string): Promise<PerfilUsuario> {
  const { data } = await api.get<GetUserByIdResponse>(`/api/users/${id}`);
  return data.data;
}

export async function updateUserById(
  id: string,
  payload: AtualizarUsuario
): Promise<PerfilUsuario> {
  const { data } = await api.patch<PerfilUsuario>(`/api/users/${id}`, payload);
  return data;
}