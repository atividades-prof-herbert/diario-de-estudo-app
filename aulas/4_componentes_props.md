# Aula 4 — Refinamento: Renderização Condicional, Regras do JSX e Estilos Dinâmicos

## Objetivo


1. Renderização condicional
2. Regras do JSX
3. Estilos dinâmicos via props

---

## 1. Renderização condicional

### 1.1 O problema

Na aula anterior, o `CartaoTopico` usou `if` antes do `return` para decidir se exibia o badge:

```tsx
export default function CartaoTopico({ nome, materiaVinculada, concluido = false }: Props) {
  let badgeConcluido = null;
  if (concluido) {
    badgeConcluido = <Text style={estilos.badge}>Concluído</Text>;
  }

  return (
    <View style={estilos.cartao}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.nome}>{nome}</Text>
        {badgeConcluido}
      </View>
      <Text style={estilos.materia}>{materiaVinculada}</Text>
    </View>
  );
}
```

Funciona, mas não é o padrão React.

---

### 1.2 Operador `&&` — renderiza ou não renderiza

Use quando quer exibir algo **só se uma condição for verdadeira**. Se não, não renderiza nada.

```tsx
{concluido && <Text>Concluído</Text>}
```

Leitura: "se `concluido` for `true`, renderize o `<Text>`".

Aqui o `&&` não é lógica booleana (não é um "and"), é sintaxe do JavaScript: se o lado esquerdo for "falsy", a expressão devolve o próprio lado esquerdo; se for "truthy", devolve o lado direito. O React renderiza o que sobrar.

**IMPORTANTE:** Nunca use um número como condição com `&&`. `0 && <Text>...</Text>` renderiza o `0` na tela, porque `0` não é `false` 

```tsx
// Ruim — renderiza "0" na tela se lista estiver vazia
{lista.length && <Text>Itens</Text>}

// Correto — converte para boolean
{lista.length > 0 && <Text>Itens</Text>}
```

---

### 1.3 Ternário `? :` — renderiza A ou B

Use quando quer exibir **uma coisa ou outra**.

```tsx
{concluido ? <Text>Concluído</Text> : <Text>Pendente</Text>}
```

Leitura: "se `concluido`, exibe 'Concluído', senão exibe 'Pendente'".

Comparando as três formas:

```tsx
// if antes do return — funciona, mas fora do JSX
let badge = null;
if (concluido) {
  badge = <Text>Concluído</Text>;
}

// && — idiomático, dentro do JSX
{concluido && <Text>Concluído</Text>}

// Ternário — quando há duas opções
{concluido ? <Text>Concluído</Text> : <Text>Pendente</Text>}
```

---

### 1.4 Expressões vs declarações em `{}`

Dentro do JSX, `{}` só aceita **expressões** — código que resulta em um valor.

```tsx
// Expressões — funcionam dentro de {}
{nome}                          // variável
{2 + 2}                         // operação
{concluido ? 'Sim' : 'Não'}     // ternário
{concluido && <Text />}         // &&
{materias.map(...)}             // .map()
{nomeMateria.toUpperCase()}     // chamada de método
```

**Declarações não funcionam** dentro de `{}` — `if`, `for`, `while`, `switch` não retornam valor:

```tsx
// Erro — if não é uma expressão
{if (concluido) { return <Text /> }}

// Correto — ternário é uma expressão
{concluido ? <Text>Sim</Text> : null}
```

Por isso usamos ternário e `&&` no lugar de `if` dentro do JSX.

---

### 1.5 Igualdade estrita vs frouxa

Em JavaScript existem dois operadores de igualdade:

**`==` (igualdade frouxa / loose equality)**

Compara os valores **fazendo coerção de tipo** — converte os operandos para um tipo comum antes de comparar.

```js
0 == "0"           // true  → string "0" é convertida para número 0
0 == false         // true  → false vira 0
null == undefined  // true  → caso especial da spec
"" == 0            // true  → string vazia vira 0
[] == false        // true  → array vazio vira "" vira 0
```

**`===` (igualdade estrita / strict equality)**

Compara valor **e tipo** — sem coerção. Se os tipos forem diferentes, já devolve `false`.

```js
0 === "0"            // false → number vs string
0 === false          // false → number vs boolean
null === undefined   // false → tipos diferentes
"" === 0             // false
```



**Por que então usar `===`?**

1. **Convenção da comunidade JS/TS** — linters (ESLint, regra `eqeqeq`) e o próprio TypeScript desencorajam `==`.
2. **Previsibilidade** — você não precisa pensar em coerção, o que evita bugs.
3. **Hábito seguro** — usar sempre `===` evita que você seja pega nos casos onde a coerção dá um resultado inesperado.



---


## 2. Regras do JSX



### 2.1 Um único elemento raiz

Um componente só pode retornar **um elemento na raiz**. Dois elementos no mesmo nível causam erro de compilação.

```tsx
// Erro — dois elementos na raiz
return (
  <Text>Título</Text>
  <Text>Subtítulo</Text>
)

// Correto — envolvidos em uma View
return (
  <View>
    <Text>Título</Text>
    <Text>Subtítulo</Text>
  </View>
)
```

---

### 2.2 Fragment — quando a View é desnecessária

Use **Fragment** (`<>...</>`) como wrapper invisível:

```tsx
// Com View — adiciona um nó desnecessário no layout
return (
  <View>
    <Text>Título</Text>
    <Text>Subtítulo</Text>
  </View>
)

// Com Fragment — sem nó extra no layout
return (
  <>
    <Text>Título</Text>
    <Text>Subtítulo</Text>
  </>
)
```

Quando usar cada um:
- `<View>` — quando precisa aplicar estilo no container (padding, flexbox, cor de fundo)
- `<>` — quando só precisa de um wrapper para satisfazer a regra, sem estilo

---

### 2.3 Nome do componente começa com maiúscula

O React diferencia componentes de elementos nativos pelo case do nome:

```tsx
<cartaoMateria />  // não reconhecido como componente
<CartaoMateria />  // correto
```

Isso vale para componentes criados por você também: `function cartaoMateria()` não vai funcionar como componente.

---

## 3. Estilos dinâmicos via props

### 3.1 O array em `style`

No `CartaoMateria` da aula anterior usamos:

```tsx
<View style={[estilos.cartao, { borderLeftColor: corDestaque }]}>
```

A prop `style` do React Native aceita **um objeto ou um array de objetos**. Quando é um array, o React Native mescla os estilos da esquerda para a direita — o que vem depois sobrescreve o que vem antes.

```tsx
// Estilo base do StyleSheet
estilos.cartao = {
  backgroundColor: '#F5F5F5',
  borderRadius: 8,
  borderLeftWidth: 4,
  borderLeftColor: '#000',   // valor padrão
}

// Sobrescrevendo só o borderLeftColor via prop
[estilos.cartao, { borderLeftColor: '#E05C5C' }]
// Resultado: todos os outros estilos mantidos, cor trocada
```

---

## Exercício Prático

Até agora todas as telas começam diretamente com o conteúdo, sem um cabeçalho padronizado. Nesta atividade, você vai aplicar **renderização condicional**, **regras do JSX** e **componentização com props** para padronizar o app.

> Trabalhe na ordem proposta — o exercício 4 depende dos componentes refinados nos exercícios 1, 2 e 3.

---

### Exercício 1 — Componente `Cabecalho`

O app tem várias telas, cada uma começando do seu jeito. Você vai criar um componente reutilizável que padroniza o topo de qualquer tela, com título obrigatório e subtítulo opcional.

**O que fazer:**

1. Crie o arquivo `src/componentes/Cabecalho.tsx`.
2. O componente deve receber duas props:
   - `titulo` — **obrigatória**, texto que aparece em destaque.
   - `subtitulo` — **opcional**, texto secundário menor abaixo do título.
3. Renderize um `<Text>` para o título e outro `<Text>` para o subtítulo, dentro de um `<View>` com o estilo `container`.
4. O `<Text>` do subtítulo **só deve ser renderizado quando a prop `subtitulo` for passada** — use `&&` dentro do JSX (seção 1.2).
5. Não esqueça de importar `View`, `Text` e `StyleSheet` de `react-native`.

**Esqueleto a completar** (substitua os `???`):

```tsx
// src/componentes/Cabecalho.tsx
type CabecalhoProps = {
  ???
};

export default function Cabecalho( ??? ) {
  return (
    <View style={estilos.container}>
      ???
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
```

**Importe** e **use** o `Cabecalho` no topo de `InicioMap.tsx` e `InicioLoginPress.tsx`.
- Em **uma** das telas, passe `titulo` **e** `subtitulo`.
- Na **outra**, passe apenas `titulo`.

**Critério de aceitação:** ao rodar o app, a tela com subtítulo mostra os dois textos; a outra mostra só o título, sem espaço vazio embaixo dele.
- Não esqueça que para testar cada tela você precisa alterar o `App.tsx` e testar uma de cada vez.


---

### Exercício 2 — Refatorar `CartaoTopico` para usar `&&`

Na branch aula-03, o `CartaoTopico` decidia se renderizava o badge "Concluído" usando um `if` antes do `return`, criando uma variável intermediária `badgeConcluido`. Funciona, mas não é o padrão React.

**O que fazer:**

1. Abra `src/componentes/CartaoTopico.tsx`.
2. Remova a variável `badgeConcluido` e o bloco `if` que a preenche.
3. Use o operador `&&` diretamente dentro do JSX, no mesmo lugar onde o badge era inserido.

**Critério de aceitação:**
- O resultado visual precisa ser **idêntico** ao anterior: quando `concluido` é `true`, o badge aparece; quando é `false`, nada é renderizado.
- O componente deve ter menos linhas que antes, sem `if` e sem variáveis intermediárias para JSX.

---

### Exercício 3 — Mensagem de lista vazia em `InicioMap`

Atualmente, o `InicioMap.tsx` sempre tenta renderizar a lista de matérias. Se o array `materias` estiver vazio, o usuário vê uma tela em branco e não entende o que aconteceu.

**O que fazer:**

1. Em `src/telas/InicioMap.tsx`, adicione renderização condicional:
   - Se `materias.length === 0`, exiba `<Text>Nenhuma matéria cadastrada.</Text>` **no lugar** da lista.
   - Se houver matérias, a lista continua sendo renderizada normalmente.
2. Escolha entre `&&` e ternário (`? :`) e justifique, no comentário do código a sua escolha.

**Lembre-se** que `materias.length` é um número. Se você escrever `{materias.length && ...}`, o `0` aparece na tela quando a lista estiver vazia. Use `materias.length === 0` ou `materias.length > 0` para garantir um booleano.

**Como testar:**
- Apague temporariamente os itens do array `materias` e confirme que a mensagem aparece.
- Devolva os itens e confirme que a lista volta a ser renderizada.

---

### Exercício 4 — Tela `TelaTopicos`

Após a implementação do `Cabecalho` e a alteração do `CartaoTopico`, vai "juntar tudo" em uma nova tela que lista os tópicos de uma matéria.

**O que fazer:**

1. Crie o arquivo `src/telas/TelaTopicos.tsx`.
2. No topo da tela, use o componente `Cabecalho` passando `titulo` (ex.: `"Tópicos"`) e `subtitulo` à sua escolha (ex.: nome da matéria).
3. Crie um array local `topicos` com **pelo menos 4 itens**, cada um contendo `nome`, `materiaVinculada` e `concluido`, varie entre `true` e `false` para esta prop.
4. Renderize os tópicos usando o componente `CartaoTopico`. Pode usar `.map()` para iterar sobre o array.
5. Substitua o conteúdo de `App.tsx` para renderizar `TelaTopicos` no lugar da tela atual e teste no Expo.

**Critério de aceitação:** ao abrir o app, você vê:
- O cabeçalho no topo, com o título (e subtítulo, se passado).
- A lista de cartões abaixo, com o badge "Concluído" aparecendo **apenas** nos itens marcados como concluídos.
