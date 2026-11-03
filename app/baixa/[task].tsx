import useBaixaViewModel from "@/ViewModel/useBaixaViewModel";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import CartaoDeTask from "../../components/CartaoDeTask/CartaoDeTask";
import ViewTask from "@/components/ViewTask/ViewTask";
import CampoTextoHookForm from "@/components/CampoTextoHookForm/CampoTextoHookForm";
import SeletorDeImagem from "@/components/SeletorDeImagem/SeletorDeImagem";


const Baixa = () => {
    const { task, onSubmit, control, imagem, setImagem, isSubmitting } = useBaixaViewModel();
    console.log(task)
    return (
        <ScrollView className="flex-1 p-4 bg-white">
            <Text className="text-2xl font-bold text-black mb-4">Tarefa a ser finalizada</Text>
            <View className="mb-6">
                {task &&
                    <ViewTask task={task} />
                }
            </View>

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
                    onPress={()=>onSubmit}
                    disabled={isSubmitting}
                    className="bg-red-700 rounded-xl h-14 items-center justify-center mt-8"
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-Black text-lg font-semibold">
                            Registrar Baixa
                        </Text>
                    )}
                </Pressable>
            </View>


        </ScrollView>
    )
}

export default Baixa