import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import LoginPress from '../componentes/LoginPress';

export default function TelaLogin() {
  function aoEntrar() {
    router.replace('/inicio');
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Diário de Estudos" subtitulo="Acesse sua conta" />

      <LoginPress
        titulo="Entrar"
        textoBotao="Entrar no diário"
        onPress={aoEntrar}
      />

      {/* TouchableOpacity sem estilo de botão, age como link */}
      <TouchableOpacity
        style={estilos.linkContainer}
        onPress={() => router.push('/cadastro')}
      >
        <Text style={estilos.link}>Não tem conta? Registre-se</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  link: {
    color: '#4A90D9',
    fontSize: 14,
  },
});
