import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import CardContagem from "@/components/CardContagem/CardContagem";
import CardConfirmarCount from "@/components/CardConfirmarCount/CardConfirmarCount";
import useContagemViewModel from "@/ViewModel/useContagemViewModel";

const Contagem = () => {
  const {
    cargo,
    isLoadingCargo,
    dataFormatada,
    // salas branch
    salas,
    isLoadingSalas,
    isRefreshingSalas,
    aoAtualizarSalas,
    // kitchen branch
    contagem,
    isLoadingCounts,
    isRefreshingCounts,
    aoAtualizarContagem,
  } = useContagemViewModel();


  console.log(cargo)
  // Wait for cargo before deciding which branch to render
  if (isLoadingCargo) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (cargo == "kitchen") {
    return (
      <View>
        <View className="flex items-center justify-around h-40 bg-[#4a0e0e]">
          <Text className="text-white">Contagem do Lanche</Text>
          <Text className="text-white">{dataFormatada}</Text>
        </View>
        <View>
          {isLoadingCounts ? (
            <ActivityIndicator className="flex-1 bg-white" size="large" />
          ) : (
            <FlatList
              data={contagem}
              keyExtractor={(item) => String(item.id_contagem)}
              contentContainerStyle={{ padding: 16, paddingBottom: 300, gap: 16,}}
              renderItem={({ item }) => (
                <CardConfirmarCount salaContagem={item} />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshingCounts} // ✅ not negated
                  onRefresh={aoAtualizarContagem}
                />
              }
              ListEmptyComponent={
                <Text className="mt-10 text-center text-gray-400">
                  Nenhuma contagem encontrada...
                </Text>
              }
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <View>
      <View className="flex items-center justify-around h-40 bg-[#4a0e0e]">
        <Text className="text-white">Contagem do Lanche</Text>
        <Text className="text-white">{dataFormatada}</Text>
      </View>
      <View>
        {isLoadingSalas ? (
          <ActivityIndicator className="flex-1 bg-white" size="large" />
        ) : (
          <FlatList
            data={salas}
            keyExtractor={(item) => String(item.id_sala)}
            contentContainerStyle={{ padding: 16, gap: 16 }}
            renderItem={({ item }) => <CardContagem name="count" sala={item} />}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshingSalas} // ✅ not negated
                onRefresh={aoAtualizarSalas}
              />
            }
            ListEmptyComponent={
              <Text className="mt-10 text-center text-gray-400">
                Nenhuma sala encontrada...
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
};

export default Contagem;
