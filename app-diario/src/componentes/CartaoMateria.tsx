import { StyleSheet, Text, View } from 'react-native';

type Props = {
  nome: string;
  descricao: string;
  corDestaque?: string;
};

export default function CartaoMateria({ nome, descricao, corDestaque = '#4A90D9' }: Props) {
  return (
    <View style={[estilos.cartao, { borderLeftColor: corDestaque }]}>
      <Text style={[estilos.nome, { color: corDestaque }]}>{nome}</Text>
      <Text style={estilos.descricao}>{descricao}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderLeftWidth: 4,
    padding: 12,
    marginVertical: 6,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 13,
    color: '#555',
  },
});
