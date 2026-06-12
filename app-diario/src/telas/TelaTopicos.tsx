import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Cabecalho from '../componentes/Cabecalho';
import CartaoTopico from '../componentes/CartaoTopico';
import { buscarMateriaPorId, listarMaterias } from '../services/MateriaService';
import { listarTopicos, listarTopicosPorMateria } from '../services/TopicoService';
import { useEffect, useState } from 'react';
import { Materia } from '../types/Materia';
import { Topico } from '../types/Topico';

export default function TelaTopicos() {

    const [topicos, setTopicos] = useState<Topico[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [materiaId, setMateriaId] = useState(0);

    /**
     * Este useEffect é executado apenas uma vez, quando a tela é montada (não tem dependências). 
     * Ele é responsável por carregar a lista de matérias do "banco de dados" e armazená-la no estado. 
     * Assim, quando o usuário abrir a tela, ele já terá as matérias disponíveis 
     * para filtrar os tópicos.
     * 
     */
    useEffect(() => {
      setMaterias(listarMaterias());
    }, []);


    /**Este useEffect é executado sempre que o valor de `materiaId` mudar. 
     * Ele é responsável por carregar a lista de tópicos com base na matéria selecionada.
     * 
     * o const id = Number(materiaId); 
     * é necessário porque o valor selecionado no Picker é do tipo string.
     * Assim, precisamos convertê-lo para número para compará-lo corretamente com os IDs das matérias.
     */
    useEffect(() => {
      const id = Number(materiaId);
      if (id === 0) {
        setTopicos(listarTopicos());
      } else {
        setTopicos(listarTopicosPorMateria(id));
      }
    }, [materiaId]);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Tópicos" subtitulo="Conteúdos por matéria" />

      <View style={estilos.picker}>
        <Picker selectedValue={materiaId} onValueChange={setMateriaId}>
          <Picker.Item label="Todas as matérias" value={0} />
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
  picker: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 16,
  },
});
