import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { mostrarAlerta } from '../utils/alerta';

import Cabecalho from '../componentes/Cabecalho';
import { listarMateriasPorUsuario } from '../services/MateriaService';
import { adicionarRegistro } from '../services/RegistroService';
import { getUsuarioLogado } from '../services/SessaoService';
import { listarTopicosPorMateria } from '../services/TopicoService';
import { Materia } from '../types/Materia';
import { Topico } from '../types/Topico';

export default function TelaNovoRegistro() {
  const [materiaId, setMateriaId] = useState('');
  const [topicoId, setTopicoId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  const [materias, setMaterias] = useState<Materia[]>([]);
  const [topicos, setTopicos] = useState<Topico[]>([]);

  useEffect(() => {
    const usuarioLogado = getUsuarioLogado();
    if (!usuarioLogado) {
      router.replace('/');
      return;
    }

    async function carregarMaterias() {
      const materiasCarregadas = await listarMateriasPorUsuario(usuarioLogado!.id);
      setMaterias(materiasCarregadas);
    }

    carregarMaterias();
  }, []);

  useEffect(() => {
    async function carregarTopicos() {
      if (materiaId) {
        const topicosCarregados = await listarTopicosPorMateria(materiaId);
        setTopicos(topicosCarregados);
      } else {
        setTopicos([]);
      }
      setTopicoId('');
    }

    carregarTopicos();
  }, [materiaId]);

  async function salvar() {
    if (!materiaId) {
      mostrarAlerta('Campo obrigatório', 'Selecione a matéria.');
      return;
    }
    await adicionarRegistro({ materiaId, topicoId: topicoId || undefined, descricao, data });
    mostrarAlerta('Registro salvo!', 'Registro adicionado com sucesso.');
    setMateriaId('');
    setTopicoId('');
    setDescricao('');
    setData('');
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Novo registro" />

      <Text style={estilos.label}>Matéria</Text>
      <View style={estilos.picker}>
        <Picker selectedValue={materiaId} onValueChange={setMateriaId}>
          <Picker.Item label="Selecione uma matéria..." value="" />
          {materias.map((m) => (
            <Picker.Item key={m.id} label={m.nome} value={m.id} />
          ))}
        </Picker>
      </View>

      <Text style={estilos.label}>Tópico</Text>
      <View style={estilos.picker}>
        <Picker selectedValue={topicoId} onValueChange={setTopicoId} enabled={materiaId !== ''}>
          <Picker.Item label={materiaId ? 'Selecione um tópico...' : 'Selecione a matéria primeiro'} value="" />
          {topicos.map((t) => (
            <Picker.Item key={t.id} label={t.nome} value={t.id} />
          ))}
        </Picker>
      </View>

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
  picker: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
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
