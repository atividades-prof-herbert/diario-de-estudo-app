import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';

export default function TelaCadastro() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Criar conta" />

      <Text style={estilos.rotulo}>Nome</Text>
      <TextInput style={estilos.entrada} placeholder="Seu nome completo" />

      <Text style={estilos.rotulo}>Email</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="seu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={estilos.rotulo}>Senha</Text>
      <TextInput style={estilos.entrada} placeholder="Crie uma senha" secureTextEntry />

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => router.replace('/')}
      >
        <Text style={estilos.textoBotao}>Criar conta</Text>
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
  rotulo: {
    fontSize: 14,
    color: '#333',
    marginTop: 16,
    marginBottom: 4,
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#4A90D9',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
