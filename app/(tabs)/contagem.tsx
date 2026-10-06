import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import CardContagem from "@/components/CardContagem/CardContagem";
import useContagemViewModel from "@/ViewModel/useContagemViewModel";

const Contagem = () => {
  const {
    salas,
    dataFormatada,
    isError,
    isLoading,
    isRefreshing,
    aoAtualizar,
  } = useContagemViewModel();

  return (
    <View>
      <View className="flex items-start justify-around h-40 bg-[#4a0e0e] p-20 text-3xl">
        <Text className="text-white">Contagem do Lanche</Text>
        <Text className="text-white">{dataFormatada}</Text>
        <View className="flex flex-row gap-3">
          <Text className="text-white">Manhã</Text>
          <Text className="text-white">Tarde</Text>
        </View>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator className="flex-1  bg-white" size="large" />
        ) : (
          <FlatList
            data={salas}
            keyExtractor={(item) => String(item.id_sala)}
            contentContainerStyle={{ padding: 16, gap: 16 }}
            renderItem={({ item }) => <CardContagem  name="count" sala={item}  />}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={aoAtualizar}
              />
            }
            ListEmptyComponent={
              <Text className="mt-10 text-center text-gray-400">
                Nenhuma sala encontrada
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
};

export default Contagem;
