import api from "@/lib/axios.config";
import { AbaProps } from "../components/MenuAbas/MenuAbas";

type ListCargosResponse = {
  data: AbaProps[];
};

export async function FetchCargos(): Promise<AbaProps[]> {
  const { data } = await api.get<ListCargosResponse>("/api/helper/");

  return data.data;
}
