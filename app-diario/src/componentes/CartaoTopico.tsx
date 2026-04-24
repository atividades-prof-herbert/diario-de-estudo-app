import { StyleSheet, Text, View } from 'react-native';

type Props = {
  nome: string;
  materiaVinculada: string;
  concluido?: boolean;
};

export default function CartaoTopico({ nome, materiaVinculada, concluido = false }: Props) {
  return (
    <View style={estilos.cartao}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.nome}>{nome}</Text>
        {concluido && <Text style={estilos.badge}>Concluído</Text>}
      </View>
      <Text style={estilos.materia}>{materiaVinculada}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    flexShrink: 1,
  },
  badge: {
    fontSize: 12,
    color: '#2ECC71',
    fontWeight: '600',
    marginLeft: 8,
  },
  materia: {
    fontSize: 12,
    color: '#777',
  },
});