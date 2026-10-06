import { Task } from "@/types/task";
import { Text, View } from "react-native";

type CartaoDeTaskProps = {
  task: Task;
};

const CartaoDeTask = ({ task }: CartaoDeTaskProps) => {
  const corUrgencia = () => {
    switch (task.urgencia) {
      case "normal":
        return "bg-green-500";
      case "Normal":
        return "bg-green-500";

      case "Nao-Urgente":
        return "bg-yellow-500";

      case "Urgente":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  };
  const formatarUrgencia = (urgencia: Task["urgencia"]) => {
    switch (urgencia) {
      case "Nao-Urgente":
        return "Não urgente";

      case "Urgente":
        return "Urgente";

      case "normal":
        return "Normal";

      default:
        return urgencia;
    }
  };

  return (
    <View className="rounded-xl bg-white p-4 border border-gray-200">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-black">{task.descricao}</Text>

        <View className={`rounded-full px-3 py-1 ${corUrgencia()}`}>
          <Text className="text-sm font-bold text-white">
            {" "}
            {formatarUrgencia(task.urgencia)}
          </Text>
        </View>
      </View>

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
