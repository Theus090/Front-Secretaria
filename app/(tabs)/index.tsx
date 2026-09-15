import CartaoDeTask from "@/components/CartaoDeTask/CartaoDeTask";
import { ListTasks } from "@/service/task.service";
import { Task } from "@/types/task";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const buscarTasks = useCallback(async () => {
    const data = await ListTasks();
    setTasks(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      buscarTasks().finally(() => setCarregando(false));
    }, [buscarTasks]),
  );

  const aoAtualizar = async () => {
    setAtualizando(true);

    await buscarTasks();

    setAtualizando(false);
  };

  return (
    <View className="flex-1">
      {carregando ? (
        <ActivityIndicator className="flex-1" size="large" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id_requisicao)}
          contentContainerStyle={{ padding: 16, gap: 16 }}
          renderItem={({ item }) => <CartaoDeTask task={item} />}
          refreshControl={
            <RefreshControl refreshing={atualizando} onRefresh={aoAtualizar} />
          }
          ListEmptyComponent={
            <Text className="mt-10 text-center text-gray-400">
              Nenhuma task encontrada
            </Text>
          }
        />
      )}
    </View>
  );
};

export default Home;
