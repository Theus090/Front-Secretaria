import { useCallback, useState } from "react";
import { ListCounts, ListSalas } from "@/service/contagem.service";
import { useQuery } from "@tanstack/react-query";

export type CountForm = {
  count: number;
};

export type CountSubmit = CountForm & {
  id_sala: string;
};

export default function useContagemViewModel() {
  const data = new Date();

  const fetchSalas = useQuery({
    queryKey: ["salas"],
    queryFn: ListSalas,
  });

  const fetchCounts = useQuery({
    queryKey: ["counts"],
    queryFn: ListCounts,
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
    salas: fetchSalas.data || [],
    count: fetchCounts.data || [],
    isError: fetchCounts.isError,
    isLoading: fetchCounts.isLoading,
    isRefreshing: fetchCounts.isRefetching,
    aoAtualizar,
    dataFormatada,
  };
}
