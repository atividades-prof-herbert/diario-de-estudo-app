import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import CartaoTopico from '../componentes/CartaoTopico';
import { buscarMateriaPorId } from '../services/MateriaService';
import { listarTopicosPorMateria } from '../services/TopicoService';
import { Materia } from '../types/Materia';
import { Topico } from '../types/Topico';

export default function TelaTopicosMateria() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [materia, setMateria] = useState<Materia | undefined>(undefined);
  const [topicos, setTopicos] = useState<Topico[]>([]);

  useEffect(() => {
    if (!id) return;

    async function carregarMateria() {
      const materiaEncontrada = await buscarMateriaPorId(id);
      setMateria(materiaEncontrada);
      if (materiaEncontrada) {
        const topicosCarregados = await listarTopicosPorMateria(materiaEncontrada.id);
        setTopicos(topicosCarregados);
      }
    }

    carregarMateria();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo={materia?.nome ?? 'Tópicos'} subtitulo="Conteúdos desta matéria" />

      {topicos.length === 0 ? (
        <Text style={estilos.vazio}>Nenhum tópico cadastrado.</Text>
      ) : (
        topicos.map((topico) => (
          <CartaoTopico
            key={topico.id}
            nome={topico.nome}
            materiaVinculada={materia?.nome ?? 'Desconhecida'}
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
