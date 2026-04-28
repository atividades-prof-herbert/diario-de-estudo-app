# Aula 5 — Navegação com Expo Router

## Objetivo

1. Entender o que é uma rota e como o Expo Router associa arquivos a telas
2. Configurar o `_layout.tsx` com `Stack`
3. Navegar entre telas com `router.push` e `router.replace`

### Pré-requisito
Instalar o Expo Router e as bibliotecas que ele exige:

```bash
npm install expo-router expo-linking expo-constants react-native-screens react-native-safe-area-context
```

## 1. O que é uma Rota?


Em um app mobile, uma **rota** é o endereço de uma tela, assim como uma URL é o endereço de uma página web.

```
Usuário aperta botão 
        |
App "navega" para um endereço  (ex.: /cadastro)
        |
Expo Router carrega a tela certa
```

### Exemplo de Fluxo de telas:

```
TelaLogin  [clicar em "Entrar"]---------------->  TelaInicio
    │
    |-[clicar em "Registre-se"]----------------->  TelaCadastro
                                                        │
                                                        |-[clicar "Criar conta"]--->  TelaLogin
```


---

## 2. Expo Router

O Expo Router é um roteador **baseado em arquivos** para React Native. A ideia central é simples: o nome do arquivo *é* a rota. Você não registra rotas em código, você cria um arquivo e ele vira automaticamente uma tela navegável.

Funciona em Android, iOS e Web com o mesmo código.


### Fluxo da chamadas SEM Expo Route


```
package.json
  "main": "index.ts"
          
index.ts 
  registerRootComponent(App)
                  
App.tsx
  <TelaTopicos />          # tela trocada manualmente a cada aula
```

### Fluxo da chamadas COM Expo Route
Com o Expo Router, o framework assume esse controle. Você só configura o `_layout.tsx` e cria os arquivos de rota — o restante é automático:

```
package.json
  "main": "expo-router/entry"
          │
  expo-router/entry      # ponto de entrada do framework
          │
        
app/_layout.tsx          # registra quais telas existem (Stack)
          │
          ├──> app/index.tsx    ── src/telas/TelaLogin.tsx
          ├──> app/cadastro.tsx ── src/telas/TelaCadastro.tsx
          └──> app/inicio.tsx   ── src/telas/TelaInicio.tsx
```

O `App.tsx` e o `index.ts` faziam o papel que o `expo-router/entry` e o `_layout.tsx` agora fazem juntos, por isso são removidos.


### Configurações obrigatórias uso Expo Route

**1. `package.json` — trocar o ponto de entrada do app:**

```json
"main": "expo-router/entry"
```

Isso instrui o Expo a usar o Expo Router como ponto de entrada em vez do `App.tsx`.

**2. `app.json` — adicionar o scheme do app:**

```json
"scheme": "app-diario"
```

O `scheme` é o nome do protocolo de deep link do app (ex.: `app-diario://`). O Expo Router exige que ele esteja definido.

**3. Deletar `App.tsx` e `index.ts`:**

Com o Expo Router assumindo o controle, esses dois arquivos ficam obsoletos e podem ser removidos:

```bash
rm App.tsx index.ts
```

**4. Criar as rotas**
O Expo Router usa uma pasta chamada `app/` na raiz do projeto. Cada arquivo dentro dela vira automaticamente uma rota. Veremos mais a frente como fazer.


---

## 3. Estrutura de Pastas = Estrutura de Rotas

O Expo Router usa uma pasta chamada `app/` na raiz do projeto (`app-diario`). Cada arquivo dentro dela vira automaticamente uma rota.

```
app/
├── _layout.tsx        #  configuração (não é uma tela)
├── index.tsx          # rota: /          Renderiza: src/telas/TelaLogin.tsx
├── cadastro.tsx       # rota: /cadastro       Renderiza: src/telas/TelaCadastro.tsx
└── inicio.tsx         # rota: /inicio          Renderiza: src/telas/TelaInicio.tsx
```

---

## 4. Organizando as rotas na pasta `app`

### 4.1 O Arquivo `_layout.tsx` — Quem Organiza as Rotas

Antes de navegar, é preciso entender o arquivo que **envolve todas as telas**: o `_layout.tsx`.

O Expo Router oferece dois tipos principais de layout. Por agora usaremos o **`Stack`**, porque ele mapeia diretamente o conceito de pilha de telas: cada nova tela empilhada sobre a anterior, com botão "voltar" aparecendo automaticamente.

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Login' }} />
      <Stack.Screen name="cadastro" options={{ title: 'Cadastro' }} />
      <Stack.Screen name="inicio" options={{ title: 'Início' }} />
    </Stack>
  );
}
```

**O que cada parte faz:**

- `Stack` — define que as telas serão empilhadas. O botão "voltar" aparece automaticamente nas telas empilhadas.
- `Stack.Screen` — registra uma rota e configura seu título na barra superior.
- `name` — corresponde ao nome do arquivo dentro de `app/`, sem a extensão. 


### 4.2 Os arquivos de rota — `index.tsx`, `cadastro.tsx`, `inicio.tsx`

Cada arquivo dentro de `app/` corresponde a uma rota. O Expo Router detecta esses arquivos automaticamente, por isso o nome do arquivo **precisa bater exatamente** com o `name` declarado no `Stack.Screen` do `_layout.tsx`.

```
app/index.tsx           Stack.Screen name="index"
app/cadastro.tsx        Stack.Screen name="cadastro"
app/inicio.tsx          Stack.Screen name="inicio"
```

Se o nome do arquivo e o `name` do `Stack.Screen` forem diferentes, o Expo Router não consegue associar a rota à configuração e a tela pode não aparecer ou ficar sem título.

Cada arquivo de rota precisa ter um `export default` que é o componente que o Expo Router vai renderizar quando aquela rota for acessada:

```tsx
// app/index.tsx
import TelaLogin from '../src/telas/TelaLogin';

export default TelaLogin;  //  export default obrigatório
```

#### Por que não colocar o código da tela diretamente em `app/index.tsx`?

Tecnicamente, você pode. Isso funciona perfeitamente:

```tsx
// app/index.tsx — tela direto no arquivo de rota (funciona)
import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function TelaLogin() {
  return (
    <View>
      <Text>Entrar</Text>
    </View>
  );
}
```

O problema aparece quando o app cresce: os arquivos em `app/` viram um mix de configuração de rota e código de interface, e você perde a separação que construímos nas aulas anteriores, onde `src/telas/` guarda as telas e `src/componentes/` guarda os componentes.

Por isso usamos os arquivos em `app/` como **pontes finas**: cada um apenas importa e re-exporta a tela correspondente de `src/telas/`.

```tsx
// app/index.tsx — apenas conecta a rota à tela
import TelaLogin from '../src/telas/TelaLogin';
export default TelaLogin;
```

Regra prática: **código de interface fica em `src/telas/`, configuração de rota fica em `app/`.**



### 4.3 Receita: como adicionar uma nova tela ao app

Toda vez que quiser criar uma nova tela com rota própria, são sempre dois passos:

```
Passo 1 — registrar a rota no _layout.tsx
        
Adicione um <Stack.Screen name="nome-da-rota" />

Passo 2 — criar o arquivo da tela em app/
        
Crie app/nome-da-rota.tsx exportando o componente da tela
```


---

## 5. Navegar entre Telas com Botão

Com as rotas configuradas, a navegação acontece via o objeto `router`, importado do `expo-router`:

```tsx
import { router } from 'expo-router';
```

O `router` oferece três métodos principais, cada um com um comportamento diferente no histórico de navegação:

| Método | O que faz | Quando usar |
|---|---|---|
| `router.push('/rota')` | Empilha a nova tela — o botão "voltar" aparece | Navegação normal entre telas |
| `router.replace('/rota')` | Substitui a tela atual — sem botão "voltar" | Após login, após cadastro |
| `router.back()` | Volta para a tela anterior | Botão cancelar, fechar modal |

> **`Link` para links, `router` para lógica.** O Expo Router também tem o componente `<Link href="/rota">` para criar links navegáveis diretamente no JSX — o equivalente do `<a>` no HTML. Use `Link` quando a navegação é simples e visível (texto clicável), e `router` quando a navegação acontece dentro de uma função, como o `onPress` de um botão ou após uma validação.


### 5.1 `router.push` — empilha a tela

```tsx
// src/telas/TelaLogin.tsx
import { router } from 'expo-router';
import { View, Button } from 'react-native';

export default function TelaLogin() {
  return (
    <View>
      <Button
        title="Ir para Cadastro"
        onPress={() => router.push('/cadastro')}
      />
    </View>
  );
}
```

### 5.2 `router.replace` — troca sem empilhar

```tsx
// Diferença entre push e replace:
router.push('/inicio')    // empilha — usuário pode voltar com o botão
router.replace('/inicio') // substitui — usuário não pode voltar
```

`router.replace` é ideal para o fluxo **login -> home**: depois que o usuário entra, pressionar "voltar" não deve levar de volta para a tela de login.

### 5.3 `router.back` — volta para a tela anterior

```tsx
router.back() // equivalente ao botão "voltar" nativo
```

Útil para botões de cancelar dentro de formulários.

---

## 6. O Projeto da Aula — Diário de Estudos com Navegação

Agora que conhecemos as ferramentas, vamos aplicá-las. O app tem três telas conectadas: `TelaLogin` é o ponto de entrada, de onde o usuário navega para `TelaInicio` ao entrar ou para `TelaCadastro` ao se registrar. Cada transição usa o método correto do `router` — `replace` onde não faz sentido voltar, `push` onde o botão "voltar" deve aparecer.

**Fluxo de telas:**

```
TelaLogin  [clicar em "Entrar"]---------------->  TelaInicio
    │
    |-[clicar em "Registre-se"]----------------->  TelaCadastro
                                                        │
                                                        |-[clicar "Criar conta"]--->  TelaLogin
```


### 6.1 `TelaLogin` — navegando com `router`

A `TelaLogin` é uma refatoração da `InicioLoginPress`. A diferença principal: em vez de `Alert`, o botão "Entrar" chama `router.replace('/inicio')` e o link "Registre-se" chama `router.push('/cadastro')`.

**Revisando: `LoginPress` recebe uma função como prop**

O componente `LoginPress`, criado na aula 3, tem a prop `onPress: () => void`. Ele não sabe o que vai acontecer ao pressionar o botão: quem decide é a tela que o usa.

```tsx
// src/componentes/LoginPress.tsx — recebe e repassa onPress
type LoginPressProps = {
  titulo: string;
  textoBotao?: string;
  onPress: () => void;  //  prop do tipo função
};

<TouchableOpacity onPress={onPress}>  //  apenas repassa
```

Na `TelaLogin`, passamos `router.replace('/inicio')` embrulhado em uma função nomeada:

```tsx
function aoEntrar() {
  router.replace('/inicio');  
}

<LoginPress onPress={aoEntrar} />
```

A função `aoEntrar` é declarada na tela. O `LoginPress` chama `onPress` no momento certo, mas *o que acontece* é responsabilidade de quem usa o componente. Esse é o padrão de **inversão de controle** via props de função, visto na aula 3.

```tsx
// src/telas/TelaLogin.tsx
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import LoginPress from '../componentes/LoginPress';

export default function TelaLogin() {
  function aoEntrar() {
    router.replace('/inicio');
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Diário de Estudos" subtitulo="Acesse sua conta" />

      <LoginPress
        titulo="Entrar"
        textoBotao="Entrar no diário"
        onPress={aoEntrar}
      />

      <TouchableOpacity
        style={estilos.linkContainer}
        onPress={() => router.push('/cadastro')}
      >
        <Text style={estilos.link}>Não tem conta? Registre-se</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

```


---

### 6.2 `TelaCadastro`

O ponto central aqui é o `router.replace('/')` no botão "Criar conta": após o cadastro, o usuário volta para o login sem deixar a tela de cadastro no histórico. O botão "voltar" nativo do `Stack` continua funcionando enquanto o usuário ainda não confirmou, ele pode cancelar a qualquer momento.

```tsx
// src/telas/TelaCadastro.tsx
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';

export default function TelaCadastro() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Criar conta" />

      <Text style={estilos.rotulo}>Nome</Text>
      <TextInput style={estilos.entrada} placeholder="Seu nome completo" />

      <Text style={estilos.rotulo}>Email</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="seu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={estilos.rotulo}>Senha</Text>
      <TextInput style={estilos.entrada} placeholder="Crie uma senha" secureTextEntry />

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => router.replace('/')}
      >
        <Text style={estilos.textoBotao}>Criar conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

```




### 6.3 Visão completa das camadas 

A tabela abaixo mostra a arquitetura completa — as camadas marcadas com `*` ainda não existem no projeto, mas é útil saber onde cada coisa vai morar.

```
app-diario/
│
├── app/                          # Expo Router — só pontes de rota
│   ├── _layout.tsx               # configura o Stack (ou Tabs)
│   ├── index.tsx                 # - TelaLogin
│   ├── cadastro.tsx              # - TelaCadastro
│   ├── inicio.tsx                # - TelaInicio
│
└── src/                          # Lógica e interface — código real
    ├── componentes/              # peças reutilizáveis de interface
    │   ├── Cabecalho.tsx
    │   ├── CartaoMateria.tsx
    │   ├── CartaoTopico.tsx
    │   ├── CartaoRegistro.tsx
    │   └── LoginPress.tsx
    ├── telas/                    # uma tela por arquivo
    │   ├── TelaLogin.tsx
    │   ├── TelaCadastro.tsx
    │   ├── TelaInicio.tsx
    │   ├── TelaTopicos.tsx
    │   ├── TelaRegistro.tsx
    │   └── TelaNovoRegistro.tsx
```


---

## Referências para Estudar

### Documentação Oficial — Fonte Primária

- **Expo Router** — https://docs.expo.dev/router/introduction/
- **React Native** — https://reactnative.dev/docs/getting-started
- **TypeScript** — https://www.typescriptlang.org/docs/

