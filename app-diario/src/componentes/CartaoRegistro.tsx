import { StyleSheet, Text, View } from 'react-native';

type CartaoRegistroProps = {
  materia: string;
  topico: string;
  descricao?: string;
  data: string;
};

export default function CartaoRegistro({ materia, topico, descricao, data }: CartaoRegistroProps) {
  return (
    <View style={estilos.cartao}>
      <Text style={estilos.materia}>{materia}</Text>
      <Text style={estilos.topico}>{topico}</Text>
      {descricao && <Text style={estilos.descricao}>{descricao}</Text>}
      <Text style={estilos.data}>{data}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  materia: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  topico: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  data: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});
