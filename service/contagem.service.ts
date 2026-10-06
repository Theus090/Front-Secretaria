import api from "@/lib/axios.config";
import type { Sala } from "@/types/sala";
import { countType } from "../schemas/count.schema";
import { countSchema } from "../schemas/count.schema";

type ListSalaResponse = {
  data: Sala[];
};

export async function ListSalas(): Promise<Sala[]> {
  const { data } = await api.get<ListSalaResponse>("/api/room/");

  return data.data;
}

export async function CreateCount({
  count,
  status,
  classroom,
  user,
}: countType): Promise<number> {
  const resposta = await api.post("/api/count/", {
    count,
    status,
    classroom,
    user
  });

  return resposta.status;
}
