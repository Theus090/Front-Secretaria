import { NativeStackHeaderProps } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuAbas from "../MenuAbas/MenuAbas";

const Header = (props: NativeStackHeaderProps) => {
  const podeVoltar = props.navigation.canGoBack();

  return (
    <View>
      <SafeAreaView className="pt-8 h-28 px-4 bg-[#b40608] flex-row items-center justify-start">
        {podeVoltar ? (
          <Pressable onPress={() => props.navigation.goBack()}>
            <Image
              className="h-12 w-32"
              source={require("@/assets/images/header_logo.png")}
              resizeMode="contain"
            />
          </Pressable>
        ) : (
          <Image
            className="h-12 w-32"
            source={require("@/assets/images/header_logo.png")}
            resizeMode="contain"
          />
        )}
      </SafeAreaView>

      <MenuAbas />
    </View>
  );
};

export default Header;
