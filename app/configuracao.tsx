import React from 'react';
import { BuscarUsuario } from "../service/user.service";
import CardContagem from '@/components/CardContagem/CardContagem';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import useGerenciamentoViewModel from '../ViewModel/useGerenciamentoViewModel';

export default function UsersScreen() {
  const { users, loading, error, refresh } = useGerenciamentoViewModel();

  if (loading && users.length === 0) {
    return <ActivityIndicator style={styles.center} size="large" />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button title="Tentar novamente" onPress={refresh} />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id_usuario)}
      refreshing={loading}
      onRefresh={refresh}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style="">{item.nome}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontWeight: 'bold' },
});