import useBaixaViewModel from "@/ViewModel/useBaixaViewModel";
import { View, Text} from "react-native";
import CartaoDeTask from "../../components/CartaoDeTask/CartaoDeTask";

const Baixa = () => {
    const { task } = useBaixaViewModel();
    console.log(task)
    return (
        <View>
            <Text>Tarefa a ser finalizada</Text>
            {task && 
                <CartaoDeTask task={task} />
            }        
        </View>
    )
}

export default Baixa