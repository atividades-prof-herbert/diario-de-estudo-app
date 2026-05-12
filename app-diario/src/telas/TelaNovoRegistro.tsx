import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { mostrarAlerta } from '../utils/alerta';

import Cabecalho from '../componentes/Cabecalho';

export default function TelaNovoRegistro() {
  const [materia, setMateria] = useState('');
  const [topico, setTopico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  function salvar() {
    if (!materia.trim() || !topico.trim()) {
      mostrarAlerta('Atenção', 'Preencha a matéria e o tópico.');
      return;
    }
    mostrarAlerta('Registro salvo!', 'Matéria: ' + materia + '\nTópico: ' + topico + '\nDescrição: ' + descricao + '\nData: ' + data);
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Novo registro" />

      <Text style={estilos.label}>Nome da matéria</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Matemática"
        value={materia}
        onChangeText={setMateria}
      />

      <Text style={estilos.label}>Nome do tópico</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Derivadas"
        value={topico}
        onChangeText={setTopico}
      />

      <Text style={estilos.label}>Descrição</Text>
      <TextInput
        style={[estilos.input, estilos.inputMultiline]}
        placeholder="Descreva brevemente a sessão de estudo"
        multiline
        numberOfLines={3}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={estilos.label}>Data</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: 24/04/2025"
        value={data}
        onChangeText={setData}
      />

      <TouchableOpacity style={estilos.botao} onPress={salvar}>
        <Text style={estilos.botaoTexto}>Salvar registro</Text>
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
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
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
