import api from "@/lib/axios.config";
import type { Sala } from "@/types/sala";
import { countType } from "../schemas/count.schema";
import { countSchema } from "../schemas/count.schema";
import { updateSalaSchema, UpdateSalaType } from "../schemas/sala.schema";
import { Contagem } from "@/types/contagem";

type ListSalaResponse = {
  data: Sala[];
};

type ListCountResponse = {
  data: Contagem[];
};

export async function ListSalas(): Promise<Sala[]> {
  const { data } = await api.get<ListSalaResponse>("/api/room/");

  return data.data;
}

export async function ListCounts(): Promise<Contagem[]> {
  const { data } = await api.get<ListCountResponse>("/api/count/");

  return data.data;
}

export async function CreateCount({
  count,
  status,
  classroom,
  user,
}: countType): Promise<number> {
  console.log({ count, status, classroom, user });
  const resposta = await api.post("/api/count/", {
    count: Number(count),
    status,
    classroom: classroom.toString(),
    user,
  });
  return resposta.status;
}

export async function UpdateStatusSala({
  id_sala,
  status,
}: UpdateSalaType): Promise<number> {
  console.log({ status });

  const resposta = await api.put("/api/room/", {
    id_sala,
    status,
  });

  return resposta.status;
}
