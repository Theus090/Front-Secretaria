import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import AbaComponent from "../AbaComponent/AbaComponent";

export type AbaProps = {
  cargo: string;
};

type MenuAbaProps = {
  abas: AbaProps[];
};
const MenuAbas = ({ abas }: MenuAbaProps) => {
  return (
    <View className="h-10 flex-row bg-[#A5090B]">
      <FlatList
        data={abas}
        horizontal
        keyExtractor={(aba) => aba.cargo}
        renderItem={({ item }) => <AbaComponent cargo={item.cargo} />}

      />
    </View>
  );
};

export default MenuAbas;
