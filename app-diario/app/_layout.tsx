import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { observarSessao } from '../src/services/SessaoService';

export default function Layout() {
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  useEffect(() => {
    const cancelarObservador = observarSessao(() => setCarregandoSessao(false));
    return cancelarObservador;
  }, []);

  // Enquanto o Firebase Auth ainda não respondeu se existe uma sessão
  // persistida (localStorage na web, AsyncStorage no nativo), nenhuma tela
  // é montada. Isso evita que TelaInicio, por exemplo, veja getUsuarioLogado()
  // como null por engano e redirecione para o login antes da hora.
  if (carregandoSessao) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Login' }} />
      <Stack.Screen name="cadastro" options={{ title: 'Cadastro' }} />
      <Stack.Screen name="inicio" options={{ title: 'Início' }} />
      <Stack.Screen name="topicos" options={{ title: 'Tópicos' }} />
      <Stack.Screen name="registros" options={{ title: 'Registros' }} />
      <Stack.Screen name="novo-registro" options={{ title: 'Novo Registro' }} />
      <Stack.Screen name="nova-materia" options={{ title: 'Nova Matéria' }} />
      <Stack.Screen name="novo-topico" options={{ title: 'Novo Tópico' }} />
    </Stack>
  );
}
