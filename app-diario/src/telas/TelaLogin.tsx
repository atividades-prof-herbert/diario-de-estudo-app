import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import Cabecalho from '../componentes/Cabecalho';
import { mostrarAlerta } from '../utils/alerta';

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function aoEntrar() {
    if (!email.trim() || !senha.trim()) {
      mostrarAlerta('Atenção', 'Preencha email e senha.');
      return;
    }
    // outra forma: usar template string com ${}
    // mostrarAlerta('Login recebido', `Email: ${email}\nSenha: ${senha}`);
    mostrarAlerta('Login recebido', 'Email: ' + email + '\nSenha: ' + senha);
    router.replace('/inicio');
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Diário de Estudos" subtitulo="Acesse sua conta" />

      <Text style={estilos.rotulo}>Email</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={estilos.rotulo}>Senha</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={estilos.botao} onPress={aoEntrar}>
        <Text style={estilos.textoBotao}>Entrar no diário</Text>
      </TouchableOpacity>

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
  linkContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  link: {
    color: '#4A90D9',
    fontSize: 14,
  },
});
