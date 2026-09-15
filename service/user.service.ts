import api from "@/lib/axios.config";
import { SigninSchema } from "../schemas/signin.schema";
import { SignUpType } from "../schemas/signup.schema";
import { isAxiosError } from "axios";

//Avançado - react hook form
export async function Signin({ email, password }: SigninSchema) {
  const { status } = await api.post("/api/users/login", { email, password });
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

export async function CreateAccount({
  name,
  email,
  role,
  nif,
  password,
}: SignUpType): Promise<number> {
  const { status } = await api.post("/api/users/", {
    name,
    email,
    role,
    nif,
    password,
  });
  return status;
}
