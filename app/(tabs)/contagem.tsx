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

    const {salas, dataFormatada, isError, isLoading, isRefreshing, aoAtualizar} = useContagemViewModel()

  return (
    <View>
      <View className="flex items-baseline justify-center h-300 bg-[#4a0e0e] shadow-lg">
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
            renderItem={({ item }) => <CardContagem sala={item} />}
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
