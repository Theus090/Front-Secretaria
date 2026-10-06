import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { Contagem } from "../../types/contagem";
import { Sala } from "../../types/sala";
import AntDesign from "@expo/vector-icons/AntDesign";
import CampoTextHookForm from "../CampoTextoHookForm/CampoTextoHookForm";
import { Control, FieldValues, Path, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { CountSubmit } from "@/ViewModel/useContagemViewModel";

type CardContagemProps<T extends FieldValues> = {
  sala: Sala;
  name: Path<T>;
  control: Control<T>;
  onSubmit: SubmitHandler<CountSubmit>
  handleSubmit: UseFormHandleSubmit<CountSubmit>
};

const CardContagem = <T extends FieldValues>({
  sala,
  control,
  name,
  handleSubmit, onSubmit
}: CardContagemProps<T>) => {
  const [numero, setNumero] = useState(0);
  const [status, setStatus] = useState("Pendente");

  return (
    <View className="flex items-center justify-around border rounded-lg h-40">
      <View className="flex flex-row gap-10">
        <Text>{sala.nome}</Text>
        <Text className="text-red-500">Pendente</Text>
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
            onPress={handleSubmit(onSubmit)}
          >
            <AntDesign name="send" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CardContagem;
