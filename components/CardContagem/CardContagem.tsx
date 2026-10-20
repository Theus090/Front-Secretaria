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
  const [statusCont, setStatusCont] = useState(sala.status);

  const { onSubmit, handleSubmit, control } = useCountViewModel();

  return (
    <View className="flex items-center justify-center rounded-md h-60 gap-10 shadow">
      <View className="flex flex-row gap-10">
        <Text className="font-bold">{sala.nome}</Text>
        {statusCont === 1 ? (
          <Text className="text-red-500">Pendente</Text>
        ) : statusCont === 0 ? (
          <Text className="text-green-500">Concluido</Text>
        ) : (
          <Text className="text-gray-500">{statusCont || "Sem status"}</Text>
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
