import { countType } from "../schemas/count.schema";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCount } from "../service/contagem.service";
import { useForm } from "react-hook-form";
import { obterUserId } from "@/lib/secureStore";
import { useCallback, useState } from "react";
import { ListSalas } from "@/service/contagem.service";
import { useQuery } from "@tanstack/react-query";
import { CountForm, CountSubmit } from "./useContagemViewModel";
import { updateSalaSchema, UpdateSalaType } from "@/schemas/sala.schema";
import { UpdateStatusSala } from "../service/contagem.service";

export default function useCountViewModel() {
  const queryClient = useQueryClient();

  const [usuarioId, setUsuarioId] = useState<string>("0");

  obterUserId().then((id) => {
    if (id) {
      setUsuarioId(id);
      return;
    }
    return;
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CountForm>({
    defaultValues: {
      count: 0,
    },
  });

  const createNewCount = useMutation<number, AxiosError, countType>({
    mutationFn: ({ count, status, user, classroom }: countType) =>
      CreateCount({ count, status, classroom, user }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counts"] });
    },

    onError: (error) => {},
  });

  const UpdateSalaStatus = useMutation<number, AxiosError, UpdateSalaType>({
    mutationFn: ({ id_sala, status }: UpdateSalaType) =>
      UpdateStatusSala({ id_sala, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counts"] });
    },

    onError: (error) => {},
  });

  const onSubmit = ({ count, id_sala }: CountSubmit) => {
    const payload = {
      count: count,
      status: 1,
      classroom: id_sala,
      user: usuarioId,
    };

    createNewCount.mutateAsync(payload);

    return;
  };
  
// const checkCount = ({ id_contagem, status }: CheckSubmit) => {
//     const payload = {
//       id_contagem,
//       status
//     };

//     UpdateSalaStatus.mutateAsync(payload)

//     return;
//   };

  return { onSubmit, control, handleSubmit, obterUserId, errorsCount: errors };
}
