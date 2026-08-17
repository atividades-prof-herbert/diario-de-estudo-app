# Diário de Estudos App

Aplicativo mobile para organização e acompanhamento de estudos, desenvolvido com React Native, Expo e TypeScript.

## Visão Geral

O projeto tem como objetivo permitir que o usuário:

- cadastre matérias
- organize tópicos por matéria
- registre sessões de estudo
- acompanhe tempo estudado e desempenho em questões


## Estrutura do Repositório

```text
.
├── app-diario/       # Aplicação React Native com Expo
├── aulas/            # Materiais das aulas
└── documentacao/     # Documentação do projeto
```

## Stack atual

- Expo SDK 54
- React
- React Native
- TypeScript



## Aulas


### Aula 01 - Configuração do ambiente
A branch `aula-01-setup` contém a configuração inicial do ambiente e o projeto base criado com Expo usando o template `blank-typescript`.

Nesta etapa foram trabalhados:

- criação do projeto com Expo
- uso de TypeScript
- estrutura inicial do app
- papel dos arquivos `package.json`, `index.ts` e `App.tsx`
- fluxo de renderização da tela inicial

Material da aula:

- [aulas/1_setup_ambiente.md](aulas/1_setup_ambiente.md)


### Aula 02 - Componentes
A branch `aula-02-componentes`...

Nesta etapa foram trabalhados:


Material da aula:

- [aulas/1_setup_ambiente.md](aulas/1_setup_ambiente.md)


### Aula 03 - Componentes: Props e Tipagem
A branch `aula-03-componentes-props` apresenta o conceito de props como mecanismo de passagem de dados entre componentes, com tipagem via TypeScript.

Nesta etapa foram trabalhados:

- o problema dos componentes estáticos (dados hardcoded)
- o conceito de props como parâmetros de componentes
- declaração de tipos com `type Props`
- props obrigatórias e opcionais (`?`)
- valores padrão na desestruturação
- reutilização de componentes com dados diferentes

Componentes criados/refatorados:

- `CartaoMateria` — componente novo com props `nome`, `descricao` e `corDestaque?`
- `Login` — refatorado para receber `titulo` e `textoBotao?`

Material da aula:

- [aulas/3_componentes_props.md](aulas/3_componentes_props.md)


### Aula 04 - Renderização Condicional, Regras do JSX e Estilos Dinâmicos
A branch `aula-04-componentes-props` refina o que foi visto na aula 03, focando em padrões do React e melhor uso do JSX.

Nesta etapa foram trabalhados:

- renderização condicional com `&&` e ternário (`? :`)
- expressões vs declarações dentro de `{}`
- igualdade estrita (`===`) vs frouxa (`==`)
- regras do JSX: elemento raiz único, Fragment (`<>...</>`), nomes capitalizados
- estilos dinâmicos via prop `style` com array de objetos

Material da aula:

- [aulas/4_componentes_props.md](aulas/4_componentes_props.md)


### Aula 05 - Navegação com Expo Router
A branch `aula-05-rotas` introduz o Expo Router como sistema de navegação baseado em arquivos, substituindo o ponto de entrada manual do app.

Nesta etapa foram trabalhados:

- o conceito de rota em apps mobile (equivalente à URL no navegador)
- Expo Router como roteador baseado em arquivos (nome do arquivo = rota)
- configuração obrigatória: `"main": "expo-router/entry"` no `package.json` e `scheme` no `app.json`
- estrutura de pastas: pasta `app/` com `_layout.tsx` e arquivos de rota
- `_layout.tsx` com `Stack` para empilhamento de telas e botão "voltar" automático
- navegação com `router.push` (empilha), `router.replace` (substitui sem histórico) e `router.back`



Material da aula:

- [aulas/5_rotas.md](aulas/5_rotas.md)


### Aula 06 - Hooks e Estado com `useState`
A branch `aula-06-hooks-states` introduz o conceito de estado em componentes React e o hook `useState`, permitindo que o app reaja às ações do usuário.

Nesta etapa foram trabalhados:

- o problema dos componentes estáticos e por que as props não bastam
- `useState` para armazenar dados que mudam ao longo do tempo
- inputs controlados: conectar `TextInput` ao estado com `value` e `onChangeText`
- validação e feedback com `mostrarAlerta` (utilitário compatível com web e mobile)
- gravação de dados no service (`adicionarMateria`, `adicionarTopico`)
- limpeza dos campos após salvar
- atualização da lista ao voltar para a tela com `useFocusEffect`



Material da aula:

- [aulas/6_hooks.md](aulas/6_hooks.md)


### Aula 07 - Rotas com parâmetros, `useEffect` e `Picker`
A branch `aula-07-hooks` expande o uso de hooks e introduz navegação com parâmetros dinâmicos, carregamento de dados com `useEffect` e seleção com `Picker`.

Nesta etapa foram trabalhados:

- rotas dinâmicas no Expo Router: pasta = rota, `[id].tsx` = segmento dinâmico
- `useEffect`: conceito de efeito colateral, array de dependências (`[]`, `[valor]`, omitido)
- `Picker` do `@react-native-picker/picker`: `selectedValue`, `onValueChange`, `Picker.Item`

Material da aula:

- [aulas/7_hooks.md](aulas/7_hooks.md)


### Aula 08 - Hooks (parte 2): `find`, `?.` e `Picker` dependente
A branch `aula-08-hooks` resolve o exercício da aula anterior e aprofunda o uso de arrays e operadores de segurança do JavaScript.

Nesta etapa foram trabalhados:

- substituição do `TextInput` livre de matéria por `Picker` em `TelaNovoRegistro`
- `materiaId: number` como estado em vez de string — ids são estáveis, nomes podem mudar
- método `find` para buscar um objeto pelo id dentro de um array
- optional chaining `?.` para acesso seguro a propriedades que podem ser `undefined`
- nullish coalescing `??` como valor de fallback quando o resultado é `undefined` ou `null`
- exercício: filtro de tópicos por matéria em `TelaTopicos` com `useEffect` de dependência `[materiaId]`

Material da aula:

- [aulas/8_hooks.md](aulas/8_hooks.md)


### Aula 09 - Hooks (parte 3): CRUD numa tela só
A branch `aula-09-hooks` implementa o exercício da aula anterior e constrói uma tela com formulário, lista, edição e exclusão em um único componente.

Nesta etapa foram trabalhados:

- implementação do exercício da aula 8: filtro de tópicos por matéria em `TelaTopicos`
- `useEffect` encadeado em `TelaNovoRegistro`: seleção de matéria dispara carregamento dos tópicos
- `useEffect` com `[]` para carregar dados na montagem da tela
- estado `editandoId: number | null` para alternar entre modo criação e modo edição
- funções auxiliares `recarregar()` e `limparFormulario()` para isolar responsabilidades
- props `onEditar` e `onExcluir` como callbacks opcionais no `CartaoMateria`

Material da aula:

- [aulas/9_hooks.md](aulas/9_hooks.md)


### Aula 10 - Hooks (parte 4): rota com parâmetro opcional e `useFocusEffect`
A branch `aula-10-hooks` implementa o exercício da aula 9 (botão "Cancelar edição") e resolve o problema de usar a mesma tela para criar e editar um registro de estudo.

Nesta etapa foram trabalhados:

- botão "Cancelar edição" com renderização condicional (`editandoId !== null &&`)
- parâmetro opcional de rota via query string (`/registrar-estudo?id=3`) em vez de segmento dinâmico obrigatório (`[id].tsx`)
- leitura do parâmetro opcional com `useLocalSearchParams<{ id?: string }>()`
- decisão entre criar e atualizar com base na presença do `id`
- `useFocusEffect` + `useCallback` para recarregar a lista sempre que a tela ganha foco, resolvendo a limitação do `useEffect` com `[]` (que não roda de novo ao voltar de outra tela)
- atividade avaliativa: edição de registros de estudo, com renomeação de `TelaNovoRegistro` para `TelaRegistrarEstudo`

Material da aula:

- [aulas/10_hooks.md](aulas/10_hooks.md)


### Aula 11 - Firebase: configuração e Firestore
A branch `aula-11-firebase` introduz o Firebase como backend do projeto, com o Cloud Firestore explorado primeiro em um script isolado (`firebase-cli/`), fora do aplicativo.

Nesta etapa foram trabalhados:

- criação de projeto no console do Firebase e registro do app web
- ativação do Cloud Firestore em modo de teste
- instalação do SDK (`firebase`) e configuração de `services/firebase.ts` com `initializeApp` e `getFirestore`
- modelo de dados NoSQL orientado a documentos: coleção, documento, campo, comparação com o modelo relacional (tabela, linha, coluna)
- subcoleções como forma de modelar hierarquias
- operações do Firestore: `addDoc`, `setDoc`, `getDocs`, `getDoc`, `updateDoc`, `deleteDoc`
- `QuerySnapshot` e `DocumentSnapshot`: `.docs`, `.data()`, `.exists()`
- diferença entre `setDoc` (sobrescreve o documento) e `updateDoc` (mescla com o existente)
- filtros com `query` e `where`, incluindo múltiplos `where` encadeados
- por que `addDoc` recebe uma coleção enquanto `setDoc`/`updateDoc`/`deleteDoc` recebem uma referência de documento (`doc()`)
- atividade avaliativa (B3A1): implementação de `crud-topicos.js` e `crud-registros.js` seguindo o padrão de `crud-materias.js`, e elaboração de um plano de consistência para exclusões em cascata (inexistentes no Firestore)

Material da aula:

- [aulas/11_firebase.md](aulas/11_firebase.md)
- [aulas/11_firebase_atividade.md](aulas/11_firebase_atividade.md)


### Aula 12 - Firebase no aplicativo
A branch `aula-12-firebase` aplica dentro do app real o conhecimento explorado isoladamente na aula 11: o `MateriaService.ts` deixa de manter um array em memória e passa a ler e gravar diretamente na coleção `materias` do Firestore.

Nesta etapa foram trabalhados:

- a pasta `services` como fronteira entre a interface e a origem dos dados, permitindo trocar o array em memória pelo Firestore sem alterar as telas
- `types/Materia.ts` passando a representar também o formato de um documento da coleção `materias`, com `id` mudando de `number` para `string` (identificadores gerados pelo Firestore)
- refatoração do `MateriaService.ts` com `collection`, `doc`, `addDoc`, `getDoc`, `getDocs`, `updateDoc` e `deleteDoc`, e funções passando a retornar `Promise`


Material da aula:

- [aulas/12_firebase.md](aulas/12_firebase.md)


### Aula 13 - Usuários e login manual
A branch `aula-13-usuario` introduz o conceito de usuário no diário de estudos, cada matéria passa a pertencer a um `usuarioId`, e o login é implementado na mão (sem `Firebase Auth`) para deixar visível o problema que ele resolve mais adiante.


Material da aula:

- [aulas/13_usuario.md](aulas/13_usuario.md)
- [aulas/13_usuario_atividade.md](aulas/13_usuario_atividade.md)