import { BaixaSchema } from "@/schemas/baixa";
import { Baixa, CreateBaixa } from "@/service/baixa.service";
import { GetTaskById } from "@/service/task.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import z from "zod";
import * as ImagePicker from "expo-image-picker"
import { useState } from "react";
import { obterUserId } from "@/lib/secureStore";


export type BaixaFormData = z.infer<typeof BaixaSchema>

export default function useBaixaViewModel() {
    const { task } = useLocalSearchParams<{ task: string }>();

    const fetchTaskById = useQuery({
        queryKey: ["task", task],
        queryFn: () => GetTaskById(task)
    })

    const [imagem, setImagem] = useState<ImagePicker.ImagePickerAsset | null>(null)

    const form = useForm<BaixaFormData>({
        resolver: zodResolver(BaixaSchema),
        defaultValues: { observation: "" },
    });

    const handleSubmitBaixa = useMutation({
        mutationFn: (payload: CreateBaixa) => Baixa(payload),
        onSuccess: () => Alert.alert("Baixa efetuada"),
        onError: () => Alert.alert("Erro ao dar baixa")
    })

    const onSubmit = form.handleSubmit(async (values) => {
        if (!fetchTaskById.data) {
            Alert.alert("Erro", "Task não carregada")
            return
        }

        const userId = await obterUserId()
        if (!userId) {
            Alert.alert("Erro", "Usuário não autenticado")
            return
        }

        const payload: CreateBaixa = {
            observation: values.observation,
            id_req: fetchTaskById.data.id_requisicao,
            id_user: userId,
            date: new Date().toISOString(),
            img: imagem
                ? {
                    uri: imagem.uri,
                    name: imagem.fileName ?? "foto.jpg",
                    type: imagem.mimeType ?? "image/jpeg",
                }
                : undefined,
        }

        handleSubmitBaixa.mutate(payload)
    })

    return {
        task: fetchTaskById.data,
        onSubmit,
        control: form.control,
        imagem,
        setImagem,
        isSubmitting: handleSubmitBaixa.isPending
    }
}