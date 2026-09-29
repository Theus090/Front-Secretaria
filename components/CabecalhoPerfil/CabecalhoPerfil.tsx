import { CORES } from "@/constants/cores";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";


type CabecalhoPerfilProps = {
  nome: string;
  cargo: string;
};

const CabecalhoPerfil = ({ nome, cargo }: CabecalhoPerfilProps) => {
  return (
    <View className="bg-[#5A1A1A] items-center py-6">
      <View className="w-[76px] h-[76px] rounded-full bg-white/90 items-center justify-center mb-3">
        <Ionicons name="person" size={38} color={CORES.primaria} />
      </View>

      <Text className="text-white text-[17px] font-semibold" numberOfLines={1}>
        {nome?.trim() || "Usuário"}
      </Text>

      <Text className="text-white/65 text-sm mt-1" numberOfLines={1}>
        {cargo?.trim() || "Cargo não informado"}
      </Text>
    </View>
  );
};

export default CabecalhoPerfil;
