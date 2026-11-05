import { limparSessao } from "@/lib/secureStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQueryClient } from "@tanstack/react-query";
import { NativeStackHeaderProps, useRouter } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuAbas from "../MenuAbas/MenuAbas";

const Header = (props: NativeStackHeaderProps) => {
  const podeVoltar = props.navigation.canGoBack();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await limparSessao();
    queryClient.removeQueries({ queryKey: ["session"] });

    if (router.canDismiss()) {
      router.dismissAll();
    }

    router.replace("/login");
  };

  return (
    <View>
      <SafeAreaView className="pt-8 h-28 px-4 bg-[#b40608] flex-row items-center justify-between">
        <Image
          className="h-12 w-32"
          source={require("@/assets/images/header_logo.png")}
          resizeMode="contain"
        />

        <Pressable
          onPress={handleLogout}
          className="rounded-full w-12 h-12 items-center justify-center"
          hitSlop={10}
        >
          <Ionicons name="log-out-outline" size={30} color="#FFFFFF" />
        </Pressable>
      </SafeAreaView>

      <MenuAbas />
    </View>
  );
};

export default Header;
