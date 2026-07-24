# Aula 11 — Firebase

## O que é o Firebase

Firebase é uma plataforma da Google que oferece um conjunto de serviços de backend prontos para uso: banco de dados em tempo real, autenticação, armazenamento de arquivos, hospedagem, funções serverless e outros. O objetivo é permitir que uma equipe de frontend construa aplicações completas sem precisar manter um servidor próprio.

---

## Configurando o Firebase no console do Google

### 1. Criar o projeto

1. Acesse [console.firebase.google.com](https://console.firebase.google.com) e faça login com uma conta Google.
2. Clique em **Criar um projeto**.
3. Digite um nome para o projeto e avance.
4. Escolha se deseja ativar o Google Analytics (opcional) e clique em **Criar projeto**.

Ao finalizar, o Firebase provisiona os recursos iniciais e exibe o painel do projeto.

### 2. Registrar o app

1. Na página inicial do projeto, clique no ícone **`</>`** (Web) para registrar um aplicativo web.
2. Informe um apelido para o app (apenas identificação interna) e clique em **Registrar app**.
3. O console exibe o objeto `firebaseConfig` com as credenciais do app — copie-o, pois será usado no código.

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "meu-projeto.firebaseapp.com",
  projectId: "meu-projeto",
  storageBucket: "meu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 3. Ativar o Cloud Firestore

1. No menu lateral, clique em **Build > Firestore Database**.
2. Clique em **Criar banco de dados**.
3. Escolha o modo **Teste** (permite leitura e escrita sem autenticação por 30 dias).
4. Selecione a região mais próxima e confirme.

---

## Instalando o SDK no projeto

```bash
npm install firebase
```

Crie um arquivo de configuração dedicado, por exemplo `./services/firebase.ts`:

```ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "meu-projeto.firebaseapp.com",
  projectId: "meu-projeto",
  storageBucket: "meu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

O objeto `app` funciona como um container que guarda a configuração e compartilha estado entre os serviços do Firebase. O `db` exportado é a instância do Firestore usada em todo o restante do projeto.

---

## Banco de dados NoSQL — conceitos

### SQL vs NoSQL

Bancos relacionais (SQL) organizam os dados em **tabelas** com colunas fixas e linhas. Cada linha segue exatamente o mesmo esquema, se uma coluna foi definida, todos os registros precisam ter (ou deixar nula) aquela coluna.

Bancos NoSQL abandonam esse modelo rígido. O Firestore usa um modelo orientado a **documentos**: os dados são armazenados como objetos flexíveis, semelhantes a JSON, sem esquema obrigatório. Dois documentos na mesma coleção podem ter campos completamente diferentes.

| Conceito SQL | Equivalente no Firestore |
|---|---|
| Banco de dados | Projeto Firebase |
| Tabela | Coleção |
| Linha | Documento |
| Coluna | Campo |
| Chave primária | ID do documento |

### Documentos

Um **documento** é a unidade básica de armazenamento. Ele contém pares chave-valor e recebe um identificador único (gerado automaticamente ou definido pelo desenvolvedor).

Exemplo de documento na coleção `usuarios`:

```
usuarios / ada1
  nome: "Ada Lovelace"
  email: "ada@example.com"
  nascimento: 1815
  ativo: true
```

Os tipos de valores suportados incluem: string, número, booleano, timestamp, array, mapa (objeto aninhado) e referência para outro documento.

### Coleções

Uma **coleção** é um container de documentos. Ela não tem esquema: não é necessário declarar os campos com antecedência. Coleções e documentos são criados implicitamente quando o primeiro dado é gravado.

```
matérias/          - coleção
  doc1             - documento
    nome: "Matemática"
    cor: "#FF5733"
  doc2
    nome: "História"
    cor: "#3498DB"

registros/         - coleção
  doc1
    materiaId: "doc1"
    descricao: "Derivadas"
    data: "2026-07-23"
```

### Subcoleções

Um documento pode conter uma **subcoleção**: uma coleção aninhada dentro dele. Isso permite modelar hierarquias:

```
usuarios/
  ada1/
    nome: "Ada Lovelace"
    anotacoes/          - subcoleção dentro do documento
      doc1
        texto: "Revisar capítulo 3"
```

Subcoleções são úteis quando os itens filhos pertencem exclusivamente ao documento pai e o número de itens pode crescer indefinidamente.

---

## Operações básicas com o Firestore

### Adicionar um documento

```ts
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

await addDoc(collection(db, 'materias'), {
  nome: 'Matemática',
  cor: '#FF5733'
});
```

O `addDoc` gera o ID do documento automaticamente. Se você quiser definir o ID, use `setDoc`:

```ts
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const ref = doc(db, 'materias', 'meu-id');
await setDoc(ref, {
  nome: 'Matemática',
  cor: '#FF5733'
});
```

### Ler todos os documentos de uma coleção

```ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const snapshot = await getDocs(collection(db, 'materias'));
snapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});
```

`getDocs` retorna um `QuerySnapshot`, que é uma **fotografia do estado da coleção no momento em que a consulta foi executada**. O nome "snapshot" vem exatamente disso: é uma imagem congelada dos dados naquele instante, não uma referência viva que se atualiza sozinha.

O `QuerySnapshot` contém:

- `.docs` — array com todos os documentos encontrados
- `.size` — quantidade de documentos
- `.empty` — `true` se não encontrou nenhum

Cada item dentro do snapshot é um `DocumentSnapshot`, com:

- `.id` — o identificador do documento no Firestore
- `.data()` — os campos do documento como objeto JavaScript
- `.exists()` — `true` se o documento existe (útil ao ler um documento específico com `getDoc`)

O Firestore foi projetado para funcionar também em tempo real: com `onSnapshot`, a função de callback é chamada automaticamente toda vez que os dados mudam no servidor. O snapshot é a estrutura comum entre a leitura pontual (`getDocs`) e a leitura reativa, o código que processa os dados funciona da mesma forma nos dois casos.

### Ler um documento específico

```ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const ref = doc(db, 'materias', 'meu-id');
const snapshot = await getDoc(ref);

if (snapshot.exists()) {
  console.log(snapshot.data());
}
```

### Atualizar um documento

```ts
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const ref = doc(db, 'materias', 'meu-id');
await updateDoc(ref, {
  nome: 'Matemática Avançada'
});
```

`updateDoc` altera apenas os campos informados, mantendo os demais intactos.

### `setDoc` vs `updateDoc`

A diferença está no que acontece com os campos que você **não** passa:

- `setDoc` **sobrescreve o documento inteiro**. Campos não informados são apagados.
- `updateDoc` **mescla com o documento existente**. Campos não informados permanecem intactos.

Exemplo: dado um documento com `{ nome: 'Matemática', cor: '#FF5733' }`:

```ts
// setDoc — resultado: { nome: 'Matemática Avançada' }  ← cor foi apagada
await setDoc(ref, { nome: 'Matemática Avançada' });

// updateDoc — resultado: { nome: 'Matemática Avançada', cor: '#FF5733' }  ← cor permanece
await updateDoc(ref, { nome: 'Matemática Avançada' });
```

`setDoc` também cria o documento caso ele não exista. `updateDoc` falha se o documento não existir.

### Remover um documento

```ts
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const ref = doc(db, 'materias', 'meu-id');
await deleteDoc(ref);
```

### Buscar documentos por campo — `query` e `where`

`getDocs(collection(...))` retorna todos os documentos da coleção. Quando você quer filtrar por um campo específico, usa `query` combinado com `where`:

```ts
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const q = query(collection(db, 'materias'), where('nome', '==', 'Matemática'));
const snapshot = await getDocs(q);
snapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});
```

O `query` constrói a consult, ele recebe a coleção e um ou mais filtros. O `where` define o filtro: qual campo, qual operador e qual valor comparar. Os operadores disponíveis são `==`, `!=`, `<`, `<=`, `>`, `>=`, `in` e `array-contains`.

A consulta só é executada quando o resultado é passado para `getDocs`. Até lá, `q` é apenas uma descrição do que você quer buscar, sem nenhuma requisição ao banco.

É possível encadear múltiplos `where` para filtrar por mais de um campo:

```ts
const q = query(
  collection(db, 'materias'),
  where('nome', '==', 'Matemática'),
  where('cor', '==', '#FF5733')
);
```

### Por que `setDoc`, `updateDoc` e `deleteDoc` usam `doc()`, mas `addDoc` não

A diferença está no que cada operação precisa saber:

- `addDoc(collection(...), dados)` — você não sabe o ID ainda; o Firestore gera um automaticamente. Basta passar a **coleção**.
- `setDoc`, `updateDoc`, `deleteDoc` — você está operando em um documento específico. O Firestore precisa saber exatamente qual é. Por isso você passa uma **referência ao documento**.

O `doc(db, 'materias', 'meu-id')` cria essa referência. Ele não lê nem grava nada no banco: apenas constrói um ponteiro para o caminho `materias/meu-id`. É esse ponteiro que as operações recebem para saber onde agir.

| Operação | Precisa de | Motivo |
|---|---|---|
| `addDoc` | `collection()` | ID gerado pelo Firestore |
| `setDoc` | `doc()` | Cria ou sobrescreve documento com ID definido |
| `updateDoc` | `doc()` | Altera documento existente por ID |
| `deleteDoc` | `doc()` | Remove documento existente por ID |

---

## Referências

- [Firebase — Adicionar o Firebase a um projeto JavaScript](https://firebase.google.com/docs/web/setup?hl=pt-br)
- [Firebase JS SDK — Referência da API](https://firebase.google.com/docs/reference/js)
- [Cloud Firestore — Modelo de dados](https://firebase.google.com/docs/firestore/data-model)
- [Cloud Firestore — Primeiros passos](https://firebase.google.com/docs/firestore/quickstart)
