import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Cabecalho from '../componentes/Cabecalho';
import CartaoTopico from '../componentes/CartaoTopico';
import { listarMaterias } from '../services/MateriaService';
import { listarTopicos, listarTopicosPorMateria } from '../services/TopicoService';
import { useEffect, useState } from 'react';
import { Materia } from '../types/Materia';
import { Topico } from '../types/Topico';

export default function TelaTopicos() {

    const [topicos, setTopicos] = useState<Topico[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [materiaId, setMateriaId] = useState('');

    /**
     * Este useEffect é executado apenas uma vez, quando a tela é montada (não tem dependências).
     * Ele é responsável por carregar a lista de matérias do Firestore e armazená-la no estado.
     * Assim, quando o usuário abrir a tela, ele já terá as matérias disponíveis
     * para filtrar os tópicos.
     *
     */
    useEffect(() => {
      async function carregarMaterias() {
        const materiasCarregadas = await listarMaterias();
        setMaterias(materiasCarregadas);
      }

      carregarMaterias();
    }, []);


    /**Este useEffect é executado sempre que o valor de `materiaId` mudar.
     * Ele é responsável por carregar a lista de tópicos com base na matéria selecionada.
     *
     * O materiaId já vem como string do Picker, que é o mesmo tipo do ID
     * gerado pelo Firestore, então não é mais necessário convertê-lo para número.
     */
    useEffect(() => {
      if (materiaId === '') {
        setTopicos(listarTopicos());
      } else {
        setTopicos(listarTopicosPorMateria(materiaId));
      }
    }, [materiaId]);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Tópicos" subtitulo="Conteúdos por matéria" />

      <View style={estilos.picker}>
        <Picker selectedValue={materiaId} onValueChange={setMateriaId}>
          <Picker.Item label="Todas as matérias" value="" />
          {materias.map((m) => (
            <Picker.Item key={m.id} label={m.nome} value={m.id} />
          ))}
        </Picker>
      </View>

      {/* Ternário: precisamos exibir UMA coisa OU OUTRA (mensagem ou lista),
          então o ternário deixa a intenção mais explícita do que um && duplo. */}
      {topicos.length === 0 ? (
        <Text style={estilos.vazio}>Nenhum tópico cadastrado.</Text>
      ) : (
        topicos.map((topico) => (
          <CartaoTopico
            key={topico.id}
            nome={topico.nome}
            materiaVinculada={materias.find((m) => m.id === topico.materiaId)?.nome ?? 'Desconhecida'}
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
  picker: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 16,
  },
});
