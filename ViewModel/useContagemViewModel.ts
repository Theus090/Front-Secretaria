import { useCallback } from "react";
import { ListSalas } from "@/service/contagem.service";
import { useQuery } from "@tanstack/react-query";

export default function useContagemViewModel() {
  const data = new Date();

  const fetchCounts = useQuery({
    queryKey: ["counts"],
    queryFn: ListSalas,
  });

  const aoAtualizar = useCallback(async () => {
    await fetchCounts.refetch();
  }, [fetchCounts]);

  const dataFormatada = data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return {
    salas: fetchCounts.data || [],
    isError: fetchCounts.isError,
    isLoading: fetchCounts.isLoading,
    isRefreshing: fetchCounts.isRefetching,
    aoAtualizar,
    dataFormatada
  };
}
