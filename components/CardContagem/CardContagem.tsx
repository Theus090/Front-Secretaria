import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Contagem } from "../../types/contagem";
import { Sala } from "../../types/sala";
import AntDesign from "@expo/vector-icons/AntDesign";

type CardContagemProps = {
  sala: Sala;
};

const CardContagem = ({ sala }: CardContagemProps) => {
  const [numero, setNumero] = useState(0);
  const [status, setStatus] = useState("Pendente");

  return (
    <View className="flex items-center justify-center border rounded-lg">
      <View className="flex flex-row gap-10">
        <Text>{sala.nome}</Text>
        <Text className="text-red-500">Pendente</Text>
      </View>

      <View className="flex-1">
        <Text>Previsão: {sala.quantidade}</Text>
      </View>

      <View className="flex flex-row">
        <View className="flex flex-row gap-30">
          <Pressable onPress={() => setNumero(numero + 1)}>
            <Text>+</Text>
          </Pressable>
          <Text>{numero}</Text>
          <Pressable onPress={() => setNumero(numero - 1)}>
            <Text>-</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={() => {
              setStatus("concluido");
            }}
          >
            <AntDesign name="send" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CardContagem;
