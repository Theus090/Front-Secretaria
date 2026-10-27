import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ListCountsRoom, ListSalas } from "@/service/contagem.service";
import { obterCargo } from "@/lib/secureStore";

export type CountForm = { count: number };
export type CountSubmit = CountForm & { id_sala: string };

export default function useContagemViewModel() {
  const [cargo, setCargo] = useState<string>("");
  const [isLoadingCargo, setIsLoadingCargo] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const cargoSalvo = await obterCargo();
        if (ativo) setCargo(cargoSalvo ?? "");
      } catch {
        if (ativo) setErro("Não foi possível carregar o cargo.");
      } finally {
        if (ativo) setIsLoadingCargo(false);
      }
    })();
    return () => {
      ativo = false;
    };
  }, []);

  const dataFormatada = useMemo(
    () =>
      new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [],
  );

  const salasQuery = useQuery({
    queryKey: ["salas"],
    queryFn: ListSalas,
    enabled: !isLoadingCargo && cargo !== "kitchen",
  });

  const contagemQuery = useQuery({
    queryKey: ["contagem"],
    queryFn: ListCountsRoom,
    enabled: !isLoadingCargo && cargo === "kitchen",
  });

  return {
    cargo,
    erro,
    isLoadingCargo,
    dataFormatada,

    salas: salasQuery.data ?? [],
    isLoadingSalas: salasQuery.isLoading,
    isRefreshingSalas: salasQuery.isFetching,
    aoAtualizarSalas: salasQuery.refetch,

    contagem: contagemQuery.data ?? [],
    isLoadingCounts: contagemQuery.isLoading,
    isRefreshingCounts: contagemQuery.isFetching,
    aoAtualizarContagem: contagemQuery.refetch,
  };
}