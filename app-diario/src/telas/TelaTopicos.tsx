import { ScrollView, StyleSheet, Text } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import CartaoTopico from '../componentes/CartaoTopico';
import { buscarMateriaPorId, listarMaterias } from '../services/MateriaService';
import { listarTopicos } from '../services/TopicoService';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router/build/exports';
import { Topico } from '../types/Topico';

export default function TelaTopicos() {
 

    const [topicos, setTopicos] = useState<Topico[]>([]);
  
    useFocusEffect(
      useCallback(() => {
        setTopicos(listarTopicos());
      }, [])
    );

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Tópicos" subtitulo="Conteúdos por matéria" />

      {/* Ternário: precisamos exibir UMA coisa OU OUTRA (mensagem ou lista),
          então o ternário deixa a intenção mais explícita do que um && duplo. */}
      {topicos.length === 0 ? (
        <Text style={estilos.vazio}>Nenhum tópico cadastrado.</Text>
      ) : (
        topicos.map((topico) => (
          <CartaoTopico
            key={topico.id}
            nome={topico.nome}
            materiaVinculada={buscarMateriaPorId(topico.materiaId)?.nome ?? 'Desconhecida'}
            concluido={topico.concluido}
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
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  vazio: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 12,
  },
});
