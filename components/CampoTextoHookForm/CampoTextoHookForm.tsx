import { cn } from "@/lib/cn";
import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type CampoTextHookFormProps<T extends FieldValues> = {
  label: string;
  errorMessage?: string;
  placeholder?: string;
  viewClassName?: string;
  labelClassName?: string;
  textInputClassName?: string;
  name: Path<T>;
  control: Control<T>;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
  returnKeyType?: TextInputProps["returnKeyType"];
};

const CampoTextHookForm = <T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  viewClassName = "",
  labelClassName = "",
  textInputClassName = "",
  placeholder = "",
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "none",
  autoComplete,
  returnKeyType,
}: CampoTextHookFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <View>
      <View className={cn("gap-1", viewClassName)}>
        <Text className={cn("text-black text-xl", labelClassName)}>
          {label}
        </Text>
        <TextInput
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          returnKeyType={returnKeyType}
          style={{ includeFontPadding: false }}
          className={cn(
            "bg-[#F8FAFC] px-4 w-72 text-lg rounded-xl border border-[#E2E8F0] h-16 text-black font-sans",
            textInputClassName
          )}
        />
      </View>
      {error ? (
        <Text className="text-red-600 mt-2">{errorMessage ?? error.message}</Text>
      ) : null}
    </View>
  );
};

export default CampoTextHookForm;
