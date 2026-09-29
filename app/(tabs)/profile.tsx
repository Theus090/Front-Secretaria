import Botao from "../../components/botao/botao";
import ListaInformacoes from "../../components/ListaInformacoes/ListaInformacoes";
import { CORES } from "../../constants/cores";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import CabecalhoPerfil from "../../components/CabecalhoPerfil/CabecalhoPerfil";
import { usePerfilViewModel } from "../../ViewModel/usePerfilViewModel";

const Profile = () => {
  const { usuario, carregando, erro, abrirEdicao } = usePerfilViewModel();

  if (carregando) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-neutral-500">Carregando perfil...</Text>
      </View>
    );
  }

  if (erro || !usuario) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-600 text-center">
          {erro ?? "Perfil indisponível."}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <CabecalhoPerfil nome={usuario.nome} cargo={usuario.cargo} />

      <View className="p-4">
        <ListaInformacoes usuario={usuario} />

        <Botao
          onPress={abrirEdicao}
          accessibilityRole="button"
          accessibilityLabel="Editar perfil"
          className="w-full min-w-0 p-3 rounded-lg mb-2 flex-row items-center justify-center gap-1.5 bg-[#7a1414]"
        >
          <Ionicons name="create-outline" size={16} color={CORES.branco} />

          <Text className="text-white font-semibold text-sm">
            Editar perfil
          </Text>
        </Botao>
      </View>
    </ScrollView>
  );
};

export default Profile;