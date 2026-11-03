// src/ViewModel/useEditarUsuarioViewModel.ts
import { obterUserId } from "@/lib/secureStore";
import { AtualizarUsuario } from "@/types/usuario";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUserById, updateUserById } from "../service/edit.service";

export default function useEditarUsuarioViewModel() {

    const queryClient = useQueryClient();
    const [usuarioId, setUsuarioId] = useState<string>("0");

    obterUserId().then((id) => {
        if (id) {
            setUsuarioId(id);
            return;
        }
        return;
    });

    const usuarioQuery = useQuery({
        queryKey: ["usuarios", usuarioId],
        queryFn: () => getUserById(usuarioId),
    });

    const updateMutation = useMutation({
        mutationFn: (payload: AtualizarUsuario) => updateUserById(usuarioId, payload),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["usuarios"] });
        },
    });
    return {
        usuario: usuarioQuery.data,
        loading: usuarioQuery.isLoading,
        updateUser: updateMutation.mutate,
        isSaving: updateMutation.isPending,
    };
}