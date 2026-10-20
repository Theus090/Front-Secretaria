import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Sala } from "../../types/sala";
import AntDesign from "@expo/vector-icons/AntDesign";
import CampoTextHookForm from "../CampoTextoHookForm/CampoTextoHookForm";
import { Path } from "react-hook-form";
import { CountForm } from "@/ViewModel/useContagemViewModel";
import useCountViewModel from "@/ViewModel/useCountViewModel";
import { Contagem } from "@/types/contagem";

type CardContagemProps = {
  sala: Sala;
  name: Path<CountForm>;
  id_count: string;
};

const CardConfirmarCount = ({ sala, id_count }: CardContagemProps) => {
  const { onSubmit, handleSubmit, control } = useCountViewModel();

  return (
    <View className="flex items-center justify-center rounded-md h-60 gap-10 shadow">
      <View className="flex flex-row gap-10">
        <Text className="font-bold">{sala.nome}</Text>
      </View>

      <View className="flex">
        <Text>Quantidade: {sala.quantidade}</Text>
      </View>

      <View className="flex flex-row h-10 gap-10">
        <View>
          <Pressable
          // onPress={()}
          >
            <AntDesign name="send" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CardConfirmarCount;
