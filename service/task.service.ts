import api from "@/lib/axios.config";
import type { Task } from "@/types/task";
import { isAxiosError } from "axios";

type ListTasksResponse = {
  data: Task[];
};

export async function ListTasksByRole(cargo: string): Promise<Task[]> {
  const { data } = await api.get<ListTasksResponse>(
    `/api/tasks/listTaskRole/${cargo}`,
  );

  return data.data;
}

export type NovaOrdemServico = {
  data_criacao: string;
  descricao: string;
  prazo_estipulado: string;
  setor_responsavel: string;
  urgencia: "normal" | "Nao-Urgente" | "Urgente";
};

export async function CriarOrdemServico(
  idUsuario: string,
  dados: NovaOrdemServico,
) {
  try {
    const { data } = await api.post(`/api/tasks/newTask/${idUsuario}`, dados);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("STATUS:", error.response?.status);
      console.log("RESPOSTA DO BACKEND:", error.response?.data);
      console.log("URL:", error.config?.baseURL, error.config?.url);
      console.log("MÉTODO:", error.config?.method);
    } else {
      console.log("ERRO INESPERADO:", error);
    }

    throw error;
  }
}
