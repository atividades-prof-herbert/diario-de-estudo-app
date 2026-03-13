# Aula 1: Configuração do Ambiente - React Native + Expo

## Introdução

Nesta aula, vamos configurar o ambiente para desenvolver uma aplicação mobile com **React Native** e **Expo**. O Expo é um framework que facilita o desenvolvimento e a execução de aplicações React Native, reduzindo a complexidade de configurar Xcode e Android Studio manualmente.

---

## 1. Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (v18 ou superior) [Aqui](https://nodejs.org/)
- Um editor de código (VS Code recomendado)

### Verificando a instalação

```bash
node --version
npm --version
```

---

## 2. Diferenças entre npm e npx

- **npm**: gerenciador de pacotes - instala e gerencia bibliotecas no projeto
- **npx**: executador de pacotes - executa pacotes npm sem precisar instalá-los globalmente

Exemplo:
```bash
# npm - instala um pacote
npm install expo

# npx - executa um pacote diretamente
npx create-expo-app@latest meu-projeto
```

---

## 3. Criando um novo projeto Expo

Existem várias formas de criar um projeto Expo. Vamos usar TypeScript com um template minimalista:

```bash
npx create-expo-app@latest --template blank-typescript
```
Esse comando cria o projeto com a versão mais recente da SDK do Expo.

**Ou com uma versão do SDK específica:**

```bash
npx create-expo-app@latest --template blank-typescript@sdk-54
```
Esse comando fixa a SDK 54 do Expo, que é a versão que utilizaremos.


Durante a criação, você será solicitado a informar um nome para o projeto. Exemplo: `app-diario`

---

## 4. Estrutura do Projeto

Após criar o projeto, você verá esta estrutura:

```
app-diario/
├── assets/                   # Imagens, fontes, etc
├── app.json                  # Configuração do Expo
├── App.tsx                   # Componente raiz (TypeScript)
├── index.ts                  # Entry point
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração TypeScript
└── node_modules/             # Dependências instaladas
```

### Arquivos Importantes

- **App.tsx**: Componente principal da aplicação
- **app.json**: Configurações do Expo (nome, versão, permissões, etc)
- **package.json**: Scripts de execução e dependências

### Código do `package.json`

```json
{
  "name": "app-diario",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~54.0.33",
    "expo-status-bar": "~3.0.9",
    "react": "19.1.0",
    "react-native": "0.81.5"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "typescript": "~5.9.2"
  }
}
```

O `package.json` guarda informações importantes do projeto:

- o nome e a versão da aplicação
- o arquivo de entrada, definido em `"main": "index.ts"`
- os scripts usados para executar o projeto com Expo
- as dependências que a aplicação precisa para funcionar
- as dependências de desenvolvimento, usadas para programar com TypeScript

Sobre as dependências:

- `expo`: fornece a base do projeto Expo e as ferramentas de execução
- `react`: biblioteca usada para criar a interface com componentes
- `react-native`: permite renderizar esses componentes em interfaces nativas
- `expo-status-bar`: pacote usado para controlar a barra de status

Sobre as dependências de desenvolvimento:

- `typescript`: adiciona tipagem estática ao projeto
- `@types/react`: fornece as definições de tipos do React para o TypeScript

### Relação entre `App.tsx` e `index.ts`

Antes de entender o fluxo da tela, é importante entender como esses dois arquivos se conectam.

### Código do `App.tsx`

```tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

Nesse arquivo, a função `App` define o componente principal da aplicação. A linha:

```tsx
export default function App() {
```

faz duas coisas ao mesmo tempo:

- cria a função `App`
- exporta essa função como exportação padrão do arquivo

O `export default` serve para permitir que outro arquivo importe essa função. Sem ele, o `index.ts` não conseguiria receber `App` dessa forma.

### Código do `index.ts`

```ts
import { registerRootComponent } from 'expo';

import App from './App';

registerRootComponent(App);
```

Aqui acontece a ligação principal:

- `import App from './App';` importa a função `App` que foi definida e exportada em `App.tsx`
- isso significa que o nome `App` no `index.ts` representa a função `App()` criada no outro arquivo
- como `App.tsx` usa `export default`, o `index.ts` consegue importar essa função diretamente
- `registerRootComponent(App)` informa ao Expo e ao React Native que `App` será o componente raiz da aplicação

---
## 5. Fluxo

Quando executamos o projeto com:

```bash
npx expo start
```

o Expo inicia o servidor de desenvolvimento e procura o ponto de entrada definido no arquivo `package.json`. Neste projeto, o campo `"main"` aponta para `index.ts`.

### Como Isso se Conecta com a Renderização da Tela

1. O Expo carrega o arquivo `index.ts`
2. O `index.ts` importa a função `App` definida em `App.tsx`
3. O comando `registerRootComponent(App)` registra essa função como componente raiz da aplicação
4. O React executa a função `App()`
5. A função retorna JSX com os componentes `View`, `Text` e `StatusBar`
6. O React Native converte esses componentes em elementos visuais nativos do Android, iOS ou Web
7. A tela é exibida com os estilos definidos em `StyleSheet.create(...)`

### Exemplo no Projeto Atual

- `index.ts` é a porta de entrada da aplicação
- `App.tsx` define e exporta a função `App`
- `index.ts` importa essa função para iniciar a aplicação
- `View` funciona como um contêiner principal
- `Text` mostra o texto na interface
- `StatusBar` ajusta o estilo da barra de status do dispositivo

---
## 6. Instalando Dependências

Após criar o projeto, entre na pasta do aplicativo antes de executar os comandos:

```bash
cd app-diario
npm install
```

O comando `npm install` deve ser executado **dentro da pasta do aplicativo**, pois é nela que está o arquivo `package.json` com as dependências do projeto.

---

## 7. Executando o Aplicativo

Antes de iniciar o projeto, certifique-se de estar dentro da pasta do aplicativo:

```bash
cd app-diario
```

### Opção 1: No simulador ou emulador

```bash
# Inicia o servidor Expo
npx expo start

# Depois pressione:
# 'i' para abrir no iOS Simulator
# 'a' para abrir no Android Emulator
# 'w' para abrir no navegador (web)
```

O comando `npx expo start` também deve ser executado dentro da pasta do aplicativo, porque é ali que o Expo encontra os arquivos do projeto.

### Opção 2: No seu dispositivo físico

1. Instale o app **Expo Go** na App Store (iOS) ou Google Play (Android)
2. Execute:
   ```bash
   npx expo start
   ```
3. Escaneie o QR code com a câmera (iOS) ou com Expo Go (Android)

### Opção 3: Com túnel (quando o celular e o computador estão em redes diferentes)

```bash
npx expo start --tunnel
```

Isso usa um túnel para simplificar a conexão, especialmente útil em redes instáveis.

---


## 8. Troubleshooting

1. **As dependências não foram instaladas ou a pasta `node_modules` está incompleta?**
   ```bash
   cd app-diario
   npm install
   ```

2. **A porta 8081 já está em uso?**
   ```bash
   cd app-diario
   npx expo start --clear
   ```

3. **O aplicativo não abre no celular?**
   Verifique se o computador e o celular estão na mesma rede. Se não estiverem, tente:
   ```bash
   cd app-diario
   npm install @expo/ngrok
   npx expo start --tunnel
   ```

---

## 9. Recursos Adicionais

- [Documentação Expo](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/docs/environment-setup)
- [Expo CLI Reference](https://docs.expo.dev/more/expo-cli/)
- [Criar projeto Expo](https://docs.expo.dev/get-started/create-a-project/)

---

## 10. Atividade Prática

Nesta atividade, vamos tirar o conteúdo da tela inicial de `App.tsx` e colocá-lo em um novo arquivo chamado `Home.tsx`.

### 10.1 Primeira fase

#### Passos

1. Crie um novo arquivo chamado `Home.tsx` dentro da pasta do aplicativo.
2. No arquivo `Home.tsx`, coloque o conteúdo da tela inicial.
3. Exporte a função `Home`.
4. No arquivo `App.tsx`, importe `Home`.
5. Faça o `App.tsx` exibir `Home`.

#### Exemplo do `Home.tsx`

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

#### Exemplo do novo `App.tsx`

```tsx
import Home from './Home';

export default function App() {
  return <Home />;
}
```



### 10.2 Segunda fase da atividade

Agora adicione um campo de texto na tela inicial usando `TextInput`.


#### Passos

1. Abra o arquivo `Home.tsx`.
2. Adicione `TextInput` no import vindo de `react-native`.
3. Coloque o `TextInput` abaixo do texto da tela. [Documentação](https://reactnative.dev/docs/textinput)
4. Adicione um estilo simples para esse campo.

#### Exemplo

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



### 10.3 Terceira fase da atividade

Agora vamos criar um novo arquivo chamado `Login.tsx` com dois campos de texto e depois importá-lo no `Home.tsx`.



#### Passos

1. Crie o arquivo `Login.tsx`.
2. Adicione dois `TextInput`.
3. Faça o segundo campo funcionar como senha usando `secureTextEntry`.
4. Exporte a função `Login`.
5. No `Home.tsx`, importe `Login`.
6. Adicione `<Login />` dentro do `return`.

#### Exemplo do `Login.tsx`

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
