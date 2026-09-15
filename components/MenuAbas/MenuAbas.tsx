import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const MenuAbas = () => {
  const [abaSelecionada, setAbaSelecionada] = useState("Professor");

  const abas = ["Professor", "Inspetor", "Direção"];

  return (
    <View className="h-10 flex-row bg-[#a5090b]">
      {abas.map((aba) => (
        <Pressable
          key={aba}
          onPress={() => setAbaSelecionada(aba)}
          className={`flex-1 items-center justify-center ${
            abaSelecionada === aba ? "bg-[#f5e5e5]" : ""
          }`}
        >
          <Text
            className={`text-sm ${
              abaSelecionada === aba ? "text-[#8b1719]" : "text-white"
            }`}
          >
            {aba}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default MenuAbas;
