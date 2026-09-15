import { NativeStackHeaderProps } from "expo-router";
import { Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = (props: NativeStackHeaderProps) => {
  const podeVoltar = props.navigation.canGoBack();

  return (
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
  );
};

export default Header;
