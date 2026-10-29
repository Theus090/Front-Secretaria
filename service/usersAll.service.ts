import api from '@/lib/axios.config';
import { isAxiosError } from 'axios';
import { PerfilUsuario } from '../types/usuario';

type ListUsersResponse = {
  data: PerfilUsuario[];
};

export async function getUsers(): Promise<PerfilUsuario[]> {
  try {
    const { data } = await api.get<ListUsersResponse>('/api/users/');

    return data.data;
    
  } catch (e) {
    if (isAxiosError(e)) {
      const status = e.response?.status;
      throw new Error(
        status
          ? `Erro ${status} ao buscar usuários`
          : 'Sem conexão com o servidor'
      );
    }
    throw e;
  }
}