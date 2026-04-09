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

## 7. Resumo dos conceitos

| Conceito | Sintaxe |
|---|---|
| Prop obrigatória | `nome: string` |
| Prop opcional | `nome?: string` |
| Valor padrão | `{ nome = 'padrão' }` |
| Tipagem com `type` | `type Props = { ... }` |
| Passar prop no JSX | `<Componente nome="valor" />` |

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
