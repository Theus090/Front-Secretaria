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

  console.log({count, status, classroom, user})
  const resposta = await api.post("/api/count/", {
    count: Number(count),
    status,
    classroom : classroom.toString(),
    user,
  });

  return resposta.status;
}
