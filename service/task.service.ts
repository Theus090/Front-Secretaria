import api from "@/lib/axios.config";
import type { Task } from "@/types/task";

type ListTasksResponse = {
  data: Task[];
};

export async function ListTasksByRole(cargo: string): Promise<Task[]> {
  const { data } = await api.get<ListTasksResponse>(`/api/tasks/listTaskRole/${cargo}`);

  return data.data;
}
