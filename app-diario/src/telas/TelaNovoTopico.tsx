import { Picker } from '@react-native-picker/picker';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mostrarAlerta } from '../utils/alerta';
import { useEffect, useState } from 'react';

import Cabecalho from '../componentes/Cabecalho';
import { listarMaterias } from '../services/MateriaService';
import { adicionarTopico } from '../services/TopicoService';
import { Materia } from '../types/Materia';

export default function TelaNovoTopico() {
  const [nome, setNome] = useState('');
  const [materiaId, setMateriaId] = useState('');
  const [concluido, setConcluido] = useState(false);
  const [materias, setMaterias] = useState<Materia[]>([]);

  useEffect(() => {
    async function carregarMaterias() {
      const materiasCarregadas = await listarMaterias();
      setMaterias(materiasCarregadas);
    }

    carregarMaterias();
  }, []);

  function salvar() {
    if (!nome.trim()) {
      mostrarAlerta('Campo obrigatório', 'Informe o nome do tópico.');
      return;
    }
    if (!materiaId) {
      mostrarAlerta('Campo obrigatório', 'Selecione a matéria do tópico.');
      return;
    }
    adicionarTopico({ nome, materiaId, concluido });
    mostrarAlerta('Tópico salvo!', 'Nome: ' + nome);
    setNome('');
    setMateriaId('');
    setConcluido(false);
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
      <View style={estilos.picker}>
        <Picker selectedValue={materiaId} onValueChange={setMateriaId}>
          <Picker.Item label="Selecione uma matéria..." value="" />
          {materias.map((m) => (
            <Picker.Item key={m.id} label={m.nome} value={m.id} />
          ))}
        </Picker>
      </View>

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
  picker: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
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
