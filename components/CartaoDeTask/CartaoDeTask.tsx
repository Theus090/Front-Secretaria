import { Task } from "@/types/task";
import { Text, View } from "react-native";

type CartaoDeTaskProps = {
  task: Task;
};

const CartaoDeTask = ({ task }: CartaoDeTaskProps) => {
  return (
    <View className="rounded-xl bg-white p-4 border border-gray-200">
      <Text className="text-xl font-bold text-black">{task.descricao}</Text>

      <Text className="text-base text-gray-600">
        Setor: {task.setor_responsavel}
      </Text>

      <Text className="text-base text-gray-600">
        Prazo: {new Date(task.prazo_estipulado).toLocaleDateString("pt-BR")}
      </Text>
    </View>
  );
};

export default CartaoDeTask;
