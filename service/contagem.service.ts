import api from "@/lib/axios.config";
import type { Sala } from "@/types/sala";

type ListSalaResponse = {
  data: Sala[];
};

export async function ListSalas(): Promise<Sala[]> {
  const { data } = await api.get<ListSalaResponse>("/api/room/");

  return data.data;
}
