import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import CartaoRegistro from '../componentes/CartaoRegistro';
import { listarMaterias } from '../services/MateriaService';
import { listarRegistros } from '../services/RegistroService';
import { buscarTopicoPorId } from '../services/TopicoService';
import { Materia } from '../types/Materia';

export default function TelaRegistro() {
  const registros = listarRegistros();
  const [materias, setMaterias] = useState<Materia[]>([]);

  useEffect(() => {
    async function carregarMaterias() {
      const materiasCarregadas = await listarMaterias();
      setMaterias(materiasCarregadas);
    }

    carregarMaterias();
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
            topico={item.topicoId ? buscarTopicoPorId(item.topicoId)?.nome : undefined}
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
