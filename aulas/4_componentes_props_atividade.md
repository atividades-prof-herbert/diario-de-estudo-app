# Aula 4 — Exercício Prático

Até agora todas as telas começam diretamente com o conteúdo, sem um cabeçalho padronizado. Nesta atividade, você vai aplicar **renderização condicional**, **regras do JSX** e **componentização com props** para padronizar o app.

> Trabalhe na ordem proposta — o exercício 4 depende dos componentes refinados nos exercícios 1, 2 e 3.

---

## Exercício 1 — Componente `Cabecalho`

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

## Exercício 2 — Refatorar `CartaoTopico` para usar `&&`

Na branch aula-03, o `CartaoTopico` decidia se renderizava o badge "Concluído" usando um `if` antes do `return`, criando uma variável intermediária `badgeConcluido`. Funciona, mas não é o padrão React.

**O que fazer:**

1. Abra `src/componentes/CartaoTopico.tsx`.
2. Remova a variável `badgeConcluido` e o bloco `if` que a preenche.
3. Use o operador `&&` diretamente dentro do JSX, no mesmo lugar onde o badge era inserido.

**Critério de aceitação:**
- O resultado visual precisa ser **idêntico** ao anterior: quando `concluido` é `true`, o badge aparece; quando é `false`, nada é renderizado.
- O componente deve ter menos linhas que antes, sem `if` e sem variáveis intermediárias para JSX.

---

## Exercício 3 — Mensagem de lista vazia em `InicioMap`

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

## Exercício 4 — Tela `TelaTopicos`

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
