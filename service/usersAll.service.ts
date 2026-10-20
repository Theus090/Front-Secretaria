import api from '@/lib/axios.config';
import { PerfilUsuario } from '../types/usuario';
import { isAxiosError } from 'axios';

export const userService = {
  async getUsers(): Promise<PerfilUsuario[]> {
    try {
      const { data } = await api.get<PerfilUsuario[]>('/api/users/');
      return data;
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
  },
};