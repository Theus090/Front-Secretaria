import React from 'react';
import { BuscarUsuario } from "../service/user.service";
import { View, Text } from 'react-native';
import { FlatList } from 'react-native';
import CardContagem from '@/components/CardContagem/CardContagem';

export default function Configuracao() {
    const { usuario, setUsuario, carregando, erro } = useGerenciamentoViewModel();
    return (
        <View>
            <Text>Configuração</Text>
            <View>
                <Text>Usuarios</Text>
                <FlatList
            data={usuario}
            keyExtractor={(item) => String(item.id_sala)}
            contentContainerStyle={{ padding: 16, gap: 16 }}
            renderItem={({ item }) => <CardContagem  name="count" sala={item}  />}
            
            
            </View>
        </View>
    );
}
