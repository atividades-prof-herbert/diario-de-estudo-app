import { ScrollView, StyleSheet, Text } from 'react-native';

import CartaoMateria from '../componentes/CartaoMateria';
import CartaoTopico from '../componentes/CartaoTopico';
import Login from '../componentes/Login';

export default function Inicio() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.secao}>Matérias cadastradas</Text>

      <CartaoMateria
        nome="Matemática"
        descricao="Álgebra linear e cálculo diferencial"
      />
      <CartaoMateria
        nome="Português"
        descricao="Gramática, interpretação de texto e redação"
        corDestaque="#E05C5C"
      />
      <CartaoMateria
        nome="Programação"
        descricao="React Native, TypeScript e lógica de programação"
        corDestaque="#2ECC71"
      />

      <Text style={estilos.secao}>Tópicos</Text>

      <CartaoTopico
        nome="Álgebra Linear"
        materiaVinculada="Matemática"
      />
      <CartaoTopico
        nome="Interpretação de Texto"
        materiaVinculada="Português"
        concluido
      />
      <CartaoTopico
        nome="Componentes e Props"
        materiaVinculada="Programação"
        concluido
      />

      <Login titulo="Acesse sua conta" textoBotao="Entrar no diário" />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  secao: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 4,
    color: '#333',
  },
});
