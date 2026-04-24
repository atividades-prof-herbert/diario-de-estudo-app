# Aula 5 — Hooks e Estado com `useState`

## Objetivo

1. Entender o que é **estado** em um componente React e por que as props sozinhas não bastam.
2. Usar o hook **`useState`** para guardar dados que mudam ao longo do tempo.
3. Responder a eventos do usuário (toques em botões) e disparar **alertas**.
4. Construir **formulários controlados** que leem o que o usuário digitou.
5. **Compartilhar estado** entre componentes elevando-o para o pai comum (*lifting state up*).
6. Conhecer as **regras dos hooks** e boas práticas de organização de estado.

---

## 1. Por que precisamos de estado?

Até agora todos os componentes que criamos eram **estáticos do ponto de vista interno**: recebem dados via props (de fora) e renderizam JSX. Não há nada que mude *dentro* deles ao longo do tempo.

Considere o `CartaoTopico` da aula 4:

```tsx
<CartaoTopico nome="Funções" materiaVinculada="Matemática" concluido={true} />
```

A prop `concluido` é decidida pela tela que usa o componente. Se quisermos que **o usuário** marque um tópico como concluído ao tocar nele, temos um problema:

- A prop vem de fora — não podemos alterá-la de dentro do componente.
- Se mudássemos uma variável local (`let concluido = false`), o React **não saberia** que precisa re-renderizar.

**Estado** é a solução: uma forma de armazenar dados *dentro* do componente que, quando mudam, **disparam uma nova renderização** automaticamente.

---

## 2. O que são hooks?

**Hooks** são funções especiais do React, com nome começando por `use...`, que adicionam capacidades a componentes funcionais:

- Ter **estado interno** (`useState`)
- Executar **efeitos colaterais** (`useEffect` — assunto da próxima aula)
- Acessar contexto, refs, memoização etc. (`useContext`, `useRef`, `useMemo`...)

Toda função iniciada por `use` é um hook e segue regras específicas (seção 9). Nesta aula focamos em `useState`.

---

## 3. `useState` — estado reativo

### 3.1 Sintaxe básica

```tsx
import { useState } from 'react';

const [valor, setValor] = useState(valorInicial);
```

`useState` devolve um **array com dois elementos**:

1. O valor atual do estado.
2. Uma função para atualizar esse valor.


---

### 3.2 Primeiro exemplo — contador

```tsx
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Contador() {
  const [contagem, setContagem] = useState(0);

  return (
    <View>
      <Text>Você clicou {contagem} vezes</Text>
      <TouchableOpacity onPress={() => setContagem(contagem + 1)}>
        <Text>Clique aqui</Text>
      </TouchableOpacity>
    </View>
  );
}
```

O que acontece:

1. Na primeira renderização, `contagem` vale `0` (o valor inicial passado a `useState`).
2. Ao tocar no botão, chamamos `setContagem(contagem + 1)`.
3. O React **agenda uma nova renderização** com o valor atualizado.
4. A função do componente é executada de novo, agora com `contagem = 1`.
5. O JSX é re-gerado e a tela é atualizada.

**Importante:** atribuir diretamente (`contagem = contagem + 1`) **não funciona**. Só `setContagem(...)` avisa o React de que o estado mudou.

> Cada instância do componente tem **seu próprio estado**. Se você renderizar dois `<Contador />` na mesma tela, cada um terá uma contagem independente.

---

### 3.3 Estado é "imutável" — sempre crie um novo valor

Nunca modifique o valor do estado diretamente. Sempre passe um **novo valor** para o setter.

```tsx
// Errado — muta o array existente, React não detecta a mudança
const [itens, setItens] = useState<string[]>([]);
itens.push('novo');
setItens(itens);

// Correto — cria um novo array
setItens([...itens, 'novo']);
```

O mesmo vale para objetos:

```tsx
// Errado
usuario.nome = 'Maria';
setUsuario(usuario);

// Correto — espalha as propriedades em um novo objeto
setUsuario({ ...usuario, nome: 'Maria' });
```

O React decide se precisa re-renderizar **comparando as referências** (igualdade `===`). Se o array/objeto for o mesmo, ele assume que nada mudou.

---

### 3.4 Tipando o estado com TypeScript

Na maioria dos casos, o TypeScript **infere** o tipo a partir do valor inicial:

```tsx
const [contagem, setContagem] = useState(0);          // number
const [nome, setNome] = useState('');                  // string
const [ativo, setAtivo] = useState(false);             // boolean
```

Quando o valor inicial não é suficiente (por exemplo, um array vazio que vai conter objetos, ou um valor que pode ser `null`), informe o tipo manualmente:

```tsx
type Materia = { nome: string; descricao: string };

const [materias, setMaterias] = useState<Materia[]>([]);
const [selecionada, setSelecionada] = useState<Materia | null>(null);
```

---

### 3.5 Atualização baseada no valor anterior

Quando a próxima atualização **depende do valor atual**, prefira a **forma funcional** do setter:

```tsx
// Forma simples — funciona, mas pode dar problema em atualizações encadeadas
setContagem(contagem + 1);

// Forma funcional — recebe o valor mais recente como parâmetro
setContagem((anterior) => anterior + 1);
```

Por que importa? O React pode agrupar várias atualizações. Se você chamar `setContagem(contagem + 1)` três vezes seguidas, todas usam o mesmo `contagem` antigo — o resultado final será `contagem + 1`, não `contagem + 3`. A forma funcional sempre recebe o valor mais recente.

---

## 4. Respondendo a eventos — botões e `Alert`

Estado quase sempre muda em resposta a algo que o usuário fez. Em React Native, o caminho mais comum é o `onPress` de um `TouchableOpacity`/`Pressable`/`Button`. Para dar um retorno visual rápido, usamos `Alert.alert()`.

```tsx
import { Alert, Text, TouchableOpacity } from 'react-native';

export default function BotaoSaudacao() {
  function aoPressionar() {
    Alert.alert('Olá!', 'Botão pressionado.');
  }

  return (
    <TouchableOpacity onPress={aoPressionar}>
      <Text>Toque aqui</Text>
    </TouchableOpacity>
  );
}
```

Dois detalhes importantes:

- **Passamos a função, não a chamada.** `onPress={aoPressionar}` registra a função; `onPress={aoPressionar()}` chama na hora da renderização (errado).
- Quando precisamos passar argumentos, usamos uma arrow inline:
  ```tsx
  <TouchableOpacity onPress={() => Alert.alert('Mensagem', `Item: ${nome}`)}>
  ```

Combinando com `useState`, conseguimos reagir ao toque atualizando estado e mostrando um alerta:

```tsx
const [cliques, setCliques] = useState(0);

function aoClicar() {
  setCliques((anterior) => anterior + 1);
  Alert.alert('Aviso', `Você clicou ${cliques + 1} vezes.`);
}
```

---

## 5. Estado em formulários — `LoginControlado`

Os `TextInput` da aula 3 não tinham estado: o usuário digitava, mas o app nunca **lia** o que foi digitado. Para acessar o valor, precisamos de um **input controlado** — onde o React é a fonte da verdade do conteúdo.

```tsx
// src/componentes/LoginControlado.tsx
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  titulo: string;
  textoBotao?: string;
};

export default function LoginControlado({ titulo, textoBotao = 'Entrar' }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function aoEnviar() {
    if (email.length === 0 || senha.length === 0) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }
    Alert.alert('Login', `Email: ${email}`);
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>

      <Text style={estilos.rotulo}>Email</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={estilos.rotulo}>Senha</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={estilos.botao} onPress={aoEnviar}>
        <Text style={estilos.textoBotao}>{textoBotao}</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { width: '100%', marginTop: 16 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  rotulo: { fontSize: 14, color: '#333', marginBottom: 4, marginTop: 8 },
  entrada: { borderWidth: 1, borderColor: '#999', borderRadius: 8, padding: 10, fontSize: 14 },
  botao: { backgroundColor: '#4A90D9', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 16 },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
```

O padrão é o mesmo para qualquer input:

```tsx
const [campo, setCampo] = useState('');

<TextInput
  value={campo}            // o valor exibido vem do estado
  onChangeText={setCampo}  // toda mudança atualiza o estado
/>
```

`onChangeText` recebe a string nova como argumento. Como `setCampo` também aceita uma string, podemos passá-lo diretamente em vez de escrever `(texto) => setCampo(texto)`.

E o botão "Entrar":

- Se algum campo está vazio → `Alert.alert('Atenção', ...)` e não prossegue.
- Se está tudo preenchido → `Alert.alert('Login', ...)` simulando o envio.

Esse é o ciclo completo de um formulário simples: **estado controla o input → handler valida e age → alerta dá feedback**.

---

## 6. Aplicando ao projeto — `CartaoTopicoToggle`

Vamos transformar o `CartaoTopico` em um componente clicável que alterna entre "concluído" e "pendente".

```tsx
// src/componentes/CartaoTopicoToggle.tsx
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  nome: string;
  materiaVinculada: string;
  concluidoInicial?: boolean;
};

export default function CartaoTopicoToggle({
  nome,
  materiaVinculada,
  concluidoInicial = false,
}: Props) {

  const [concluido, setConcluido] = useState(concluidoInicial);

  return (
    <TouchableOpacity
      style={estilos.cartao}
      onPress={() => setConcluido((anterior) => !anterior)}
    >
      <View style={estilos.cabecalho}>
        <Text style={estilos.nome}>{nome}</Text>
        {concluido && <Text style={estilos.badge}>Concluído</Text>}
      </View>
      <Text style={estilos.materia}>{materiaVinculada}</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nome: { fontSize: 15, fontWeight: 'bold', color: '#222', flexShrink: 1 },
  badge: { fontSize: 12, color: '#2ECC71', fontWeight: '600', marginLeft: 8 },
  materia: { fontSize: 12, color: '#777' },
});
```

Pontos importantes:

- A prop foi renomeada para `concluidoInicial`. Ela agora **só define o valor inicial** — depois disso, o estado interno toma conta.
- `setConcluido((anterior) => !anterior)` usa a forma funcional para inverter o booleano.

---

## 7. Estado em listas — adicionando matérias

Quando o estado é uma lista, o setter é chamado com um **novo array** (lembre-se: imutabilidade).

```tsx
import { useState } from 'react';

type Materia = { nome: string; descricao: string };

const [materias, setMaterias] = useState<Materia[]>([]);
const [novoNome, setNovoNome] = useState('');

function adicionar() {
  if (novoNome.trim().length === 0) return;
  setMaterias([...materias, { nome: novoNome, descricao: '' }]);
  setNovoNome(''); // limpa o input
}
```

`[...materias, novoItem]` cria um **novo array** com todos os itens antigos mais o novo. Para remover:

```tsx
function remover(nome: string) {
  setMaterias(materias.filter((m) => m.nome !== nome));
}
```

`filter` também devolve um array novo — perfeito para o React detectar a mudança.

---

## 8. Compartilhando estado entre componentes (*lifting state up*)

Cada chamada de `useState` cria um estado **independente** dentro daquele componente. Isso é ótimo na maior parte dos casos, mas às vezes precisamos que **dois componentes irmãos enxerguem o mesmo dado** e mudem juntos.

### 8.1 O problema

Imagine dois botões que devem mostrar **a mesma contagem** e somar juntos a cada toque:

```tsx
// Não funciona como queremos: cada botão tem seu próprio estado
function BotaoContador() {
  const [contagem, setContagem] = useState(0);
  return (
    <TouchableOpacity onPress={() => setContagem((c) => c + 1)}>
      <Text>Clicado {contagem} vezes</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <>
      <BotaoContador />
      <BotaoContador />
    </>
  );
}
```

Tocar em um botão **não afeta** o outro: cada um guarda sua própria `contagem`.

### 8.2 A solução — elevar o estado para o pai

Movemos o `useState` para o **componente comum mais próximo** dos dois. Em seguida, passamos o valor e o handler como **props** para os filhos.

```tsx
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type BotaoProps = {
  contagem: number;
  aoClicar: () => void;
};

function BotaoContador({ contagem, aoClicar }: BotaoProps) {
  return (
    <TouchableOpacity onPress={aoClicar}>
      <Text>Clicado {contagem} vezes</Text>
    </TouchableOpacity>
  );
}

export default function ContadoresJuntos() {
  const [contagem, setContagem] = useState(0);

  function incrementar() {
    setContagem((anterior) => anterior + 1);
  }

  return (
    <View>
      <Text>Contadores que mudam juntos</Text>
      <BotaoContador contagem={contagem} aoClicar={incrementar} />
      <BotaoContador contagem={contagem} aoClicar={incrementar} />
    </View>
  );
}
```

Agora qualquer toque em qualquer botão atualiza a `contagem` no pai, que repassa o novo valor para **os dois** filhos. Eles renderizam juntos.

### 8.3 O padrão geral

1. Identifique o **dado compartilhado**.
2. Encontre o **componente ancestral comum** mais próximo dos componentes que precisam dele.
3. Coloque o `useState` nesse ancestral.
4. Passe o valor para baixo via prop.
5. Passe **funções de atualização** (callbacks) para os filhos que precisam alterar o estado.

Esse padrão se chama ***lifting state up*** (elevar o estado). Ele aparece o tempo todo: filtros aplicados a uma lista, formulários com várias seções, seleção de item entre vários cartões, etc.

---

## 9. Regras dos hooks

São apenas duas, mas precisam ser respeitadas sempre.

### 9.1 Só chame hooks no nível superior

Não chame hooks dentro de `if`, `for`, `while`, funções aninhadas ou após um `return` condicional.

```tsx
// Errado — useState dentro de if
function Componente({ ativo }: Props) {
  if (ativo) {
    const [valor, setValor] = useState(0); // proibido
  }
}

// Errado — return antes de hook
function Componente({ ativo }: Props) {
  if (!ativo) return null;
  const [valor, setValor] = useState(0); // proibido — pode não ser chamado
}

// Correto — hooks no topo, sempre na mesma ordem
function Componente({ ativo }: Props) {
  const [valor, setValor] = useState(0);
  if (!ativo) return null;
  // ...
}
```

Por quê? O React identifica cada hook **pela ordem em que é chamado**. Se a ordem mudar entre renderizações, ele perde o controle de qual estado pertence a quem.

---

### 9.2 Só chame hooks de componentes ou de outros hooks

Hooks só podem ser usados:

- Dentro do corpo de um **componente React** (função que retorna JSX).
- Dentro de **outros hooks** (funções `useAlgo` que você cria — chamadas de "hooks customizados").

Não chame hooks dentro de funções utilitárias comuns, callbacks, ou fora de componentes.

---

## 10. Boas práticas de organização de estado

### 10.1 Estado mínimo

Guarde no estado **apenas o que não pode ser derivado**. Se algo pode ser calculado a partir de outros estados ou props, não duplique no estado.

```tsx
// Ruim — duplicação
const [nome, setNome] = useState('');
const [nomeMaiusculo, setNomeMaiusculo] = useState('');

// Bom — derivado
const [nome, setNome] = useState('');
const nomeMaiusculo = nome.toUpperCase();
```

---

### 10.2 Um estado por preocupação

Prefira **vários `useState` separados** em vez de um único objeto, quando os campos são independentes:

```tsx
// Razoável quando os campos mudam juntos
const [usuario, setUsuario] = useState({ nome: '', email: '' });

// Mais claro quando mudam separadamente
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
```

Com objetos, lembre-se de espalhar (`...`) para não perder os outros campos:

```tsx
setUsuario({ ...usuario, nome: 'Maria' });
```

---

### 10.3 Eleve o estado quando ele precisa ser compartilhado

Já vimos na seção 8: se dois componentes irmãos precisam do mesmo dado, mova-o para o pai comum e passe-o por props.

---

### 10.4 Nomeie com consistência

A convenção `algo` / `setAlgo` é amplamente adotada. Para booleanos, prefira nomes que façam sentido como afirmação:

```tsx
const [ativo, setAtivo] = useState(false);
const [carregando, setCarregando] = useState(false);
const [aberto, setAberto] = useState(false);
```

---

### 10.5 Não use estado para o que props já entregam

Se uma prop já traz o dado, não copie-o para um estado interno — você cria duas fontes de verdade que podem divergir.

```tsx
// Ruim — estado vira "cópia desatualizada" da prop
function Cartao({ nome }: { nome: string }) {
  const [nomeLocal, setNomeLocal] = useState(nome); // só pega o nome inicial!
  return <Text>{nomeLocal}</Text>;
}

// Bom — usa a prop diretamente
function Cartao({ nome }: { nome: string }) {
  return <Text>{nome}</Text>;
}
```

A exceção é o padrão `valorInicial` (como o `concluidoInicial` da seção 6), onde a prop **deliberadamente** define apenas o valor de partida.

---

## Exercício Prático

### Exercício 1 — `Contador` simples

Para fixar o ciclo `useState` → setter → re-renderização, crie um componente isolado.

**O que fazer:**

1. Crie `src/componentes/Contador.tsx`.
2. O componente deve ter um estado `contagem` iniciando em `0`.
3. Renderize um `<Text>` mostrando o valor de `contagem` e dois botões:
   - **"+"** que incrementa em 1 (use a forma funcional do setter).
   - **"Zerar"** que volta para `0`.
4. Use o `Contador` em alguma tela (`App.tsx` ou uma tela existente) para testar.

**Critério de aceitação:** ao tocar em "+", o número aumenta; ao tocar em "Zerar", volta para `0`.

---

### Exercício 2 — `CartaoTopicoToggle` na tela `TelaTopicos`

Aproveite o componente da seção 6 e use-o no lugar do `CartaoTopico` original.

**O que fazer:**

1. Em `src/telas/TelaTopicos.tsx` (criada na aula 4), substitua o `CartaoTopico` por `CartaoTopicoToggle`.
2. Renomeie a prop nos itens do array de `concluido` para `concluidoInicial` (lembre-se: agora ela só define o valor inicial).
3. Teste tocando nos cartões — o badge "Concluído" deve aparecer/desaparecer.

**Critério de aceitação:** cada cartão alterna seu próprio estado independentemente dos outros.

---

### Exercício 3 — Cadastro de matérias na `InicioMap`

Transforme a lista estática de matérias em uma lista dinâmica que o usuário pode aumentar.

**O que fazer:**

1. Em `src/telas/InicioMap.tsx`, mova `materias` para dentro do componente como estado: `const [materias, setMaterias] = useState<Materia[]>([...itensIniciais]);`.
2. Acima da lista, adicione dois `TextInput` controlados (`nome` e `descricao`) e um botão **"Adicionar"**.
3. Ao tocar em "Adicionar":
   - Se `nome` estiver vazio (`trim().length === 0`), mostre um `Alert` e não faça nada.
   - Se já existir uma matéria com esse nome, mostre um `Alert` e não faça nada.
   - Caso contrário, adicione um novo objeto ao array (use `[...materias, novo]`) e limpe os campos.
4. Mantenha o tratamento de lista vazia da aula 4.

**Critério de aceitação:** ao digitar e tocar "Adicionar", um novo `CartaoMateria` aparece na lista. Os campos voltam a ficar vazios.

---

### Exercício 4 — Contador compartilhado (*lifting state up*)

Pratique o padrão da seção 8 com dois botões que somam **a mesma** contagem.

**O que fazer:**

1. Crie `src/componentes/BotaoContador.tsx` que recebe `contagem: number` e `aoClicar: () => void` como props e renderiza um botão exibindo a contagem.
2. Crie `src/telas/TelaContadoresJuntos.tsx` que:
   - Mantém um estado `contagem` (inicial `0`).
   - Renderiza **dois** `<BotaoContador />` passando o mesmo `contagem` e o mesmo handler `incrementar`.
3. Use a tela em `App.tsx` para testar.

**Critério de aceitação:** tocar em qualquer um dos botões aumenta o número exibido em **ambos**.

---

## Referências

- [React — State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [React — Responding to Events](https://react.dev/learn/responding-to-events)
- [React — Render and Commit](https://react.dev/learn/render-and-commit)
- [React — State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React — Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [React — Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [React — Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React — Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React — Quick Start](https://react.dev/learn)
