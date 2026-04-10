# Aula 3 — Props e Tipagem em React Native

---

## Objetivo

Entender como passar dados para componentes usando **props**, e como garantir que esses dados tenham os tipos corretos usando **TypeScript**.

---

## 0. Organização de pastas — início da arquitetura em camadas

Antes de entrar em props, vale registrar a reorganização feita no projeto nesta aula.

Na aula anterior, os arquivos ficavam soltos ou sem separação clara. Agora adotamos uma estrutura dentro de `src/` com duas pastas:

```text
app-diario/
└── src/
    ├── telas/         - telas completas do app (ex.: Inicio.tsx)
    └── componentes/   - componentes reutilizáveis (ex.: Login.tsx, CartaoMateria.tsx)
```

**Por que separar?**

- `src/telas/` agrupa as **telas** do app — cada arquivo representa uma página navegável. A tela é responsável por montar o layout e decidir quais componentes usa.
- `src/componentes/` agrupa os **componentes reutilizáveis** — pedaços de interface que podem aparecer em mais de uma tela.

Essa separação é o início de uma ideia importante em desenvolvimento de software: **arquitetura em camadas**, onde cada parte do código tem uma responsabilidade clara. Conforme o app crescer, novas camadas poderão aparecer (ex.: `src/servicos/`, `src/hooks/`, `src/repositorios/`).

---

## 1. O problema: componentes estáticos

Na aula anterior criamos componentes, mas os dados estavam escritos diretamente no código:

```tsx
export default function Login() {
  return (
    <View>
      <Text>Email</Text>
      <TextInput />
      <Text>Senha</Text>
      <TextInput />
    </View>
  );
}
```

Esse componente sempre mostra o mesmo conteúdo. Se quisermos um `Login` com título "Entrar" e outro com "Criar conta", não conseguimos — precisaríamos duplicar o componente.

**Props resolvem isso.**

---

## 2. O que são props?

Props (abreviação de *properties*) são os **parâmetros de um componente**. Assim como uma função recebe argumentos, um componente recebe props.

Comparação direta:

```tsx
// Função comum com parâmetro
function saudar(nome: string) {
  return `Olá, ${nome}!`;
}

saudar('Maria'); // "Olá, Maria!"
saudar('João');  // "Olá, João!"

// Componente com prop — mesma ideia
function Saudacao({ nome }: { nome: string }) {
  return <Text>Olá, {nome}!</Text>;
}

<Saudacao nome="Maria" />
<Saudacao nome="João" />
```

---

## 3. Como declarar props com TypeScript

### 3.1 Props inline (simples, para componentes pequenos)

```tsx
function CartaoMateria({ nome, descricao }: { nome: string; descricao: string }) {
  return (
    <View>
      <Text>{nome}</Text>
      <Text>{descricao}</Text>
    </View>
  );
}
```

### 3.2 Com `type` (recomendado para componentes reais)

```tsx
type Props = {
  nome: string;
  descricao: string;
};

export default function CartaoMateria({ nome, descricao }: Props) {
  return (
    <View>
      <Text>{nome}</Text>
      <Text>{descricao}</Text>
    </View>
  );
}
```

> **`Props` é só um nome de variável.** A convenção de chamar `Props` é popular por ser curta e genérica, mas você pode usar qualquer nome: `CartaoMateriaProps`, `Configuracao`, o que fizer mais sentido. O TypeScript não se importa com o nome — só com a estrutura do tipo.

A segunda forma é preferida porque:
- O tipo fica nomeado e reutilizável.
- Fica mais fácil de ler quando há muitas props.
- Permite exportar o tipo se outro arquivo precisar.

---

## 4. Props opcionais

Adicione `?` após o nome da prop para torná-la opcional:

```tsx
type Props = {
  nome: string;       // obrigatória
  descricao: string;  // obrigatória
  corDestaque?: string; // opcional
};
```

Use um **valor padrão** na quando a prop não for informada:

```tsx
export default function CartaoMateria({ nome, descricao, corDestaque = '#4A90D9' }: Props) {
  // corDestaque é '#4A90D9' se não for passada
}
```

---

## 5. Usando no projeto — CartaoMateria

No Diário de Estudos, criamos `CartaoMateria.tsx` para exibir uma matéria:

```tsx
// src/componentes/CartaoMateria.tsx
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  nome: string;
  descricao: string;
  corDestaque?: string;
};

export default function CartaoMateria({ nome, descricao, corDestaque = '#4A90D9' }: Props) {
  return (
    <View style={[estilos.cartao, { borderLeftColor: corDestaque }]}>
      <Text style={[estilos.nome, { color: corDestaque }]}>{nome}</Text>
      <Text style={estilos.descricao}>{descricao}</Text>
    </View>
  );
}
```

E na tela `Inicio.tsx`, usamos o mesmo componente três vezes com dados diferentes:

```tsx
<CartaoMateria
  nome="Matemática"
  descricao="Álgebra linear e cálculo diferencial"
/>
<CartaoMateria
  nome="Português"
  descricao="Gramática, interpretação e redação"
  corDestaque="#E05C5C"
/>
<CartaoMateria
  nome="Programação"
  descricao="React Native, TypeScript e lógica"
  corDestaque="#2ECC71"
/>
```

Resultado: três cards visuais diferentes, usando **um único componente**.

---

## 6. Refatorando Login com props

O `Login` antes não tinha props. Agora:

```tsx
type Props = {
  titulo: string;
  textoBotao?: string;
};

export default function Login({ titulo, textoBotao = 'Entrar' }: Props) {
  return (
    <View>
      <Text>{titulo}</Text>
      {/* ... */}
      <TouchableOpacity>
        <Text>{textoBotao}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

Uso na tela:

```tsx
// Tela de login padrão
<Login titulo="Acesse sua conta" />

// Tela de cadastro — mesmo componente, dados diferentes
<Login titulo="Crie sua conta" textoBotao="Registrar" />
```

---

## 7. Renderizando listas com `.map()`

### 7.1 O problema da repetição manual

Na tela `Inicio.tsx`, cada `<CartaoMateria>` foi escrito manualmente:

```tsx
<CartaoMateria nome="Matemática" descricao="Álgebra linear e cálculo diferencial" />
<CartaoMateria nome="Português" descricao="Gramática, interpretação e redação" corDestaque="#E05C5C" />
<CartaoMateria nome="Programação" descricao="React Native, TypeScript" corDestaque="#2ECC71" />
```

Isso funciona com três itens. Com dez, vira um problema. Com dados vindos de uma API — que em aula-04 vamos buscar com `useEffect` — é impossível: você não sabe quantos itens virão.

**A solução é representar os dados como um array e usar `.map()` para gerar os componentes.**

---

### 7.2 O que é `.map()`?

`.map()` é um método nativo de arrays em JavaScript. Ele percorre cada item do array e transforma esse item em outra coisa — no nosso caso, em JSX.

Sintaxe básica:

```ts
array.map((item) => valorTransformado)
```

Exemplos:

```ts
// Array de números → array de números dobrados
[1, 2, 3].map((n) => n * 2)
// Resultado: [2, 4, 6]

// Array de strings → array de strings maiúsculas
['matemática', 'português'].map((s) => s.toUpperCase())
// Resultado: ['MATEMÁTICA', 'PORTUGUÊS']

// Array de objetos → array de JSX (o que usamos no React)
[{ nome: 'Matemática' }, { nome: 'Português' }].map((m) => (
  <Text>{m.nome}</Text>
))
// Resultado: dois componentes <Text>
```

O `.map()` **não modifica** o array original.

---

### 7.3 Como o React usa o resultado do `.map()`

Em JSX, qualquer expressão JavaScript entre `{}` é renderizada. Um array de JSX é renderizado como múltiplos elementos:

```tsx
// Esses dois blocos produzem o mesmo resultado visual:

{/* Manual */}
<Text>Matemática</Text>
<Text>Português</Text>

{/* Com .map() */}
{['Matemática', 'Português'].map((nome) => (
  <Text>{nome}</Text>
))}
```

---

### 7.4 A prop `key` — obrigatória em listas

Ao renderizar listas, o React precisa de uma forma de identificar cada item para atualizar a tela de forma eficiente. Para isso existe a prop especial `key`.

```tsx
{materias.map((materia) => (
  <CartaoMateria
    key={materia.nome}   // identifica este item de forma única
    nome={materia.nome}
    descricao={materia.descricao}
  />
))}
```

**Regras do `key`:**
- Deve ser uma `string` (ou número) **única dentro da lista**.
- Não pode se repetir.
- Não precisa ser globalmente única no app — só dentro daquele `.map()`.
- `key` **não é uma prop real**: o componente não recebe `key`, ela é usada internamente pelo React.
- Sem `key`, o React exibe um aviso e pode se comportar de forma incorreta ao atualizar a lista.

O que usar como `key`? Prefira um identificador único dos dados (`id`, `nome`, `codigo`). Evite usar o índice do array (`index`) pois, se a lista mudar de ordem, o React pode confundir os elementos.

```tsx
// Ruim — índice muda se a lista for reordenada
{materias.map((materia, index) => (
  <CartaoMateria key={index} ... />
))}

// Bom — o nome identifica de forma estável
{materias.map((materia) => (
  <CartaoMateria key={materia.nome} ... />
))}
```

---

### 7.5 Tipando o array de dados

Antes de usar `.map()`, declare um `type` para os objetos do array. Isso garante que o TypeScript avise se algum campo estiver faltando ou com o tipo errado.

```tsx
type Materia = {
  nome: string;
  descricao: string;
  corDestaque?: string;
};

const materias: Materia[] = [
  { nome: 'Matemática', descricao: 'Álgebra linear e cálculo diferencial' },
  { nome: 'Português', descricao: 'Gramática, interpretação e redação', corDestaque: '#E05C5C' },
  { nome: 'Programação', descricao: 'React Native, TypeScript', corDestaque: '#2ECC71' },
];
```

`Materia[]` significa "array de objetos do tipo `Materia`".

---

### 7.6 Aplicando no projeto — `InicioMap.tsx`

A tela `InicioMap.tsx` substitui a repetição manual de `Inicio.tsx` por dados e `.map()`:

```tsx
// src/telas/InicioMap.tsx
import { ScrollView, StyleSheet, Text } from 'react-native';
import CartaoMateria from '../componentes/CartaoMateria';

type Materia = {
  nome: string;
  descricao: string;
  corDestaque?: string;
};

// Dados estáticos — por enquanto...
const materias: Materia[] = [
  { nome: 'Matemática', descricao: 'Álgebra linear e cálculo diferencial' },
  { nome: 'Português', descricao: 'Gramática, interpretação de texto e redação', corDestaque: '#E05C5C' },
  { nome: 'Programação', descricao: 'React Native, TypeScript e lógica de programação', corDestaque: '#2ECC71' },
];

export default function InicioMap() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.secao}>Matérias cadastradas</Text>

      {materias.map((materia) => (
        <CartaoMateria
          key={materia.nome}
          nome={materia.nome}
          descricao={materia.descricao}
          corDestaque={materia.corDestaque}
        />
      ))}
    </ScrollView>
  );
}
```

O resultado visual é idêntico ao de `Inicio.tsx` — mas agora adicionar uma nova matéria é só inserir um objeto no array `materias`. Nenhum JSX precisa ser tocado.


---

## 8. Props do tipo função — `onPress`

### 8.1 Funções também são valores

Em JavaScript, funções são valores como qualquer outro. Você pode armazená-las em variáveis, passá-las como argumentos e recebê-las como parâmetros.

```ts
function executar(acao: () => void) {
  acao(); // chama a função recebida
}

function dizerOla() {
  console.log('Olá!');
}

executar(dizerOla); // imprime "Olá!"
```

O mesmo vale para componentes React: **uma função pode ser uma prop**.

---

### 8.2 O tipo `() => void`

`() => void` descreve uma função que:
- Não recebe parâmetros `()`
- Não retorna valor útil `void`

```tsx
type Props = {
  onPress: () => void;
};
```

Quando o componente recebe essa prop, ele pode chamá-la como qualquer função:

```tsx
export default function MeuBotao({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Clique aqui</Text>
    </TouchableOpacity>
  );
}
```

Quem define **o que acontece** ao apertar é quem usa o componente, não o componente em si. O componente é responsável apenas por chamar `onPress` no momento certo.

---

### 8.3 Aplicando no projeto — `LoginPress.tsx` e `InicioLoginPress.tsx`

O componente `Login` original não tinha `onPress` — o botão não fazia nada. `LoginPress` adiciona essa prop:

```tsx
// src/componentes/LoginPress.tsx
type LoginPressProps = {
  titulo: string;
  textoBotao?: string;
  onPress: () => void;   // quem usa decide o que acontece
};

export default function LoginPress({ titulo, textoBotao = 'Entrar', onPress }: LoginPressProps) {
  return (
    <View>
      <Text>{titulo}</Text>
      {/* ... campos de email e senha ... */}
      <TouchableOpacity onPress={onPress}>
        <Text>{textoBotao}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

A tela `InicioLoginPress.tsx` usa o mesmo componente duas vezes, cada um com comportamento diferente:

```tsx
// src/telas/InicioLoginPress.tsx
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import LoginPress from '../componentes/LoginPress';

export default function InicioLoginPress() {
  function aoEntrar() {
    Alert.alert('Login', 'Botão de entrar pressionado!');
  }

  function aoCadastrar() {
    Alert.alert('Cadastro', 'Botão de cadastro pressionado!');
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.secao}>Acesso ao diário</Text>

      <LoginPress
        titulo="Acesse sua conta"
        textoBotao="Entrar no diário"
        onPress={aoEntrar}
      />

      <Text style={estilos.separador}>— ou —</Text>

      <LoginPress
        titulo="Crie sua conta"
        textoBotao="Cadastrar"
        onPress={aoCadastrar}
      />
    </ScrollView>
  );
}
```

Pontos importantes:
- As funções `aoEntrar` e `aoCadastrar` são declaradas **dentro da tela**, não dentro do componente. Isso é intencional: o componente `LoginPress` não sabe — e não precisa saber — o que vai acontecer ao pressionar.





---

## Estrutura de arquivos ao final da aula

```text
app-diario/
└── src/
    ├── componentes/
    │   ├── CartaoMateria.tsx   - card de matéria com corDestaque opcional
    │   ├── CartaoTopico.tsx    - card de tópico com badge de concluído
    │   ├── Login.tsx           - formulário com titulo e textoBotao
    │   └── LoginPress.tsx      - formulário com onPress como prop
    └── telas/
        ├── Inicio.tsx          - componentes estáticos (ponto de partida)
        ├── InicioMap.tsx       - lista de matérias com .map()
        └── InicioLoginPress.tsx - dois LoginPress com comportamentos diferentes
```

---

## Exercício Prático

Crie o componente `CartaoTopico.tsx` dentro de `src/componentes/` com as props abaixo:

| Prop | Tipo | Obrigatória? |
|---|---|---|
| `nome` | `string` | sim |
| `materiaVinculada` | `string` | sim |
| `concluido` | `boolean` | não (padrão: `false`) |

Requisitos:
1. Exibir o nome do tópico em destaque.
2. Exibir a matéria vinculada com texto menor.
3. Se `concluido` for `true`, exibir um indicador visual (ex.: texto "Concluído" em verde).
4. Usar o componente ao menos 3 vezes na tela `Inicio.tsx` com variações.


