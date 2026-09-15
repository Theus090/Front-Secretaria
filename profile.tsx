import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // ou outra lib de ícones de sua preferência

const Profile = () => {
  





  
  return (
    <View className="flex-1 bg-white">
      
      

      {/* Bloco do avatar grande */}
      <View className="bg-[#4a0e0e] items-center py-6">
        <View className="w-[76px] h-[76px] rounded-full bg-white/90 items-center justify-center mb-3">
          <Ionicons name="person" size={38} color="#7a1414" />
        </View>
        <Text className="text-white text-[17px] font-semibold">
          Nome do usuário
        </Text>
        <Text className="text-white/65 text-sm mt-1">Cargo / função</Text>
      </View>

      {/* Conteúdo */}
      <View className="p-4">
        {/* Estatísticas */}
        <View className="flex-row justify-around bg-[#f5f4f0] rounded-xl py-3.5 mb-4">
          <View className="items-center">
            <Text className="text-lg font-bold text-neutral-900">12</Text>
            <Text className="text-xs text-neutral-500 mt-0.5">Turmas</Text>
          </View>
          <View className="w-px bg-neutral-200" />
          <View className="items-center">
            <Text className="text-lg font-bold text-neutral-900">5</Text>
            <Text className="text-xs text-neutral-500 mt-0.5">Escolas</Text>
          </View>
          <View className="w-px bg-neutral-200" />
          <View className="items-center">
            <Text className="text-lg font-bold text-neutral-900">3</Text>
            <Text className="text-xs text-neutral-500 mt-0.5">Anos</Text>
          </View>
        </View>

        {/* Lista de informações */}
        <View className="rounded-xl border border-neutral-200 overflow-hidden mb-4">
          <View className="flex-row items-center gap-3 p-3.5 border-b border-neutral-200">
            <Ionicons name="mail-outline" size={18} color="#7a1414" />
            <View>
              <Text className="text-xs text-neutral-400">Email</Text>
              <Text className="text-sm text-neutral-900 mt-0.5">
                usuario@sesi.org.br
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 p-3.5 border-b border-neutral-200">
            <Ionicons name="call-outline" size={18} color="#7a1414" />
            <View>
              <Text className="text-xs text-neutral-400">Telefone</Text>
              <Text className="text-sm text-neutral-900 mt-0.5">
                (00) 00000-0000
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 p-3.5">
            <Ionicons name="business-outline" size={18} color="#7a1414" />
            <View>
              <Text className="text-xs text-neutral-400">Unidade</Text>
              <Text className="text-sm text-neutral-900 mt-0.5">
                SESI - Unidade escolar
              </Text>
            </View>
          </View>
        </View>

        {/* Botões */}
        <TouchableOpacity className="flex-row items-center justify-center gap-1.5 bg-[#7a1414] p-3 rounded-lg mb-2">
          <Ionicons name="create-outline" size={16} color="#fff" />
          <Text className="text-white font-semibold text-sm">
            Editar perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity id="logout-btn" className="flex-row items-center justify-center gap-1.5 p-3 rounded-lg border border-neutral-300">
          <Ionicons name="log-out-outline" size={16} color="#a32d2d" />
          <Text className="text-[#a32d2d] font-semibold text-sm">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;