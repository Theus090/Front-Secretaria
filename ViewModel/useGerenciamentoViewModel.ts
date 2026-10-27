import { deleteUserById } from "@/service/deleteUser.service";
import { getUsers } from "@/service/usersAll.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Alert } from "react-native";
import { PerfilUsuario } from "../types/usuario";

export default function useGerenciamentoViewModel() {
  const queryClient = useQueryClient();
  const usuariosQuery = useQuery<PerfilUsuario[], AxiosError>({
    queryKey: ["usuarios"],
    queryFn: getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUserById(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
    onError: () => {
      Alert.alert("Erro", "Não foi possível excluir o usuário");
    },
  });

  const deleteUser = (userId: string) => {
    Alert.alert("Excluir usuário", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => deleteMutation.mutateAsync(userId),
      },
    ]);
  };

  const error = !usuariosQuery.error
    ? null
    : !usuariosQuery.error.response
      ? "Sem conexão com o servidor"
      : "Não foi possível carregar os usuários";

  return {
    users: usuariosQuery.data ?? [],
    loading: usuariosQuery.isLoading,
    refreshing: usuariosQuery.isRefetching,
    error,
    refresh: usuariosQuery.refetch,
    deleteUser,
    deleting: deleteMutation.isPending,
  };
}