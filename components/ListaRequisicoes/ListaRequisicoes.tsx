import { Task } from "@/types/task";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import CartaoDeTask from "../CartaoDeTask/CartaoDeTask";

type ListaRequisicoesProps = {
  requisicoes: Task[];
  carregando: boolean;
  atualizando: boolean;
  aoAtualizar: () => {};
};

const ListaRequisicoes = ({
  requisicoes,
  carregando,
  atualizando,
  aoAtualizar,
}: ListaRequisicoesProps) => {
  return (
    <View>
      {carregando ? (
        <ActivityIndicator className="flex-1  bg-white" size="large" />
      ) : (
        <FlatList
          data={requisicoes}
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

export default ListaRequisicoes;
