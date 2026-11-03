import { cn } from "@/lib/cn";
import React from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type CampoDeTextoProps = TextInputProps & {
  label: string;
  placeholder?: string;
  name?: string;
  viewClassName?: string;
  labelClassName?: string;
  textInputClassName?: string;
  value: string;
  errorMessage?: string;
  isError: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
  returnKeyType?: TextInputProps["returnKeyType"];
};

const CampoDeTexto = ({
  label,
  placeholder = "",
  viewClassName = "",
  labelClassName = "",
  textInputClassName = "",
  value,
  errorMessage = "",
  isError,
  setValue,
  keyboardType = "number-pad",
  secureTextEntry = false,
  autoCapitalize = "sentences",
  autoComplete,
  name="",
  returnKeyType,
  ...props
}: CampoDeTextoProps) => {
  return (
    <View>
      <View className={cn("gap-1", viewClassName)}>
        <Text className={cn("text-black text-xl", labelClassName)}>
          {label}
        </Text>
        <TextInput
          value={value}
          onChangeText={(e) => setValue(e)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          returnKeyType={returnKeyType}
          className={cn(
            "bg-white px-4 w-20 text-lg rounded-xl h-16",
            textInputClassName
          )}
          {...props}
        />
      </View>
      {isError ? (
        <Text className="text-red-600 mt-2">{errorMessage}</Text>
      ) : null}
    </View>
  );
};
export default CampoDeTexto;
