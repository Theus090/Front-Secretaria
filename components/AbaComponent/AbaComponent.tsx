import { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";
import { AbaProps } from "../MenuAbas/MenuAbas";

function TranslateRoleLabel(label: string) {
  if (label === "coordination") return "Coordenação";
  if (label === "inspector") return "Inspetor";
  if (label === "teacher") return "Professor";
  if (label === "direction") return "Direção";
  if (label === "kitchen") return "Cozinha";

  return label;
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
  const selecionada = cargo === cargoAtual;

  return (
    <Pressable onPress={() => selecionarCargo(cargo)} className="mr-3">
      <View
        className={`
          h-8
          items-center
          px-4
          ${selecionada ? "bg-[#F1E5E5] rounded-t-2xl" : ""}
        `}
      >
        <Text
          className={`
            text-xl
            ${selecionada ? "text-[#8F0A0C]" : "text-white"}
          `}
        >
          {TranslateRoleLabel(cargo)}
        </Text>
      </View>
    </Pressable>
  );
};

export default AbaComponent;
