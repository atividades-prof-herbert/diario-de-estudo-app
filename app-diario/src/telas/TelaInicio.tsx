import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import CartaoMateria from '../componentes/CartaoMateria';
import { listarMaterias } from '../services/MateriaService';
import { Materia } from '../types/Materia';

export default function TelaInicio() {
  const [materias, setMaterias] = useState<Materia[]>([]);

  useFocusEffect(
    useCallback(() => {
      setMaterias(listarMaterias());
    }, [])
  );
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Diário de Estudos" subtitulo="Suas matérias cadastradas" />

      <View style={estilos.navContainer}>
        <TouchableOpacity style={estilos.botao} onPress={() => router.push('/topicos')}>
          <Text style={estilos.botaoTexto}>Tópicos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botao} onPress={() => router.push('/registros')}>
          <Text style={estilos.botaoTexto}>Registros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[estilos.botao, estilos.botaoDestaque]} onPress={() => router.push('/novo-registro')}>
          <Text style={estilos.botaoTexto}>+ Novo Registro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[estilos.botao, estilos.botaoDestaque]} onPress={() => router.push('/nova-materia')}>
          <Text style={estilos.botaoTexto}>+ Nova Matéria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[estilos.botao, estilos.botaoDestaque]} onPress={() => router.push('/novo-topico')}>
          <Text style={estilos.botaoTexto}>+ Novo Tópico</Text>
        </TouchableOpacity>
      </View>

      {/* Ternário: precisamos exibir UMA coisa OU OUTRA (mensagem ou lista),
          então o ternário deixa a intenção mais explícita do que um && duplo. */}
      {materias.length === 0 ? (
        <Text style={estilos.vazio}>Nenhuma matéria cadastrada.</Text>
      ) : (
        materias.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => router.push('/topicos-materia/' + item.id)}>
            <CartaoMateria
              nome={item.nome}
              descricao={item.descricao}
              corDestaque={item.corDestaque}
            />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  vazio: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 12,
    marginHorizontal: 20,
  },
  navContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#4A90D9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  botaoDestaque: {
    backgroundColor: '#2ECC71',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
