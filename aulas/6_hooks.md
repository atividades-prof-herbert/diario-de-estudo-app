# Aula 6 — Hooks e Estado com `useState`

## Objetivo

1. Entender o que é **estado** em um componente React e por que as props sozinhas não bastam.
2. Usar o hook **`useState`** para guardar dados que mudam ao longo do tempo.
3. Responder a eventos do usuário (toques em botões) e disparar **alertas**.
4. Construir **formulários controlados** que leem o que o usuário digitou.

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

Toda função iniciada por `use` é um hook e segue regras específicas. Nesta aula focamos em `useState`.

---

## 3. `useState`

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

---

### 3.4 Tipando o estado com TypeScript

Na maioria dos casos, o TypeScript **infere** o tipo a partir do valor inicial:

```tsx
const [contagem, setContagem] = useState(0);   // number
const [nome, setNome] = useState('');           // string
const [ativo, setAtivo] = useState(false);      // boolean
```

Quando o valor inicial não é suficiente, informe o tipo manualmente. Por exemplo, um array vazio que vai conter objetos:

```tsx
type Materia = { nome: string; descricao: string };

const [materias, setMaterias] = useState<Materia[]>([]);
```



---

## 4. Estado em formulários 

Os `TextInput` sem estado não permitem que o app **leia** o que o usuário digitou. Para isso usamos um **input controlado**.

O padrão é sempre o mesmo:

```tsx
const [nome, setNome] = useState('');

<TextInput
  value={nome}            // valor exibido vem do estado
  onChangeText={setNome}  // cada mudança atualiza o estado
/>
```

---

### 4.1 `TelaLogin` — dois campos, validação simples

O caso mais direto: email e senha. Se algum estiver vazio, mostramos um alerta. Se estiver tudo preenchido, exibimos os dados antes de navegar.

```tsx
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

function aoEntrar() {
  if (!email.trim() || !senha.trim()) {
    mostrarAlerta('Atenção', 'Preencha email e senha.');
    return;
  }
  // outra forma: usar template string com ${}
  // mostrarAlerta('Login recebido', `Email: ${email}\nSenha: ${senha}`);
  mostrarAlerta('Login recebido', 'Email: ' + email + '\nSenha: ' + senha);
  router.replace('/inicio');
}
```



---

### 4.2 `TelaCadastro` — três campos, mesmo padrão

Adicionamos um campo a mais (`nome`), mas o padrão é idêntico: um `useState` por campo.

```tsx
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

function aoCriarConta() {
  if (!nome.trim() || !email.trim() || !senha.trim()) {
    mostrarAlerta('Atenção', 'Preencha todos os campos.');
    return;
  }
  // outra forma: usar template string com ${}
  // mostrarAlerta('Conta criada!', `Nome: ${nome}\nEmail: ${email}\nSenha: ${senha}`);
  mostrarAlerta('Conta criada!', 'Nome: ' + nome + '\nEmail: ' + email + '\nSenha: ' + senha);
  router.replace('/');
}
```

---

### 4.3 `TelaNovaMateria` — gravando no service

Aqui o handler não apenas exibe os dados: ele chama `adicionarMateria` do `MateriaService` para persistir o registro, e depois limpa os campos para o usuário poder cadastrar a próxima matéria.

```tsx
import { adicionarMateria } from '../services/MateriaService';

const [nome, setNome] = useState('');
const [descricao, setDescricao] = useState('');
const [corDestaque, setCorDestaque] = useState('');

function salvar() {
  if (!nome.trim()) {
    mostrarAlerta('Campo obrigatório', 'Informe o nome da matéria.');
    return;
  }
  //adiciona a materia no banco de dados
  adicionarMateria({ nome, descricao, corDestaque: corDestaque || undefined });
  //exibe o alerta de sucesso e limpa os campos do formulário
  mostrarAlerta('Matéria salva!', `"${nome}" adicionada com sucesso.`);
  setNome('');
  setDescricao('');
  setCorDestaque('');
}
```

Pontos importantes:

- `adicionarMateria` recebe um objeto sem `id` — o service gera o id automaticamente.
- `corDestaque: corDestaque || undefined` evita gravar uma string vazia quando o campo está em branco.
- Após salvar, chamamos os três setters com `''` para limpar os campos. O React re-renderiza os `TextInput` vazios, prontos para um novo cadastro.

---

O ciclo completo: **estado controla o input → handler valida → service persiste → alerta confirma → campos são limpos**.


---

## Exercícios

### Exercício 1 — `TelaNovoRegistro`: inputs controlados e alerta

A `TelaNovoRegistro` tem quatro `TextInput` sem estado, assim, o app não lê o que o usuário digita. Aplique o mesmo padrão das telas anteriores.

**O que fazer:**

1. Importe `useState` de `'react'`.
2. Crie um estado para cada campo: `materia`, `topico`, `descricao` e `data`, todos iniciando com `''`.
3. Conecte cada `TextInput` ao seu estado com `value` e `onChangeText`.
4. Extraia a função `salvar` do `onPress` do botão.
5. Dentro de `salvar`, valide se `materia` e `topico` estão preenchidos; se não, mostre um alerta e retorne.
6. Se estiver tudo preenchido, exiba os dados com `mostrarAlerta`.



---

### Exercício 2 — `TelaNovoTopico`: gravando no service e atualizando a lista

A `TelaNovoTopico` já tem `useState` e validação. O próximo passo é persistir o dado no `TopicoService` e verificar que a `TelaTopicos` reflete a mudança.

**O que fazer:**

1. Importe `adicionarTopico` de `'../services/TopicoService'`.
2. Dentro de `salvar`, após as validações, chame:
   ```tsx
   adicionarTopico({ nome, materia, concluido });
   ```
3. Após a chamada, exiba o alerta de sucesso com os dados e limpe os campos.



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
