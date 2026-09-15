
import Botao from "../components/botao/botao";
import CampoTextHookForm from "@/components/CampoTextoHookForm/CampoTextoHookForm";
import useCadastroViewModel from "@/ViewModel/useCadastroViewModel";
import { useHeaderHeight } from "expo-router/react-navigation";
import { Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { ImageBackground } from "react-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cadastro = () => {
  const { control, handleSubmit, onSubmit, errors, isPending } =
    useCadastroViewModel();

  const headerHeight = useHeaderHeight();

  return (
    <ImageBackground
      source={require("../assets/images/image.png")}
      style={{ flex: 1 }}
    >
    <SafeAreaView className="flex-1 items-center">
      <KeyboardAvoidingView
        className="flex-1 w-full items-center"
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView
          className="w-full"
          contentContainerClassName="items-center pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-6  mt-28">
          <Text className="text-2xl ">Criar conta</Text>
            <CampoTextHookForm
              label="Nome"
              name="name"
              control={control}
              errorMessage={errors.name?.message}
            />
            <CampoTextHookForm
              label="E-mail"
              name="email"
              control={control}
              errorMessage={errors.email?.message}
            />
             <Controller
                control={control}
                name="role"
                render={({ field: { onChange, value } }) => (
                  <View className="gap-1">
                    <Text className="text-black text-xl">Cargo</Text>

                    <View className="bg-[#f8f9fa] h-16 border border-gray-100 w-72 rounded-xl overflow-hidden">
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => onChange(itemValue)}
                      >
                        <Picker.Item label="Selecione um cargo" value="select" />

                        <Picker.Item label="Direção" value="direction" />

                        <Picker.Item label="Professor" value="teacher" />

                        <Picker.Item label="Inspetor" value="inspector" />

                        <Picker.Item label="Coordenação" value="coordination" />

                        <Picker.Item label="Cozinha" value="kitchen" />
                      </Picker>
                    </View>

                    {errors.role && (
                      <Text className="text-red-600 mt-2">
                        {errors.role.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <CampoTextHookForm
                label="Nif"
                name="nif"
                control={control}
                errorMessage={errors.nif?.message}
              />

            <CampoTextHookForm
              label="Senha"
              name="password"
              control={control}
              errorMessage={errors.password?.message}
            />
            <View className="flex-row justify-center">
              <Botao
                className="w-20"
                children={
                  <View className="justify-center items-center">
                    <Text className="text-white text-xl">Criar</Text>
                  </View>
                }

                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default Cadastro;
