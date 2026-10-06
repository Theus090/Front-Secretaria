import { useCallback, useState } from "react";
import { ListSalas } from "@/service/contagem.service";
import { useQuery } from "@tanstack/react-query";
import { countType } from "../schemas/count.schema";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { CreateCount } from "../service/contagem.service";
import { useForm } from "react-hook-form";
import { obterUserId } from "@/lib/secureStore";

export type CountSubmit ={
  count: number,
  id_sala: number
}
export default function useContagemViewModel() {
  const [usuarioId, setUsuarioId] = useState<number>(0);

  obterUserId().then((id) => {
    if (id) {
      setUsuarioId(parseInt(id));
      return;
    }
    return;
  });

  const data = new Date();

  const fetchCounts = useQuery({
    queryKey: ["counts"],
    queryFn: ListSalas,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      count: 0,
    },
  });

  const createNewCount = useMutation<number, AxiosError, countType>({
    mutationFn: ({ count, status, classroom, user }: countType) =>
      CreateCount({ count, status, classroom, user }),
    onSuccess: () => {},

    onError: (error) => {},
  });

  const aoAtualizar = useCallback(async () => {
    await fetchCounts.refetch();
  }, [fetchCounts]);

  const dataFormatada = data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const onSubmit = ({count, id_sala}: CountSubmit ) => {
    
    const payload = {
      count: count,
      status: 1,
      classroom: id_sala,
      user: usuarioId,
    };
    createNewCount.mutateAsync(payload);

    return;
  };
  return {
    salas: fetchCounts.data || [],
    isError: fetchCounts.isError,
    isLoading: fetchCounts.isLoading,
    isRefreshing: fetchCounts.isRefetching,
    aoAtualizar,
    dataFormatada,
    onSubmit,
    control,
    handleSubmit
  };
}
