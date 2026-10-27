import { GetTaskById } from "@/service/task.service";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export default function useBaixaViewModel() {
    const { task } = useLocalSearchParams<{ task: string }>();

    const fetchTaskById = useQuery({
        queryKey: ["task", task],
        queryFn: () => GetTaskById(task)
    })

    return {
        task: fetchTaskById.data
    }
}