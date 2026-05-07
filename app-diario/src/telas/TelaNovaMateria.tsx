import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import Cabecalho from '../componentes/Cabecalho';
import { adicionarMateria } from '../services/MateriaService';
import { mostrarAlerta } from '../utils/alerta';

export default function TelaNovaMateria() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [corDestaque, setCorDestaque] = useState('');

  function salvar() {
    if (!nome.trim()) {
      mostrarAlerta('Campo obrigatório', 'Informe o nome da matéria.');
      return;
    }
    
    //adiciona a materia no banco de dados
    adicionarMateria({ nome, descricao, corDestaque: corDestaque || undefined });

    //exibe o alerta de sucesso e limpa os campos do formulário
    mostrarAlerta('Matéria salva!', `"${nome}" adicionada com sucesso.`);
    setNome('');
    setDescricao('');
    setCorDestaque('');
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Nova matéria" />

      <Text style={estilos.label}>Nome *</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Matemática"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={estilos.label}>Descrição</Text>
      <TextInput
        style={[estilos.input, estilos.inputMultiline]}
        placeholder="Descreva brevemente a matéria"
        multiline
        numberOfLines={3}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={estilos.label}>Cor de destaque</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: #4A90D9"
        value={corDestaque}
        onChangeText={setCorDestaque}
      />
      

      <TouchableOpacity style={estilos.botao} onPress={salvar}>
        <Text style={estilos.botaoTexto}>Salvar matéria</Text>
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
  previewCor: {
    height: 24,
    borderRadius: 6,
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
