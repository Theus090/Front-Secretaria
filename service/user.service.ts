import api from "@/lib/axios.config";
import { salvarCargoUsuario, salvarUserId } from "@/lib/secureStore";
import { isAxiosError } from "axios";
import { SigninSchema } from "../schemas/signin.schema";
import { SignUpType } from "../schemas/signup.schema";
import { PerfilUsuario } from "../types/usuario";

type UserLogin = {
  id_usuario: string;
  cargo: string;
};

export type ApiResponse = {
  message: string;
  data: {};
};

// {data: {id_usuario: 1; cargo: "role"}}

//Avançado - react hook form
export async function Signin({ email, password }: SigninSchema) {
  const { status, data } = await api.post<ApiResponse>("/api/users/login", {
    email,
    password,
  });

  const { id_usuario, cargo } = data.data as UserLogin;

  await salvarUserId(JSON.stringify(id_usuario));
  await salvarCargoUsuario(JSON.stringify(cargo));

  return status;
}

//Basico
export async function BasicSignin(email: string, password: string) {
  try {
    const { status } = await api.post("/signin", { email, password });
    return status;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.status;
    }
    throw new Error();
  }
}

// export async function CreateAccount({
//   name,
//   email,
//   role,
//   nif,
//   password,
// }: SignUpType): Promise<number> {
//   const body = {
//     name,
//     email,
//     role,
//     nif,
//     password,
//   };

//   console.log("Dados enviados para o backend:", body);

//   const { status } = await api.post("/api/users/", body);

//   return status;
// }

export async function CreateAccount({
  name,
  email,
  role,
  nif,
  password,
}: SignUpType): Promise<number> {
  const body = {
    name,
    email,
    role,
    nif,
    password,
  };

  console.log("📤 Dados enviados para o backend:", body);

  try {
    const { status, data } = await api.post("/api/users/", body);

    console.log("📥 Resposta do backend:", data);

    return status;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("❌ ERRO DO BACKEND:");
      console.log("Status:", error.response?.status);
      console.log("Resposta:", error.response?.data);
    } else {
      console.log("❌ Erro:", error);
    }

    throw error;
  }
}

export async function BuscarUsuario(id: string): Promise<PerfilUsuario> {
  const { data } = await api.get<ApiResponse>(`/api/users/${id}`);
  console.log("Resposta do usuário:", JSON.stringify(data));

  const u = data.data as PerfilUsuario;

  return {
    nome: u.nome,
    email: u.email,
    cargo: u.cargo,
    nif: u.nif,
  };
}
