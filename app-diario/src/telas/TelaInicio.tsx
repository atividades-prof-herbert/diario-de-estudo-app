import { ScrollView, StyleSheet, Text } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import CartaoMateria from '../componentes/CartaoMateria';

type Materia = {
  nome: string;
  descricao: string;
  corDestaque?: string;
};

const materias: Materia[] = [
  { nome: 'Matemática', descricao: 'Álgebra linear e cálculo diferencial' },
  { nome: 'Português', descricao: 'Gramática, interpretação de texto e redação', corDestaque: '#E05C5C' },
  { nome: 'Programação', descricao: 'React Native, TypeScript e lógica de programação', corDestaque: '#2ECC71' },
];

export default function TelaInicio() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Diário de Estudos" subtitulo="Suas matérias cadastradas" />

      {/* Ternário: precisamos exibir UMA coisa OU OUTRA (mensagem ou lista),
          então o ternário deixa a intenção mais explícita do que um && duplo. */}
      {materias.length === 0 ? (
        <Text style={estilos.vazio}>Nenhuma matéria cadastrada.</Text>
      ) : (
        materias.map((item) => (
          <CartaoMateria
            key={item.nome}
            nome={item.nome}
            descricao={item.descricao}
            corDestaque={item.corDestaque}
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
  },
  vazio: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 12,
    marginHorizontal: 20,
  },
});
