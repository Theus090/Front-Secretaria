import { obterUserId } from "../lib/secureStore";
import { BuscarUsuario } from "../service/user.service";
import { PerfilUsuario } from "../types/usuario";
import { useEffect, useState } from "react";

export const usePerfilViewModel = () => {
  const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const idSalvo = await obterUserId();
        if (!idSalvo) throw new Error("Usuário não logado");

        const id = String(JSON.parse(idSalvo));
        setUsuario(await BuscarUsuario(id));
      } catch {
        setErro("Não foi possível carregar o perfil.");
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  const abrirEdicao = () => {
    // TODO: navegar para a tela de edição quando ela existir
  };

  const salvarPerfil = async (dados: Partial<PerfilUsuario>) => {
    // TODO: chamar a rota de atualização quando existir
    setUsuario((atual) => (atual ? { ...atual, ...dados } : atual));
  };

  return { usuario, carregando, erro, abrirEdicao, salvarPerfil };
};