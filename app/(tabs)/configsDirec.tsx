import {
    ActivityIndicator,
    Button,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import useGerenciamentoViewModel from "../../ViewModel/useGerenciamentoViewModel";

export default function GerenciamentoScreen() {
  const { users, loading, error, refresh } = useGerenciamentoViewModel();

  if (loading && users.length === 0) {
    return <ActivityIndicator className="" size="large" />;
  }

  if (error) {
    return (
      <View className="">
        <Text>{error}</Text>
        <Button title="Tentar novamente" onPress={() => refresh()} />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id_usuario)}
      refreshing={loading}
      onRefresh={() => refresh()}
      renderItem={({ item }) => (
        <View className=" bg-slate-400 p-2">
          <Text className="text-2xl">{item.nome}</Text>
          <Text>{item.email}</Text>
          <Pressable className="h-16 justify-center rounded-xl border border-gray-200 px-4">
            <Text className="">Excluir</Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={<Text>Nenhum usuário encontrado</Text>}
    />
  );
}
