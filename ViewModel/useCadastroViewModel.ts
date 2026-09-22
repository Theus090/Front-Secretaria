import { CreateAccount } from "@/service/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { Resolver, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { signUpBase, SignUpType } from "../schemas/signup.schema";

export default function useCadastroViewModel() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpBase) as unknown as Resolver<SignUpType>,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "select",
      nif: "",
    },
  });

  const createNewAccount = useMutation<number, AxiosError, SignUpType>({
    mutationFn: ({ name, email, password, role, nif }: SignUpType) =>
      CreateAccount({ name, email, password, role, nif }),
    onSuccess: () => {
      router.navigate("/");
    },

    onError: (error) => {
      if (error.response?.status === 409) {
        Alert.alert("Email ja em uso");
      } else {
        console.error("Erro ao criar conta", error);
      }
    },
  });

  const onSubmit = (data: SignUpType) => {
    const { ...payload } = data;
    createNewAccount.mutate(payload);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isPending: createNewAccount.isPending,
  };
}
