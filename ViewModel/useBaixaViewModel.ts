import { obterUserId } from "@/lib/secureStore";
import { BaixaSchema } from "@/schemas/baixa";
import { Baixa, CreateBaixa } from "@/service/baixa.service";
import { GetTaskById } from "@/service/task.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import z from "zod";


export type BaixaFormData = z.infer<typeof BaixaSchema>

export default function useBaixaViewModel() {
    const { task } = useLocalSearchParams<{ task: string }>();

    const fetchTaskById = useQuery({
        queryKey: ["task", task],
        queryFn: () => GetTaskById(task)
    })

    const [userId, setUserId] = useState<string | null>(null);
    const [imagem, setImagem] = useState<ImagePicker.ImagePickerAsset | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        obterUserId().then((id) => {
            setUserId(id);
            setIsLoading(false);
        });
    }, []);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<BaixaFormData>({
        resolver: zodResolver(BaixaSchema),
        defaultValues: { observation: "" },
    });

    const handleSubmitBaixa = useMutation({
        mutationFn: (payload: CreateBaixa) => Baixa(payload),
        onSuccess: () => Alert.alert("Baixa efetuada"),
        onError: () => Alert.alert("Erro ao dar baixa")
    })

    const onSubmit = (data: BaixaFormData) => {
        console.log("Aqui")

        if (!userId) {
            Alert.alert("Sessão não carregada", "Aguarde e tente novamente.")
            return
        }

        if (!fetchTaskById.data) {
            Alert.alert("Task nn Carregada  ")
            return
        }

        const payload: CreateBaixa = {
            observation: data.observation,
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
    }
    return {
        task: fetchTaskById.data,
        onSubmit,
        control,
        handleSubmit,
        imagem,
        setImagem,
        isSubmitting: handleSubmitBaixa.isPending,
        isLoadingUser: isLoading
    }
}