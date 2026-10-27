import { Task } from "@/types/task";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

type CartaoDeTaskProps = {
  task: Task;
};

const CartaoDeTask = ({ task }: CartaoDeTaskProps) => {

  const router = useRouter()

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

  const pageRedir = ()=>{
    router.push({
      pathname: "./baixa/[task]",
      params:{
        task: task.id_requisicao

      }
    })
  }

  return (
    <Pressable onPress={pageRedir}>
    <View className="rounded-xl bg-white p-4 border border-gray-200">
      <View className="flex-row items-center justify-between gap-1">
        <View className=" w-3/4">
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
    </Pressable>
  );
};

export default CartaoDeTask;
