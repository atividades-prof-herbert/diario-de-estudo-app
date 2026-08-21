import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Cabecalho from '../componentes/Cabecalho';
import { auth } from '../services/firebase';
import { cadastrarUsuario } from '../services/UsuarioService';
import { carregarUsuarioLogado } from '../services/SessaoService';
import { mostrarAlerta } from '../utils/alerta';

export default function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');

  async function aoCriarConta() {
    if (!nome.trim() || !email.trim() || !dataNascimento.trim() || !senha.trim()) {
      mostrarAlerta('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, senha);
      await cadastrarUsuario(credencial.user.uid, { nome, email, dataNascimento });
      // createUserWithEmailAndPassword já loga automaticamente quem acabou de
      // se cadastrar, então atualizamos a sessão local e vamos direto para o
      // início, sem pedir para o usuário logar de novo.
      await carregarUsuarioLogado(credencial.user.uid);
      router.replace('/inicio');
    } catch (erro) {
      mostrarAlerta('Não foi possível criar a conta', 'Verifique o email e tente novamente.');
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Criar conta" />

      <Text style={estilos.rotulo}>Nome</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Seu nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={estilos.rotulo}>Email</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={estilos.rotulo}>Data de nascimento</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Ex.: 24/04/2000"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <Text style={estilos.rotulo}>Senha</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Crie uma senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={estilos.botao} onPress={aoCriarConta}>
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
