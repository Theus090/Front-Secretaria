import { PerfilUsuario } from "../../types/usuario";
import { CORES } from "../../constants/cores";
import { cn } from "../../lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Text, View } from "react-native";

type NomeIcone = ComponentProps<typeof Ionicons>["name"];

type ItemInformacao = {
  id: string;
  icone: NomeIcone;
  rotulo: string;
  valor: string;
};

type ListaInformacoesProps = {
  usuario: PerfilUsuario;
};

const ListaInformacoes = ({ usuario }: ListaInformacoesProps) => {
  const itens: ItemInformacao[] = [
    {
      id: "nome",
      icone: "person-outline",
      rotulo: "Nome",
      valor: usuario.nome,
    },
    {
      id: "email",
      icone: "mail-outline",
      rotulo: "Email",
      valor: usuario.email,
    },
    {
      id: "cargo",
      icone: "briefcase-outline",
      rotulo: "Cargo",
      valor: usuario.cargo,
    },
    {
      id: "nif",
      icone: "card-outline",
      rotulo: "NIF",
      valor: usuario.nif,
    },
  ];

  return (
    <View className="rounded-xl border border-neutral-200 overflow-hidden mb-4">
      {itens.map((item, indice) => {
        const ehUltimo = indice === itens.length - 1;

        return (
          <View
            key={item.id}
            className={cn(
              "flex-row items-center gap-3 p-3.5",
              !ehUltimo && "border-b border-neutral-200"
            )}
          >
            <Ionicons name={item.icone} size={18} color={CORES.primaria} />

            <View className="flex-1">
              <Text className="text-xs text-neutral-400">{item.rotulo}</Text>

              <Text className="text-sm text-neutral-900 mt-0.5">
                {item.valor}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ListaInformacoes;