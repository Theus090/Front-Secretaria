import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  function handlePress() {
    router.navigate("/(tabs)/contagem");
  }
  return (
    <View className="flex-1 w-full p-5 gap-3 justify-center items-center">
      <View className="border w-full gap-2 rounded-2xl flex-row p-5">
        <Ionicons name="people" size={20} color="red" />
        <Pressable className="" onPress={handlePress}>
          <Text>Gerenciar usuários</Text>
          <Text className="text-sm">Adicionar, editar ou remover acessos</Text>
        </Pressable>
      </View>

      <View className="border w-full gap-2 rounded-2xl flex-row p-5">
        <Feather name="trash-2" size={20} color="red" />

        <Pressable className="">
          <Text className="text-sm">Excluir contagens</Text>
          <Text className="text-sm">
            Remover registros de contagem de lanches
          </Text>
        </Pressable>
      </View>
      <View className="border w-full gap-2 rounded-2xl flex-row p-5">
        <Foundation name="graph-bar" size={20} color="red" />
        <Pressable className="">
          <Text>Relatórios gerais</Text>
          <Text className="text-sm">Visão completa de todas as turmas </Text>
        </Pressable>
      </View>
      <View className="border w-full gap-2 rounded-2xl flex-row p-5">
        <FontAwesome6 name="person-circle-exclamation" size={20} color="red" />
        <Pressable className="">
          <Text>Apagar usuário</Text>
          <Text className="text-sm">
            Remover usuarios do sistemas permanentes
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
