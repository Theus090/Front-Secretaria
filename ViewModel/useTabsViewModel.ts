import { useQuery } from "@tanstack/react-query";
import { obterCargo } from "../lib/secureStore";

export default function useTabsViewModel() {
    const cargoQuery = useQuery<string | null>({
        queryKey: ["session", "cargo"],
        queryFn: obterCargo,
        staleTime: Infinity,
    });

  const cargo = (cargoQuery.data ?? "")
    .replace(/["']/g, "") // tira aspas
    .trim()
    .toLowerCase();

console.log("cargo limpo:", cargo);

return {
    isLoading: cargoQuery.isLoading,
    isDiretor: cargo === "direction",
};

}