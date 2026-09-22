import CampoTextHookForm from "@/components/CampoTextoHookForm/CampoTextoHookForm";
import "@/global.css";
import { obterUserId } from "@/lib/secureStore";
import useIndexViewModel from "@/ViewModel/useIndexViewModel";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  View
} from "react-native";
import Botao from "../components/botao/botao";

const App = () => {
  const router = useRouter();

  const [verificandoSessao, setVerificandoSessao] = useState(true);

  const { fontsLoaded, fontError, handleSubmit, onSubmit, control } =
    useIndexViewModel();

  // Verifica se o usuário já está logado
  useEffect(() => {
    const verificarSessao = async () => {
      try {
        const userId = await obterUserId();

        if (userId) {
          router.replace("/(tabs)");
        } else {
          setVerificandoSessao(false);
        }
      } catch (error) {
        console.log("Erro ao verificar sessão:", error);
        setVerificandoSessao(false);
      }
    };

    verificarSessao();
  }, [router]);

  // Enquanto verifica a sessão
  if (verificandoSessao || (!fontsLoaded && !fontError)) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ImageBackground
      source={require("../assets/images/image.png")}
      className="cover h-full w-full"
    >
      <View className="p-6 flex justify-center items-center h-full rounded-2xl">
        <View className="mb-8 items-center">
          <Text className="font-sans text-black text-2xl">Login</Text>

          <Text>Faça o login para continuar</Text>
        </View>

        <View className="gap-6">
          <CampoTextHookForm label="E-mail" name="email" control={control} />

          <CampoTextHookForm label="Senha" name="password" control={control} />
        </View>

        <View className="items-center mt-8">
          <Botao
            className="w-20"
            children={
              <View className="justify-center items-center">
                <Text className="text-white text-xl">Entrar</Text>
              </View>
            }
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View className="mt-2">
          <Link href={"/cadastro"}>
            <Text>Cadastre-se</Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

export default App;
