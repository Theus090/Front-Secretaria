import "@/global.css";
import {
  limparSessao,
  obterCargo,
  obterUserId,
  salvarCargoUsuario,
} from "@/lib/secureStore";
import { BuscarUsuario } from "@/service/user.service";
import { isAxiosError } from "axios";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

// Checks the stored session before entering the app:
// - id or cargo missing  -> clear both, go to login
// - backend rejects id   -> clear both, go to login
// - backend confirms id  -> refresh cargo from the backend, enter the app
// - backend unreachable  -> keep the stored session (offline / dev server down)
async function validarSessao(): Promise<boolean> {
  const [id, cargo] = await Promise.all([obterUserId(), obterCargo()]);

  if (!id || !cargo) {
    await limparSessao();
    return false;
  }

  try {
    const usuario = await BuscarUsuario(id);
    if (usuario?.cargo) {
      await salvarCargoUsuario(usuario.cargo);
    }
    return true;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      await limparSessao();
      return false;
    }
    return true;
  }
}

const App = () => {
  const [logado, setLogado] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    validarSessao()
      .then(setLogado)
      .catch(() => setLogado(false))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={logado ? "/(tabs)" : "/login"} />;
};

export default App;
