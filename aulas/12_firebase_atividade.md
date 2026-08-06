# Aula 12 — Atividade

`TopicoService.ts` e `RegistroService.ts` ainda mantêm seus arrays em memória, como o `MateriaService.ts` antes desta aula. A atividade é repetir, para `Topico` e depois para `Registro`, exatamente a mesma refatoração feita em [12_firebase.md](12_firebase.md) para `Materia`: trocar o array em memória por operações reais no Firestore, nas coleções `topicos` e `registros`.

Siga a mesma ordem usada no material da aula: primeiro os `types`, depois o `service`, depois as telas.

## 1. Ajustar os types

Em `types/Topico.ts` e `types/Registro.ts`, o campo `id` precisa deixar de ser `number` e passar a ser `string`, pelo mesmo motivo explicado na seção "O `id` numérico virou texto": o Firestore gera seus próprios identificadores de documento, e eles são strings.

Preste atenção também aos campos que referenciam outra entidade: `materiaId` (em ambos os types) já é `string` desde a migração de `Materia` e não muda. Já `topicoId` em `Registro.ts`, hoje `number`, referencia o `id` de um `Topico` e por isso também precisa virar `string`.

## 2. Reescrever o service

Em `TopicoService.ts` e `RegistroService.ts`, substitua o array `db` e o contador `proximoId` por chamadas ao Firestore, seguindo o padrão de `MateriaService.ts`: `collection`, `doc`, `addDoc`, `getDoc`, `getDocs`, `updateDoc` e `deleteDoc`, importados de `firebase/firestore`, usando o mesmo `db` exportado por `./firebase`.

Cada função passa a retornar uma `Promise`, já que toda operação do Firestore é assíncrona. Vale conferir se algum campo opcional do tipo (como `descricao` ou `topicoId` em `Registro`) pode ser enviado como `undefined`; como visto no material da aula, isso já está coberto pela configuração `ignoreUndefinedProperties` em `firebase.ts`, então nenhum tratamento extra é necessário para esse caso.

## 3. Ajustar as telas que consomem esses services

As telas que chamam `TopicoService` e `RegistroService` (`TelaTopicos.tsx`, `TelaTopicosMateria.tsx`, `TelaNovoTopico.tsx`, `TelaRegistro.tsx`, `TelaNovoRegistro.tsx`) precisam se ajustar às funções assíncronas, do mesmo jeito descrito na seção "O efeito cascata": chamadas dentro de `useEffect` passam a usar uma função `async` interna com `await`, e funções de salvar, concluir ou excluir passam a aguardar a operação do Firestore antes de recarregar a lista.

Preste atenção especial a qualquer lugar que hoje chama `buscarTopicoPorId(...)` ou `buscarRegistroPorId(...)` de forma síncrona dentro de um `.map()`, e a qualquer `Picker` ou comparação que ainda trate `id`, `materiaId` ou `topicoId` como número (por exemplo, usando `0` como sentinela de "nenhum selecionado"). Esses pontos precisam do mesmo ajuste já feito para `Materia`: carregar a lista uma vez em estado e usar `''` como sentinela em vez de `0`.

## Critério de conclusão

Ao final, criar, listar, editar e excluir tópicos e registros deve funcionar diretamente contra as coleções `topicos` e `registros` do Firestore, sem nenhum array em memória restando em `TopicoService.ts` ou `RegistroService.ts`.

## Envio da atividade

Pasta B3A2 no repositório individual do Github.

## Atenção

Ainda não implementamos o plano de integridade elaborado na atividade anterior.
