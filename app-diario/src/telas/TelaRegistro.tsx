import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import CartaoRegistro from '../componentes/CartaoRegistro';
import { listarMateriasPorUsuario } from '../services/MateriaService';
import { listarRegistrosPorMaterias } from '../services/RegistroService';
import { getUsuarioLogado } from '../services/SessaoService';
import { listarTopicosPorMaterias } from '../services/TopicoService';
import { Materia } from '../types/Materia';
import { Registro } from '../types/Registro';
import { Topico } from '../types/Topico';

export default function TelaRegistro() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [topicos, setTopicos] = useState<Topico[]>([]);

  useEffect(() => {
    const usuarioLogado = getUsuarioLogado();
    if (!usuarioLogado) {
      router.replace('/');
      return;
    }

    async function carregarDados() {
      const materiasCarregadas = await listarMateriasPorUsuario(usuarioLogado!.id);
      const materiaIds = materiasCarregadas.map((m) => m.id);

      const [registrosCarregados, topicosCarregados] = await Promise.all([
        listarRegistrosPorMaterias(materiaIds),
        listarTopicosPorMaterias(materiaIds),
      ]);

      setMaterias(materiasCarregadas);
      setRegistros(registrosCarregados);
      setTopicos(topicosCarregados);
    }

    carregarDados();
  }, []);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Diário de Estudos" subtitulo="Registros de sessões" />

      {/* Ternário: precisamos exibir UMA coisa OU OUTRA (mensagem ou lista),
          então o ternário deixa a intenção mais explícita do que um && duplo. */}
      {registros.length === 0 ? (
        <Text style={estilos.vazio}>Nenhum registro encontrado.</Text>
      ) : (
        registros.map((item) => (
          <CartaoRegistro
            key={item.id}
            materia={materias.find((m) => m.id === item.materiaId)?.nome ?? 'Desconhecida'}
            topico={item.topicoId ? topicos.find((t) => t.id === item.topicoId)?.nome : undefined}
            descricao={item.descricao}
            data={item.data}
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
  vazio: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 12,
  },
});
