import ListaRequisicoes from "@/components/ListaRequisicoes/ListaRequisicoes";
import MenuAbas from "@/components/MenuAbas/MenuAbas";
import useHomeViewModel from "@/ViewModel/useHomeViewModel";
import { View } from "react-native";

const Home = () => {
  const {
    cargos,
    cargoAtual,
    requisicoes,
    aoAtualizarRequisicoes,
    selecionarCargo,
    isErrorinCargos,
    isLoadingCargos,
    isRefetchingCargos,
    aoAtualizarCargos,
    isLoadingRequisicoes,
    isRefetchingRequests,
    isErrorInRequests,
  } = useHomeViewModel();

  return (
    <View className="flex-1">
      <MenuAbas
        abas={cargos}
        isRefreshing={isRefetchingCargos}
        aoAtualizar={aoAtualizarCargos}
        cargoAtual={cargoAtual}
        selecionarCargo={selecionarCargo}
      />
      <ListaRequisicoes
        carregando={isLoadingRequisicoes}
        atualizando={isRefetchingRequests}
        requisicoes={requisicoes}
        aoAtualizar={aoAtualizarRequisicoes}
      />
    </View>
  );
};

export default Home;
