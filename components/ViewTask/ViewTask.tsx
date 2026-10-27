import { Pressable, Text, View } from "react-native";
import { Task } from "@/types/";



type CartaoDeTaskProps = {
  task: Task;
};

const ViewTask = ({})=>{
    return(
            <View className="rounded-xl bg-white p-4 border border-gray-200">
      <View className="flex-row items-center justify-between gap-1">
        <View className="w-3/4">
          <Text className="text-xl font-bold text-black">{task.descricao}</Text>

          <Text className="text-base text-gray-600">
            Setor: {task.setor_responsavel}
          </Text>

          <Text className="text-base text-gray-600">
            Prazo: {new Date(task.prazo_estipulado).toLocaleDateString("pt-BR")}
          </Text>
        </View>

        <View className={`w-1/4 rounded-full px-3 py-1 ${corUrgencia()}`}>
          <Text className="text-sm text-center font-bold text-white">
            {" "}
            {formatarUrgencia(task.urgencia)}
          </Text>
        </View>
      </View>
    </View>
    )
}

export default ViewTask