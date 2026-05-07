import { Stack } from 'expo-router';

export default function Layout() {
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
