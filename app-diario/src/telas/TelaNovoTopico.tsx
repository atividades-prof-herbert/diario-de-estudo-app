import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mostrarAlerta } from '../utils/alerta';
import { useState } from 'react';

import Cabecalho from '../componentes/Cabecalho';

export default function TelaNovoTopico() {
  const [nome, setNome] = useState('');
  const [materia, setMateria] = useState('');
  const [concluido, setConcluido] = useState(false);

  function salvar() {
    if (!nome.trim()) {
      mostrarAlerta('Campo obrigatório', 'Informe o nome do tópico.');
      return;
    }
    if (!materia.trim()) {
      mostrarAlerta('Campo obrigatório', 'Informe a matéria do tópico.');
      return;
    }
    mostrarAlerta('Tópico salvo com sucesso!');
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Novo tópico" />

      <Text style={estilos.label}>Nome *</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Derivadas"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={estilos.label}>Matéria *</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Matemática"
        value={materia}
        onChangeText={setMateria}
      />

      <View style={estilos.switchRow}>
        <Text style={estilos.label}>Concluído</Text>
        <Switch value={concluido} onValueChange={setConcluido} />
      </View>

      <TouchableOpacity style={estilos.botao} onPress={salvar}>
        <Text style={estilos.botaoTexto}>Salvar tópico</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#222',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  botao: {
    backgroundColor: '#4A90D9',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
