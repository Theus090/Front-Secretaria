import {
  obterIdUsuarioLogado,
  removerCargo,
  removerUserId,
} from "../lib/secureStore";
import { BuscarUsuario, ExcluirUsuario } from "../service/user.service";
import { PerfilUsuario } from "../types/usuario";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const usePerfilViewModel = () => {
  const router = useRouter();

  const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      const carregar = async () => {
        try {
          const id = await obterIdUsuarioLogado();
          if (!id) throw new Error("Usuário não logado");

          const dados = await BuscarUsuario(id);
          if (ativo) {
            setUsuario(dados);
            setErro(null);
          }
        } catch {
          if (ativo) setErro("Não foi possível carregar o perfil.");
        } finally {
          if (ativo) setCarregando(false);
        }
      };

      carregar();

      return () => {
        ativo = false;
      };
    }, []),
  );

  const abrirEdicao = () => {
    router.push("/editarPerfil");
  };

  const excluirConta = async () => {
    try {
      setExcluindo(true);

      const id = await obterIdUsuarioLogado();
      if (!id) throw new Error("Usuário não logado");

      await ExcluirUsuario(id);

      // Mesmo fluxo do logout do Header: limpa a sessão e volta para o login
      await removerUserId();
      await removerCargo();

      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace("/login");
    } catch {
      Alert.alert("Erro", "Não foi possível excluir a conta");
    } finally {
      setExcluindo(false);
    }
  };

  const confirmarExclusao = () => {
    Alert.alert(
      "Excluir conta",
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: excluirConta },
      ],
    );
  };

  return {
    usuario,
    carregando,
    erro,
    excluindo,
    abrirEdicao,
    confirmarExclusao,
  };
};
