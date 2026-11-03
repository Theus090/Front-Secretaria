import { countType } from "../schemas/count.schema";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCount } from "../service/contagem.service";
import { Control, useForm } from "react-hook-form";
import { obterUserId } from "@/lib/secureStore";
import { useState } from "react";
import { CountForm, CheckCountForm } from "./useContagemViewModel";
import { UpdateCountType } from "@/schemas/countUpdate.schema";
import { Deactivate } from "../service/contagem.service";

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
      queryClient.invalidateQueries({ queryKey: ["contagem"] });
    },

    onError: (error) => {
      console.log(error);
    },
  });

  // const UpdateSalaStatus = useMutation<number, AxiosError, UpdateSalaType>({
  //   mutationFn: ({ id_sala, status }: UpdateSalaType) =>
  //     UpdateStatusSala({ id_sala, status }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["counts"] });
  //   },

  //   onError: (error) => {},
  // });

  const DeactivateCount = useMutation<number, AxiosError, UpdateCountType>({
    mutationFn: ({ id }: UpdateCountType) => Deactivate({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contagem"] });
    },

    onError: (error) => {},
  });

  const onSubmit =
    (ctrl: Control<CountForm>, sala_id: string) => (data: CountForm) => {
      console.log(data);
      const payload = {
        count: data.count,
        status: 1,
        classroom: sala_id,
        user: usuarioId,
      };
      createNewCount.mutateAsync(payload);
    };

  const onCheck = (id: number) => {
    const payload = {
      id: id,
    };

    DeactivateCount.mutateAsync(payload);
  };

  return {
    onSubmit,
    onCheck,
    control,
    handleSubmit,
    obterUserId,
    errorsCount: errors,
  };
}
