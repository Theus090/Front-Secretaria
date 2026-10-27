import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
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
  const { users, loading, error, refresh, deleteUser } =
    useGerenciamentoViewModel();

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
        <View className="border-b p-2 bg-white">
          <View className="flex-row items-center gap-2 p-2">
            <Text
              className="flex-1 text-base font-semibold text-gray-900"
              numberOfLines={1}
            >
              {item.nome}
            </Text>
            <Text className="mr-3 text-sm text-gray-500" numberOfLines={1}>
              {item.email}
            </Text>
            <Pressable
              className="p-2"
              hitSlop={8}
              onPress={() => deleteUser(item.id_usuario)}
            >
              <FontAwesome5 name="trash" size={18} color="#b91c1c" />
            </Pressable>
          </View>
        </View>
      )}
      ListEmptyComponent={<Text>Nenhum usuário encontrado</Text>}
    />
  );
}
