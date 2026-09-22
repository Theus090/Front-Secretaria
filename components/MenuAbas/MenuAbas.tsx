import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const MenuAbas = () => {
  const [abaSelecionada, setAbaSelecionada] = useState("Professor");

  const abas = ["Professor", "Inspetor", "Direção"];

  return (
    <View className="h-10 flex-row bg-[#A5090B]">
      {abas.map((aba) => (
        <Pressable
          key={aba}
          onPress={() => setAbaSelecionada(aba)}
          className={`flex-1 items-center justify-center ${
            abaSelecionada === aba ? "bg-[#F5E5E5]" : ""
          }`}
        >
          <Text
            className={abaSelecionada === aba ? "text-[#8B1719]" : "text-white"}
          >
            {aba}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default MenuAbas;
