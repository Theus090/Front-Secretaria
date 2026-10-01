import { Dispatch, SetStateAction } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import AbaComponent from "../AbaComponent/AbaComponent";

export type AbaProps = {
  cargo: string;
};

type MenuAbaProps = {
  abas: AbaProps[];
  isRefreshing: boolean;
  aoAtualizar: () => {};
  cargoAtual: string;
  selecionarCargo: Dispatch<SetStateAction<string>>;
};

const MenuAbas = ({
  abas,
  isRefreshing,
  aoAtualizar,
  selecionarCargo,
  cargoAtual,
}: MenuAbaProps) => {
  return (
    <View className="h-10 flex-row bg-[#A5090B] px-4">
      <FlatList
        data={abas}
        horizontal
        contentContainerStyle={{ padding: 4, gap: 14 }}
        keyExtractor={(aba) => aba.cargo}
        renderItem={({ item }) => (
          <AbaComponent
            selecionarCargo={selecionarCargo}
            cargoAtual={cargoAtual}
            cargo={item.cargo}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={aoAtualizar} />
        }
        ListEmptyComponent={
          <Text className="mt-10 text-center text-gray-400">
            Nenhuma sala encontrada
          </Text>
        }
      />
    </View>
  );
};

export default MenuAbas;
