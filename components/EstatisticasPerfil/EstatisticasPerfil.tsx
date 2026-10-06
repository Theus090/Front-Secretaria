import React from "react";
import { Text, View } from "react-native";

export type Estatistica = {
  id: string;
  valor: number;
  rotulo: string;
};

type EstatisticasPerfilProps = {
  itens: Estatistica[];
};

const EstatisticasPerfil = ({ itens }: EstatisticasPerfilProps) => {
  return (
    <View className="flex-row justify-around bg-[#f5f4f0] rounded-xl py-3.5 mb-4">
      {itens.map((item, indice) => (
        <React.Fragment key={item.id}>
          {indice > 0 ? <View className="w-px bg-neutral-200" /> : null}
          <View className="items-center">
            <Text className="text-lg font-bold text-neutral-900">
              {Number.isFinite(item.valor) ? item.valor : "-"}
            </Text>
            <Text className="text-xs text-neutral-500 mt-0.5">
              {item.rotulo}
            </Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

export default EstatisticasPerfil;
