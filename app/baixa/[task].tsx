import CampoTextoHookForm from "@/components/CampoTextoHookForm/CampoTextoHookForm";
import SeletorDeImagem from "@/components/SeletorDeImagem/SeletorDeImagem";
import ViewTask from "@/components/ViewTask/ViewTask";
import useBaixaViewModel from "@/ViewModel/useBaixaViewModel";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const Baixa = () => {
  const {
    task,
    onSubmit,
    handleSubmit,
    control,
    imagem,
    setImagem,
    isSubmitting,
    isLoadingUser,
  } = useBaixaViewModel();
  console.log("Abriu Tela");
  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold text-black mb-4">
        Tarefa a ser finalizada
      </Text>
      <View className="mb-6">{task && <ViewTask task={task} />}</View>

      <View>
        <CampoTextoHookForm
          label="Observation"
          name="observation"
          control={control}
          placeholder="Teste"
        />

        <View className="mt-6">
          <SeletorDeImagem
            label="Foto (opcional)"
            value={imagem}
            setValue={setImagem}
            isError={false}
          />
        </View>

        <Pressable
          onPress={() => handleSubmit(onSubmit)()}
          disabled={isSubmitting || isLoadingUser}
          className="bg-red-700 rounded-xl h-14 items-center justify-center mt-8"
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-semibold">
              Registrar Baixa
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Baixa;
