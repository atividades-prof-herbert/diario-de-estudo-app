import { ScrollView, StyleSheet, Text } from 'react-native';

import CartaoMateria from '../componentes/CartaoMateria';

type Materia = {
  nome: string;
  descricao: string;
  corDestaque?: string;
};

// Dados estáticos — em aula-04 virão de um useState ou useEffect
const materias: Materia[] = [
  { nome: 'Matemática', descricao: 'Álgebra linear e cálculo diferencial' },
  { nome: 'Português', descricao: 'Gramática, interpretação de texto e redação', corDestaque: '#E05C5C' },
  { nome: 'Programação', descricao: 'React Native, TypeScript e lógica de programação', corDestaque: '#2ECC71' },
];

export default function InicioMap() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.secao}>Matérias cadastradas</Text>

      {materias.map((itemMateria) => (
        <CartaoMateria
          key={itemMateria.nome}
          nome={itemMateria.nome}
          descricao={itemMateria.descricao}
          corDestaque={itemMateria.corDestaque}
        />
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  secao: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 16,
    color: '#333',
  },
});
