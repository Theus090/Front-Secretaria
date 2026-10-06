import { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";
import { AbaProps } from "../MenuAbas/MenuAbas";

function TranslateRoleLabel(label: string) {
  if (label == "coordination") return "Coordenação";
  if (label == "inspector") return "Inspetores";
  if (label == "teacher") return "Professores";
  if (label == "direction") return "Direção";
}

type AbaComponentProps = AbaProps & {
  selecionarCargo: Dispatch<SetStateAction<string>>;
  cargoAtual: string;
};

const AbaComponent = ({
  cargo,
  selecionarCargo,
  cargoAtual,
}: AbaComponentProps) => {
  return (
    <Pressable onPress={() => selecionarCargo(cargo)}>
      <View className={`${cargo == cargoAtual ? "bg-white" : ""}`}>
        <Text className="">{TranslateRoleLabel(cargo)}</Text>
      </View>
    </Pressable>
  );
};

export default AbaComponent;
