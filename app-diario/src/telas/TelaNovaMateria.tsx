import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import Cabecalho from '../componentes/Cabecalho';
import CartaoMateria from '../componentes/CartaoMateria';
import { adicionarMateria, atualizarMateria, listarMateriasPorUsuario, removerMateria } from '../services/MateriaService';
import { getUsuarioLogado } from '../services/SessaoService';
import { confirmarAlerta, mostrarAlerta } from '../utils/alerta';
import { Materia } from '../types/Materia';

export default function TelaNovaMateria() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [corDestaque, setCorDestaque] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [materias, setMaterias] = useState<Materia[]>([]);

  useEffect(() => {
    if (!getUsuarioLogado()) {
      router.replace('/');
      return;
    }
    recarregar();
  }, []);

  async function recarregar() {
    const usuarioLogado = getUsuarioLogado();
    if (!usuarioLogado) return;
    const materiasCarregadas = await listarMateriasPorUsuario(usuarioLogado.id);
    setMaterias(materiasCarregadas);
  }

  function limparFormulario() {
    setNome('');
    setDescricao('');
    setCorDestaque('');
    setEditandoId(null);
  }

  async function salvar() {
    if (!nome.trim()) {
      mostrarAlerta('Campo obrigatório', 'Informe o nome da matéria.');
      return;
    }

    const usuarioLogado = getUsuarioLogado();
    if (!usuarioLogado) {
      mostrarAlerta('Sessão encerrada', 'Faça login novamente.');
      router.replace('/');
      return;
    }

    if (editandoId !== null) {
      await atualizarMateria(editandoId, { nome, descricao, corDestaque: corDestaque || undefined });
    } else {
      await adicionarMateria({ nome, descricao, corDestaque: corDestaque || undefined, usuarioId: usuarioLogado.id });
    }

    limparFormulario();
    recarregar();
  }

  function editar(materia: Materia) {
    setNome(materia.nome);
    setDescricao(materia.descricao);
    setCorDestaque(materia.corDestaque ?? '');
    setEditandoId(materia.id);
  }

  function excluir(id: string, nomeDaMateria: string) {
    confirmarAlerta(
      'Excluir matéria',
      `Deseja excluir "${nomeDaMateria}"?`,
      async () => {
        await removerMateria(id);
        recarregar();
      }
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo={editandoId !== null ? 'Editar matéria' : 'Nova matéria'} />

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
        <Text style={estilos.botaoTexto}>
          {editandoId !== null ? 'Salvar alterações' : 'Salvar matéria'}
        </Text>
      </TouchableOpacity>

      {editandoId !== null && (
        <TouchableOpacity style={estilos.botaoCancelar} onPress={limparFormulario}>
          <Text style={estilos.botaoCancelarTexto}>Cancelar edição</Text>
        </TouchableOpacity>
      )}

      <Text style={estilos.secaoTitulo}>Matérias cadastradas</Text>

      {materias.length === 0 ? (
        <Text style={estilos.vazio}>Nenhuma matéria cadastrada.</Text>
      ) : (
        materias.map((m) => (
          <CartaoMateria
            key={m.id}
            nome={m.nome}
            descricao={m.descricao}
            corDestaque={m.corDestaque}
            onEditar={() => editar(m)}
            onExcluir={() => excluir(m.id, m.nome)}
          />
        ))
      )}
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
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoCancelar: {
    borderWidth: 1,
    borderColor: '#4A90D9',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoCancelarTexto: {
    color: '#4A90D9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 32,
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  vazio: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
