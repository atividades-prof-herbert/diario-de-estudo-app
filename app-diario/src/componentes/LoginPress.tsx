import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// onPress é uma prop do tipo função: não recebe argumentos e não retorna nada
type LoginPressProps = {
  titulo: string;
  textoBotao?: string;
  onPress: () => void;
};

export default function LoginPress({ titulo, textoBotao = 'Entrar', onPress }: LoginPressProps) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>

      <Text style={estilos.rotulo}>Email</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="seu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={estilos.rotulo}>Senha</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      {/* onPress é passado para o TouchableOpacity, que o chama ao toque */}
      <TouchableOpacity style={estilos.botao} onPress={onPress}>
        <Text style={estilos.textoBotao}>{textoBotao}</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  rotulo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    marginTop: 8,
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#4A90D9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
