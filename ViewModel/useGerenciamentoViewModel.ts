import { getUsers } from "@/service/usersAll.service";
import { deleteUserById } from '@/service/deleteUser.service'
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert } from "react-native";
import api from "../lib/axios.config";
import { PerfilUsuario } from "../types/usuario";
export default function useGerenciamentoViewModel() {
  const usuariosQuery = useQuery<PerfilUsuario[], AxiosError>({
    queryKey: ["usuarios"],
    queryFn: getUsers,
  });
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const deleteUser = () => {
    Alert.alert("Excluir usuário", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteUserById(id)
            router.back();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a usuário");
          }
        },
      },
    ]);
  };


  const error = !usuariosQuery.error
    ? null
    : !usuariosQuery.error.response
      ? "Sem conexão com o servidor"
      : "Não foi possível carregar os usuários";

  return {
    users: usuariosQuery.data || [],
    loading: usuariosQuery.isLoading,
    refreshing: usuariosQuery.isRefetching,
    error,
    refresh: usuariosQuery.refetch,
    deleteUser

  };
}