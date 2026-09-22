import api from "@/lib/axios.config";
import type { Task } from "@/types/task";

type ListTasksResponse = {
  data: Task[];
};

export async function ListTasks(): Promise<Task[]> {
  const { data } = await api.get<ListTasksResponse>("/api/tasks/listTask");

  //   console.log("Tasks recebidas:", data);

  return data.data;
}
