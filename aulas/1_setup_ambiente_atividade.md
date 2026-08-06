# Aula 1 — Atividade Prática

Nesta atividade, vamos tirar o conteúdo da tela inicial de `App.tsx` e colocá-lo em um novo arquivo chamado `Home.tsx`.

## 1. Primeira fase

### Passos

1. Crie um novo arquivo chamado `Home.tsx` dentro da pasta do aplicativo.
2. No arquivo `Home.tsx`, coloque o conteúdo da tela inicial.
3. Exporte a função `Home`.
4. No arquivo `App.tsx`, importe `Home`.
5. Faça o `App.tsx` exibir `Home`.

### Exemplo do `Home.tsx`

```tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Tela inicial do app</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### Exemplo do novo `App.tsx`

```tsx
import Home from './Home';

export default function App() {
  return <Home />;
}
```

---

## 2. Segunda fase

Agora adicione um campo de texto na tela inicial usando `TextInput`.

### Passos

1. Abra o arquivo `Home.tsx`.
2. Adicione `TextInput` no import vindo de `react-native`.
3. Coloque o `TextInput` abaixo do texto da tela. [Documentação](https://reactnative.dev/docs/textinput)
4. Adicione um estilo simples para esse campo.

### Exemplo

```tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Tela inicial do app</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite algo"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 220,
    marginTop: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
  },
});
```

---

## 3. Terceira fase

Agora vamos criar um novo arquivo chamado `Login.tsx` com dois campos de texto e depois importá-lo no `Home.tsx`.

### Passos

1. Crie o arquivo `Login.tsx`.
2. Adicione dois `TextInput`.
3. Faça o segundo campo funcionar como senha usando `secureTextEntry`.
4. Exporte a função `Login`.
5. No `Home.tsx`, importe `Login`.
6. Adicione `<Login />` dentro do `return`.

### Exemplo do `Login.tsx`

```tsx
import { StyleSheet, TextInput, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    width: 220,
    marginTop: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
  },
});
```
