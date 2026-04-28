import { ScrollView, StyleSheet, Text } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import CartaoRegistro from '../componentes/CartaoRegistro';

type Registro = {
  materia: string;
  topico: string;
  descricao?: string;
  data: string;
};

const registros: Registro[] = [
  { materia: 'Matemática', topico: 'Derivadas', descricao: 'Regra da cadeia e produto', data: '21/04/2025' },
  { materia: 'Programação', topico: 'React Native', descricao: 'Componentes e props', data: '22/04/2025' },
  { materia: 'Português', topico: 'Concordância verbal', data: '23/04/2025' },
  { materia: 'Programação', topico: 'TypeScript', descricao: 'Tipos, interfaces e generics', data: '24/04/2025' },
];

export default function TelaRegistro() {
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
            key={`${item.topico}-${item.data}`}
            materia={item.materia}
            topico={item.topico}
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
