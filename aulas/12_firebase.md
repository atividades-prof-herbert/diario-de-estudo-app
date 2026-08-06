# Aula 12: Firebase no aplicativo

## Objetivo

Na aula 11 o Firebase foi configurado e explorado em um script isolado (`firebase-cli/`), fora do aplicativo. Nesta aula o mesmo conhecimento é aplicado dentro do app real: o `MateriaService.ts` deixa de manter um array em memória e passa a ler e gravar diretamente na coleção `materias` do Firestore.

---

## O papel da pasta `services`

O aplicativo já era organizado em camadas antes desta aula: as telas (`src/telas`) nunca manipulavam os dados diretamente, elas sempre chamavam funções como `listarMaterias()`, `adicionarMateria()` ou `removerMateria()` importadas de `src/services/MateriaService.ts`.

Essa separação é exatamente o que torna a troca de Firebase possível sem reescrever o aplicativo inteiro. A pasta `services` funciona como uma fronteira entre a interface e a origem dos dados. Enquanto essa fronteira for respeitada, o que está do lado de dentro dela (um array em memória, um arquivo local, o Firestore, ou qualquer outra fonte) pode mudar sem que as telas precisem saber como os dados são armazenados. Elas continuam chamando as mesmas funções, com os mesmos nomes; apenas o comportamento por trás delas mudou.

Essa é a mesma ideia de "responsabilidade única" aplicada em nível de arquitetura: cada tela cuida da interface, e cada service cuida de como aquele tipo de dado é persistido.

---

## O papel de `types`

Cada arquivo em `src/types` (`Materia.ts`, `Topico.ts`, `Registro.ts`) descreve o formato dos dados manipulados pelo aplicativo. A partir desta aula, `types/Materia.ts` passa a representar também o formato de um documento da coleção `materias` no Firestore: os mesmos campos (`nome`, `descricao`, `corDestaque`) que existem no documento salvo no banco aparecem no tipo usado pelo TypeScript.

```ts
export type Materia = {
  id: string;
  nome: string;
  descricao: string;
  corDestaque?: string;
};
```

O campo `id` mudou de `number` para `string`. Isso não é uma escolha arbitrária: o Firestore gera identificadores de documento como strings (por exemplo, `"aB3xK9pQ..."`), diferente do contador numérico incremental que o array em memória usava. Esse detalhe pequeno é o que gera o maior efeito cascata desta refatoração, como visto a seguir.

---

## Refatorando o `MateriaService.ts`

### Antes: array em memória

```ts
const db: Materia[] = [ /* ... */ ];
let proximoId = 4;

export function listarMaterias(): Materia[] {
  return [...db];
}

export function adicionarMateria(dados: Omit<Materia, 'id'>): Materia {
  const nova: Materia = { id: proximoId++, ...dados };
  db.push(nova);
  return nova;
}
```

### Depois: operações no Firestore

```ts
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Materia } from '../types/Materia';

const COLECAO = 'materias';

export async function listarMaterias(): Promise<Materia[]> {
  const snapshot = await getDocs(collection(db, COLECAO));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Materia));
}

export async function adicionarMateria(dados: Omit<Materia, 'id'>): Promise<Materia> {
  const ref = await addDoc(collection(db, COLECAO), dados);
  return { id: ref.id, ...dados };
}
```

As demais funções (`buscarMateriaPorId`, `atualizarMateria`, `removerMateria`) seguem o mesmo padrão já apresentado na aula 11 e praticado em `firebase-cli/service/crud-materias.js`: cada uma delas usa `doc(db, COLECAO, id)` para apontar para um documento específico e chama a operação do Firestore correspondente (`getDoc`, `updateDoc`, `deleteDoc`).

A diferença mais importante em relação ao script da aula 11 é que, agora, essas funções são consumidas por componentes React, então o formato de retorno importa para quem chama. Todas passaram a retornar `Promise`, porque toda operação do Firestore é assíncrona.

---

## O efeito cascata: por que outras telas também mudaram

Trocar o array em memória pelo Firestore alterou duas coisas ao mesmo tempo: as funções passaram a retornar `Promise` em vez do valor direto, e o `id` das matérias passou a ser `string` em vez de `number`. Ambas as mudanças se propagam para qualquer código que dependia do comportamento anterior.

### 1. Chamadas síncronas viram assíncronas

Onde antes bastava:

```ts
useEffect(() => {
  setMaterias(listarMaterias());
}, []);
```

agora é necessário aguardar a resposta do Firestore:

```ts
useEffect(() => {
  async function carregarMaterias() {
    const materiasCarregadas = await listarMaterias();
    setMaterias(materiasCarregadas);
  }

  carregarMaterias();
}, []);
```

O `useEffect` não aceita uma função `async` diretamente como seu primeiro argumento, por isso a função `carregarMaterias` é declarada por dentro e chamada em seguida. O `await listarMaterias()` deixa explícito o que a função devolve: o array de matérias vindo do Firestore, guardado em `materiasCarregadas`, que só então é passado para `setMaterias`.

Seria possível declarar `carregarMaterias` fora do `useEffect`, no corpo do componente, e apenas chamá-la de dentro do efeito. O motivo de mantê-la por dentro é evitar uma complicação do React: se a função depende de algo do escopo do componente, o linter de hooks passa a exigir que ela entre no array de dependências do efeito, o que normalmente força o uso de `useCallback` só para estabilizar essa referência entre renders. Declarando a função dentro do próprio `useEffect`, esse problema simplesmente não existe: ela é criada, usada e descartada a cada execução do efeito, sem afetar as dependências.

O mesmo aconteceu em funções de salvar e excluir, que passaram a usar `async`/`await` antes de recarregar a lista.

Um caso particular foi `TelaTopicos.tsx` e `TelaRegistro.tsx`: antes, era possível chamar `buscarMateriaPorId(...)` diretamente dentro do `.map()` que renderiza cada item da lista, porque a chamada era síncrona. Com o Firestore isso deixou de ser viável, chamar uma função assíncrona dentro da renderização não funciona. A solução foi carregar a lista de matérias uma única vez em um estado (`materias`) e, dentro do `.map()`, apenas consultar esse estado já carregado com `materias.find(...)`.

### 2. O `id` numérico virou texto

Todo lugar que tratava o `id` da matéria como número precisou se ajustar:

Nos formulários com `Picker` (`TelaNovoTopico.tsx`, `TelaNovoRegistro.tsx`, `TelaTopicos.tsx`), o valor `0` era usado como sentinela para representar "nenhuma matéria selecionada". Como `0` não é uma string, o sentinela virou string vazia (`''`).

O campo `materiaId` nos tipos `Topico` e `Registro` também é uma referência ao `id` de uma matéria, então precisou mudar de `number` para `string` para continuar compatível.

---

## Uma consequência interessante: dados órfãos de verdade

Os tópicos e registros de exemplo (em `TopicoService.ts` e `RegistroService.ts`) continuam vivendo em um array em memória, eles ainda não foram migrados para o Firestore. Seus valores de `materiaId` (como `'1'`, `'2'`, `'3'`) são apenas texto de exemplo e não apontam para nenhum documento real da coleção `materias`, já que os documentos reais recebem identificadores gerados pelo Firestore.

Essa situação é, na prática, o mesmo problema descrito no `plano-consistencia.md` da atividade anterior: uma referência (`materiaId`) que não é garantida pelo banco e pode ficar desatualizada ou apontar para nada. A diferença é que agora isso pode ser observado diretamente rodando o aplicativo, não apenas descrito em teoria. A migração de tópicos e registros para o Firestore, e a resolução definitiva dessas referências, fica para uma próxima atividade.

---

## Campos opcionais e o erro `Unsupported field value: undefined`

O campo `corDestaque` de `Materia` é opcional (`corDestaque?: string`). Em `TelaNovaMateria.tsx`, quando o usuário deixa esse campo em branco, o valor enviado para o service é `corDestaque || undefined`. O Firestore, porém, rejeita `addDoc`/`updateDoc` com qualquer campo cujo valor seja `undefined`, o que gerava o erro `Function addDoc() called with invalid data. Unsupported field value: undefined`.

Uma solução possível seria filtrar os campos `undefined` manualmente dentro de cada função do service antes de chamar `addDoc`/`updateDoc`, mas isso precisaria ser repetido em todo service e para todo campo opcional (`corDestaque` hoje, qualquer outro campo opcional que surgir depois).

A solução adotada resolve o problema na origem, na configuração do próprio Firestore em `firebase.ts`:

```ts
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true });
```

Antes, `db` era criado com `getFirestore(app)`. A troca para `initializeFirestore(app, { ignoreUndefinedProperties: true })` faz o SDK simplesmente ignorar, de forma automática, qualquer campo com valor `undefined` em qualquer chamada de `addDoc`, `setDoc` ou `updateDoc` feita através desse `db`, em qualquer service do aplicativo. O campo não é gravado com valor `null`, ele simplesmente não aparece no documento, exatamente como se nunca tivesse sido incluído no objeto.

Isso elimina a necessidade de tratar esse caso manualmente em cada service, o que é preferível a uma correção pontual só em `MateriaService.ts`, já que qualquer campo opcional futuro (em `Materia` ou em outro `type` que venha a ser migrado para o Firestore) se beneficia automaticamente da mesma configuração.

---

## Atividade

A atividade desta aula foi movida para [12_firebase_atividade.md](12_firebase_atividade.md).