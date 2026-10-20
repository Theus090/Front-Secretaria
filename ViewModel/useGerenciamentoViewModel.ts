import { useRouter } from "expo-router";
import { useState, useEffect,useCallback } from "react";
import { PerfilUsuario } from "../types/usuario";
import {userService} from "../service/usersAll.service";

export default function useGerenciamentoViewModel() {

    const router = useRouter();
    const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    
    const PageConfig = () => {
        router.navigate("/configuracao")
    };

  const [users, setUsers] = useState<PerfilUsuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refresh: fetchUsers, PageConfig };
}