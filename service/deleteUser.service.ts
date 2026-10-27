// src/service/usersAll.service.ts
import api from "../lib/axios.config";

export async function deleteUserById(id: string): Promise<void> {
  const {status} = await api.delete(`/api/users/${id}`);
  console.log(status)
  return;
}
