import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CartaoMateriaProps = {
  nome: string;
  descricao: string;
  corDestaque?: string;
  onEditar?: () => void;
  onExcluir?: () => void;
};

export default function CartaoMateria({ nome, descricao, corDestaque = '#4A90D9', onEditar, onExcluir }: CartaoMateriaProps) {
  return (
    <View style={[estilos.cartao, { borderLeftColor: corDestaque }]}>
      <View style={estilos.info}>
        <Text style={[estilos.nome, { color: corDestaque }]}>{nome}</Text>
        <Text style={estilos.descricao}>{descricao}</Text>
      </View>

      {(onEditar || onExcluir) && (
        <View style={estilos.acoes}>
          {onEditar && (
            <TouchableOpacity style={[estilos.botao, estilos.botaoEditar]} onPress={onEditar}>
              <Text style={estilos.botaoTexto}>Editar</Text>
            </TouchableOpacity>
          )}
          {onExcluir && (
            <TouchableOpacity style={[estilos.botao, estilos.botaoExcluir]} onPress={onExcluir}>
              <Text style={estilos.botaoTexto}>Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  info: {
    flex: 1,
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
  acoes: {
    flexDirection: 'row',
    gap: 6,
  },
  botao: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  botaoEditar: {
    backgroundColor: '#4A90D9',
  },
  botaoExcluir: {
    backgroundColor: '#E05C5C',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
