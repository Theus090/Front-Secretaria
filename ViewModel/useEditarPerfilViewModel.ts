import { obterIdUsuarioLogado } from "../lib/secureStore";
import { signUpBase, SignUpType } from "../schemas/signup.schema";
import { AtualizarUsuario, BuscarUsuario } from "../service/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { Alert } from "react-native";

const editarPerfilSchema = signUpBase.pick({
  name: true,
  email: true,
  nif: true,
});

export type EditarPerfilType = Pick<SignUpType, "name" | "email" | "nif">;

export default function useEditarPerfilViewModel() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditarPerfilType>({
    resolver: zodResolver(editarPerfilSchema) as unknown as Resolver<EditarPerfilType>,
    defaultValues: { name: "", email: "", nif: "" },
  });

  const {
    data: usuario,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["usuario-logado"],
    queryFn: async () => {
      const id = await obterIdUsuarioLogado();
      if (!id) throw new Error("Usuário não logado");
      return BuscarUsuario(id);
    },
  });

  useEffect(() => {
    if (usuario) {
      reset({
        name: usuario.nome,
        email: usuario.email,
        nif: usuario.nif,
      });
    }
  }, [usuario, reset]);

  const atualizarPerfil = useMutation<
    number,
    AxiosError | Error,
    EditarPerfilType
  >({
    mutationFn: async (dados) => {
      const id = await obterIdUsuarioLogado();

      if (!id) {
        throw new Error("Usuário não logado");
      }

      return AtualizarUsuario(id, dados);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuario-logado"] });
      Alert.alert("Sucesso", "Perfil atualizado com sucesso");
      router.back();
    },

    
    onError: (error) => {
        console.log("Erro completo:", error);
      if (error instanceof AxiosError) {
        console.log("Status:", error.response?.status);
        console.log("Resposta da API:", error.response?.data);

        if (error.response?.status === 409) {
          Alert.alert("E-mail já em uso");
          return;
        }
      } else {
        console.log("Erro:", error.message);
      }

      Alert.alert("Erro", "Não foi possível atualizar o perfil");
    },
  });

  const onSubmit = (dados: EditarPerfilType) => {
    atualizarPerfil.mutate(dados);
  };

  const cancelar = () => {
    router.back();
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isPending: atualizarPerfil.isPending,
    carregando: isLoading,
    erro: isError,
    cancelar,
  };
}