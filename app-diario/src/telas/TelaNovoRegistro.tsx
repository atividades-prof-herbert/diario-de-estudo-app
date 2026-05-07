import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { mostrarAlerta } from '../utils/alerta';

import Cabecalho from '../componentes/Cabecalho';

export default function TelaNovoRegistro() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Novo registro" />

      <Text style={estilos.label}>Nome da matéria</Text>
      <TextInput style={estilos.input} placeholder="Ex.: Matemática" />

      <Text style={estilos.label}>Nome do tópico</Text>
      <TextInput style={estilos.input} placeholder="Ex.: Derivadas" />

      <Text style={estilos.label}>Descrição</Text>
      <TextInput
        style={[estilos.input, estilos.inputMultiline]}
        placeholder="Descreva brevemente a sessão de estudo"
        multiline
        numberOfLines={3}
      />

      <Text style={estilos.label}>Data</Text>
      <TextInput style={estilos.input} placeholder="Ex.: 24/04/2025" />

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => mostrarAlerta('Registro salvo com sucesso!')}
      >
        <Text style={estilos.botaoTexto}>Salvar registro</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#222',
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#4A90D9',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
