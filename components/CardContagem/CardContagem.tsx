import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { Contagem } from "../../types/contagem";
import { Sala } from "../../types/sala";
import AntDesign from "@expo/vector-icons/AntDesign";
import CampoTextHookForm from "../CampoTextoHookForm/CampoTextoHookForm";
import {
  Control,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { CountForm, CountSubmit } from "@/ViewModel/useContagemViewModel";
import useCountViewModel from "@/ViewModel/useCountViewModel";

type CardContagemProps = {
  sala: Sala;
  name: Path<CountForm>;
};

const CardContagem = ({ sala, name }: CardContagemProps) => {
  const [status, setStatus] = useState();

  const { onSubmit, handleSubmit, control } = useCountViewModel();

  return (
    <View className="flex items-center justify-around border rounded-lg h-40 p-40">
      <View className="flex flex-row gap-10">
        <Text>{sala.nome}</Text>
        {status === "Pendente" ? (
          <Text className="text-red-500">{status}</Text>
        ) : status === "Concluido" ? (
          <Text className="text-green-500">{status}</Text>
        ) : (
          <Text className="text-gray-500">{status || "Sem status"}</Text>
        )}
      </View>

      <View className="flex">
        <Text>Previsão: {sala.quantidade}</Text>
      </View>

      <View className="flex flex-row h-10 gap-10">
        <View></View>
        <View className="flex flex-row items-center justify-between gap-10">
          <CampoTextHookForm
            label="Contagem de Alunos"
            name={name}
            control={control}
          />
        </View>
        <View>
          <Pressable
            onPress={handleSubmit(({ count }) => {

              onSubmit({ count, id_sala: sala.id_sala });
            })}
          >
            <AntDesign name="send" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CardContagem;
