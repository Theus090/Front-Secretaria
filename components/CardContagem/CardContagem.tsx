import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { Contagem } from "../../types/contagem";
import { Sala } from "../../types/sala";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Control,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { CountForm, CountSubmit } from "@/ViewModel/useContagemViewModel";
import useCountViewModel from "@/ViewModel/useCountViewModel";
import CampoDeTexto from "../CampoDeTexto/CampoDeTexto";
import CampoTextHookForm from "../CampoTextoHookForm/CampoTextoHookForm";

type CardContagemProps = {
  sala: Sala;
  name: Path<CountForm>;
};

const CardContagem = ({ sala, name }: CardContagemProps) => {
  const [statusCont, setStatusCont] = useState(sala.status);

  const { onSubmit, handleSubmit, control, errorsCount } = useCountViewModel();

  return (
    <View className="flex items-center justify-center h-60 gap-10 rounded-2xl bg-white border-gray-400">
      <View className="flex flex-row">
        <Text className="font-bold">{sala.nome}</Text>
      </View>

      <View className="flex">
        <Text>Previsão: {sala.quantidade}</Text>
      </View>

      <View className="flex flex-row gap-10 items-center justify-center">
        <View></View>
        <View className="flex flex-row items-center justify-between gap-10">
          <CampoTextHookForm
            name={"count"}
            label="Contagem de alunos"
            control={control}
            errorMessage={errorsCount.count?.message}
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
