import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Contagem } from "../../types/contagem";
import { Sala } from "../../types/sala";

type CardContagemProps = {
  contagem: Contagem;
  sala: Sala;
};

const CardContagem = ({ contagem, sala }: CardContagemProps) => {
  const [numero, setNumero] = useState(0);

  return (
    <View>
      <View>
        <Text>{sala.nome}º ano A</Text>
        <Text>Pendente</Text>
      </View>

      <View>
        <Text>Previsão: {sala.quantidade}</Text>
      </View>

      <View>
        <View>
          <Pressable onPress={() => setNumero(numero + 1)}>+</Pressable>
          <Text>{numero}</Text>
          <Pressable onPress={() => setNumero(numero - 1)}>-</Pressable>
        </View>
        <View>
          <Pressable></Pressable>
        </View>
      </View>
    </View>
  );
};

export default CardContagem;
