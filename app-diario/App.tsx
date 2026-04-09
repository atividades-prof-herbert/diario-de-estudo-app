import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Inicio from './src/telas/Inicio';

export default function App() {
  return (
    <View style={estilos.container}>
      <Inicio />
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
