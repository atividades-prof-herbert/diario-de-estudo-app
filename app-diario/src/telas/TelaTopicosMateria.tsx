import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import CartaoTopico from '../componentes/CartaoTopico';
import { buscarMateriaPorId } from '../services/MateriaService';
import { listarTopicosPorMateria } from '../services/TopicoService';
import { Topico } from '../types/Topico';
import { mostrarAlerta } from '../utils/alerta';

export default function TelaTopicosMateria() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [topicos, setTopicos] = useState<Topico[]>([]);

  const materia = buscarMateriaPorId(Number(id));
  mostrarAlerta('Matéria selecionada', `Você selecionou a matéria: ${materia?.nome ?? 'Desconhecida'}`);

  useEffect(() => {
    if (materia) {
      setTopicos(listarTopicosPorMateria(materia.id));
    }
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
