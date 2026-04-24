import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import TelaTopicos from './src/telas/TelaTopicos';

export default function App() {
  return (
    <View style={estilos.container}>
      <TelaTopicos />
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
