import api from "../lib/axios.config"
import type { baixa } from "../types/baixa"
import { isAxiosError } from "axios"

export type CreateBaixa = {
    observation?: string
    id_req: string
    id_user: string
    date: string
    img?: { uri: string; name: string; type: string }
}


export async function Baixa(dados: CreateBaixa) {
    try {
        const formData = new FormData()
        formData.append("observation", dados.observation ?? "")
        formData.append("id_req", dados.id_req)
        formData.append("id_user", dados.id_user)
        formData.append("date", dados.date)

        if (dados.img) {
            formData.append("img", {
                uri: dados.img.uri,
                name: dados.img.name,
                type: dados.img.type,
            } as any)
        }





        const { data } = await api.post(`/api/close/close`, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("STATUS:", error.response?.status);
            console.log("RESPOSTA DO BACKEND:", error.response?.data);
            console.log("URL:", error.config?.baseURL, error.config?.url);
            console.log("MÉTODO:", error.config?.method);
        } else {
            console.log("ERRO INESPERADO:", error);
        }

        throw error;
    }

}
