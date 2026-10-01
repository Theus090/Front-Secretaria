import { FetchCargos } from "@/service/cargos.service";
import { ListTasksByRole } from "@/service/task.service";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export default function useHomeViewModel() {
  const [selectedCargo, setSelectedCargo] = useState<string>("teacher");

  const fecthAbas = useQuery({
    queryKey: ["cargos"],
    queryFn: FetchCargos,
  });

  const fetchRequests = useQuery({
    queryKey: ["requests", selectedCargo],
    queryFn: () => ListTasksByRole(selectedCargo),
  });

  const aoAtualizarCargos = useCallback(async () => {
    await fecthAbas.refetch();
  }, [fecthAbas]);

  const aoAtualizarRequisicoes = useCallback(async () => {
    await fetchRequests.refetch();
  }, [fetchRequests]);

  return {
    cargos: fecthAbas.data || [],
    cargoAtual: selectedCargo,
    selecionarCargo: setSelectedCargo,
    isLoadingCargos: fecthAbas.isLoading,
    isErrorinCargos: fecthAbas.isError,
    isRefetchingCargos: fecthAbas.isRefetching,
    aoAtualizarCargos,

    requisicoes: fetchRequests.data || [],
    isLoadingRequisicoes: fetchRequests.isLoading,
    isErrorInRequests: fetchRequests.isError,
    isRefetchingRequests: fetchRequests.isRefetching,
    aoAtualizarRequisicoes,
  };
}
