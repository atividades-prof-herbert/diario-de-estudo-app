import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  titulo: string;
  textoBotao?: string;
};

export default function Login({ titulo, textoBotao = 'Entrar' }: Props) {
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
        placeholder="••••••••"
        secureTextEntry
      />

      <TouchableOpacity style={estilos.botao}>
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
