import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Sala } from "../../types/sala";
import AntDesign from "@expo/vector-icons/AntDesign";
import CampoTextHookForm from "../CampoTextoHookForm/CampoTextoHookForm";
import { Path } from "react-hook-form";
import { CountForm } from "@/ViewModel/useContagemViewModel";
import useCountViewModel from "@/ViewModel/useCountViewModel";
import { Contagem } from "@/types/contagem";
import { SalaContagem } from "@/types/salaContagem";

type CardContagemProps = {
  salaContagem: SalaContagem;
};

const CardConfirmarCount = ({ salaContagem }: CardContagemProps) => {
  const { onCheck, handleSubmit, control, errorsCount } = useCountViewModel();

  return (
    <View className="flex items-center justify-center gap-10 p-5 bg-white rounded-2xl">
      <View className="flex flex-row gap-10">
        <Text className="font-bold">{salaContagem.nome_sala}</Text>
      </View>

      <View className="flex">
        <Text>Quantidade de alunos: {salaContagem.contagem}</Text>
      </View>

      <View className="flex flex-row gap-10 items-center justify-center">
        <View></View>
        <View>
          <Pressable
            onPress={()=> onCheck(salaContagem.id_contagem)}
          >
            <AntDesign name="send" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CardConfirmarCount;
