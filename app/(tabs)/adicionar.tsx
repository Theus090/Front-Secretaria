import CampoDeTexto from "@/components/CampoDeTexto/CampoDeTexto";
import Botao from "@/components/botao/botao";
import { obterUserId } from "@/lib/secureStore";
import { CriarOrdemServico } from "@/service/task.service";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

type Urgencia = "normal" | "Nao-Urgente" | "Urgente";

const formatarData = (data: Date) => data.toLocaleDateString("pt-BR");

const dataParaApi = (data: Date) => {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
};

export default function Details() {
  const hoje = new Date();

  const [dataCriacao, setDataCriacao] = useState(new Date());
  const [prazo, setPrazo] = useState<Date | null>(null);
  const [setor, setSetor] = useState("select");
  const [descricao, setDescricao] = useState("");
  const [urgencia, setUrgencia] = useState<Urgencia | "select">("select");

  const [mostrarDataCriacao, setMostrarDataCriacao] = useState(false);
  const [mostrarPrazo, setMostrarPrazo] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [erros, setErros] = useState({
    prazo: false,
    setor: false,
    descricao: false,
    urgencia: false,
  });

  const hojeSemHorario = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
  );

  async function criarOrdemServico() {
    const novosErros = {
      prazo: !prazo,
      setor: setor === "select",
      descricao: !descricao.trim(),
      urgencia: urgencia === "select",
    };

    setErros(novosErros);

    if (Object.values(novosErros).some(Boolean)) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (!prazo || urgencia === "select" || setor === "select") {
      return;
    }

    const prazoSemHorario = new Date(
      prazo.getFullYear(),
      prazo.getMonth(),
      prazo.getDate(),
    );

    if (prazoSemHorario < hojeSemHorario) {
      Alert.alert("Prazo inválido", "O prazo não pode ser anterior a hoje.");
      return;
    }

    try {
      setEnviando(true);

      // Obtém automaticamente o ID do usuário que fez login.
      const userId = await obterUserId();

      if (!userId) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        return;
      }

      await CriarOrdemServico(String(userId), {
        data_criacao: dataParaApi(dataCriacao),
        prazo_estipulado: dataParaApi(prazo),
        setor_responsavel: setor,
        descricao: descricao.trim(),
        urgencia,
      });

      setDataCriacao(new Date());
      setPrazo(null);
      setSetor("select");
      setDescricao("");
      setUrgencia("select");

      setErros({
        prazo: false,
        setor: false,
        descricao: false,
        urgencia: false,
      });

      Alert.alert("Sucesso", "Ordem de serviço criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar ordem de serviço:", error);

      Alert.alert(
        "Erro",
        "Não foi possível criar a ordem de serviço. Verifique a conexão e tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="mb-6">
        <Text className="text-2xl font-bold text-[#4a0e0e]">
          Nova ordem de serviço
        </Text>

        <Text className="mt-2 text-base text-gray-500">
          Preencha os dados para registrar uma solicitação.
        </Text>
      </View>

      <View className="gap-5">
        {/* Data de criação */}
        <View className="gap-1">
          <Text className="text-xl text-black">Data de criação</Text>

          <Pressable
            onPress={() => setMostrarDataCriacao(true)}
            className="h-16 justify-center rounded-xl border border-gray-200 bg-[#f8f9fa] px-4"
          >
            <Text className="text-base text-black">
              {formatarData(dataCriacao)}
            </Text>
          </Pressable>

          {mostrarDataCriacao && (
            <DateTimePicker
              value={dataCriacao}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              maximumDate={hojeSemHorario}
              onChange={(event, selectedDate) => {
                if (Platform.OS !== "ios" || event.type === "dismissed") {
                  setMostrarDataCriacao(false);
                }

                if (selectedDate && event.type !== "dismissed") {
                  setDataCriacao(selectedDate);
                }
              }}
            />
          )}

          {Platform.OS === "ios" && mostrarDataCriacao && (
            <Botao onPress={() => setMostrarDataCriacao(false)}>
              <Text className="text-center font-bold text-white">
                Confirmar data
              </Text>
            </Botao>
          )}
        </View>

        {/* Prazo */}
        <View className="gap-1">
          <Text className="text-xl text-black">Prazo estipulado</Text>

          <Pressable
            onPress={() => setMostrarPrazo(true)}
            className="h-16 justify-center rounded-xl border border-gray-200 bg-[#f8f9fa] px-4"
          >
            <Text
              className={
                prazo ? "text-base text-black" : "text-base text-gray-400"
              }
            >
              {prazo ? formatarData(prazo) : "Selecione o prazo"}
            </Text>
          </Pressable>

          {mostrarPrazo && (
            <DateTimePicker
              value={prazo ?? hojeSemHorario}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={hojeSemHorario}
              onChange={(event, selectedDate) => {
                if (Platform.OS !== "ios" || event.type === "dismissed") {
                  setMostrarPrazo(false);
                }

                if (selectedDate && event.type !== "dismissed") {
                  setPrazo(selectedDate);
                  setErros((prev) => ({ ...prev, prazo: false }));
                }
              }}
            />
          )}

          {Platform.OS === "ios" && mostrarPrazo && (
            <Botao onPress={() => setMostrarPrazo(false)}>
              <Text className="text-center font-bold text-white">
                Confirmar prazo
              </Text>
            </Botao>
          )}

          {erros.prazo && (
            <Text className="mt-1 text-red-600">
              Selecione o prazo estipulado.
            </Text>
          )}
        </View>

        {/* Setor responsável */}
        <View className="gap-1">
          <Text className="text-xl text-black">Setor responsável</Text>

          <View className="h-16 w-full overflow-hidden rounded-xl border border-gray-200 bg-[#f8f9fa]">
            <Picker
              selectedValue={setor}
              onValueChange={(itemValue) => {
                setSetor(String(itemValue));

                if (itemValue !== "select") {
                  setErros((prev) => ({ ...prev, setor: false }));
                }
              }}
            >
              <Picker.Item label="Selecione o setor" value="select" />
              <Picker.Item label="Direção" value="direction" />
              <Picker.Item label="Professor" value="teacher" />
              <Picker.Item label="Inspetor" value="inspector" />
              <Picker.Item label="Coordenação" value="coordination" />
              <Picker.Item label="Cozinha" value="kitchen" />
            </Picker>
          </View>

          {erros.setor && (
            <Text className="mt-1 text-red-600">
              Selecione o setor responsável.
            </Text>
          )}
        </View>

        {/* Descrição */}
        <CampoDeTexto
          label="Descrição"
          value={descricao}
          setValue={setDescricao}
          isError={erros.descricao}
          errorMessage="Informe a descrição."
          placeholder="Descreva o serviço solicitado"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          textInputClassName="h-28 w-full rounded-xl border border-gray-200 bg-[#f8f9fa] px-4 py-3"
        />

        {/* Urgência */}
        <View className="gap-1">
          <Text className="text-xl text-black">Urgência</Text>

          <View className="h-16 w-full overflow-hidden rounded-xl border border-gray-200 bg-[#f8f9fa]">
            <Picker
              selectedValue={urgencia}
              onValueChange={(itemValue) => {
                setUrgencia(itemValue as Urgencia | "select");

                if (itemValue !== "select") {
                  setErros((prev) => ({ ...prev, urgencia: false }));
                }
              }}
            >
              <Picker.Item label="Selecione a urgência" value="select" />
              <Picker.Item label="Normal" value="normal" />
              <Picker.Item label="Não urgente" value="Nao-Urgente" />
              <Picker.Item label="Urgente" value="Urgente" />
            </Picker>
          </View>

          {erros.urgencia && (
            <Text className="mt-1 text-red-600">Selecione a urgência.</Text>
          )}
        </View>
      </View>

      <Botao className="mt-6" onPress={criarOrdemServico} disabled={enviando}>
        <Text className="text-center font-bold text-white">
          {enviando ? "Enviando..." : "Criar ordem de serviço"}
        </Text>
      </Botao>
    </ScrollView>
  );
}
