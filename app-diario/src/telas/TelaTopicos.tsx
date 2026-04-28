import { ScrollView, StyleSheet, Text } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import CartaoTopico from '../componentes/CartaoTopico';

type Topico = {
  nome: string;
  materiaVinculada: string;
  concluido: boolean;
};

const topicos: Topico[] = [
  { nome: 'Funções de 1º grau', materiaVinculada: 'Matemática', concluido: true },
  { nome: 'Sistemas lineares', materiaVinculada: 'Matemática', concluido: false },
  { nome: 'Análise sintática', materiaVinculada: 'Português', concluido: true },
  { nome: 'Hooks no React', materiaVinculada: 'Programação', concluido: false },
  { nome: 'TypeScript básico', materiaVinculada: 'Programação', concluido: true },
];

export default function TelaTopicos() {
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
            key={topico.nome}
            nome={topico.nome}
            materiaVinculada={topico.materiaVinculada}
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
