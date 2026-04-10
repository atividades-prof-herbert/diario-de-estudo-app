import { Alert, ScrollView, StyleSheet, Text } from 'react-native';

import LoginPress from '../componentes/LoginPress';

export default function InicioLoginPress() {
  function aoEntrar() {
    Alert.alert('Login', 'Botão de entrar pressionado!');
  }

  function aoCadastrar() {
    Alert.alert('Cadastro', 'Botão de cadastro pressionado!');
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.secao}>Acesso ao diário</Text>

      {/* Mesmo componente, comportamentos diferentes via onPress */}
      <LoginPress
        titulo="Acesse sua conta"
        textoBotao="Entrar no diário"
        onPress={aoEntrar}
      />

      <Text style={estilos.separador}>— ou —</Text>

      <LoginPress
        titulo="Crie sua conta"
        textoBotao="Cadastrar"
        onPress={aoCadastrar}
      />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  secao: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 8,
    color: '#333',
  },
  separador: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
    fontSize: 13,
  },
});
