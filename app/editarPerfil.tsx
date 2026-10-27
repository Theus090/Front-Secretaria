import CampoTextHookForm from "../components/CampoTextoHookForm/CampoTextoHookForm";
import useEditarPerfilViewModel from "../ViewModel/useEditarPerfilViewModel";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Botao from "../components/botao/botao";

const EditarPerfil = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    carregando,
    erro,
    cancelar,
  } = useEditarPerfilViewModel();

  if (carregando) {
    return <ActivityIndicator className="flex-1" size="large" color="#7a1414" />;
  }

  if (erro) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-600 text-center">
          Não foi possível carregar o perfil.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
      <ScrollView
        contentContainerClassName="p-4 gap-6"
        keyboardShouldPersistTaps="handled"
      >
        <CampoTextHookForm
          label="Nome"
          name="name"
          control={control}
          errorMessage={errors.name?.message}
          autoCapitalize="words"
          autoComplete="name"
        />
        <CampoTextHookForm
          label="E-mail"
          name="email"
          control={control}
          errorMessage={errors.email?.message}
          keyboardType="email-address"
          autoComplete="email"
        />
        <CampoTextHookForm
          label="Nif"
          name="nif"
          control={control}
          errorMessage={errors.nif?.message}
          autoCapitalize="characters"
        />

        <View className="gap-2">
          <Botao
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            accessibilityRole="button"
            accessibilityLabel="Salvar alterações"
            className="w-full min-w-0 p-3 rounded-lg items-center justify-center bg-[#7a1414]"
          >
            <Text className="text-white font-semibold text-sm">
              {isPending ? "Salvando..." : "Salvar alterações"}
            </Text>
          </Botao>

          <Botao
            onPress={cancelar}
            disabled={isPending}
            accessibilityRole="button"
            accessibilityLabel="Cancelar"
            className="w-full min-w-0 p-3 rounded-lg items-center justify-center bg-white border border-neutral-300"
          >
            <Text className="text-neutral-700 font-semibold text-sm">
              Cancelar
            </Text>
          </Botao>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditarPerfil;
