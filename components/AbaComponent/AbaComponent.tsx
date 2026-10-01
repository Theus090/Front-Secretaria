import { Text, View } from "react-native";
import { AbaProps } from "../MenuAbas/MenuAbas";

const AbaComponent = ({ cargo }: AbaProps) => {
  return (
    <View>
      <Text>{cargo}</Text>
    </View>
  );
};

export default AbaComponent;
