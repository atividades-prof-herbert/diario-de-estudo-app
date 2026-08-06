# B3A1 — CRUD no Firestore: Tópicos e Registros

**Disciplina:** Tópicos Especiais em Programação  
**Entrega:** pasta `B3A1/` dentro do repositório da disciplina

---

## Contexto

Na aula 11 foi implementado o `crud-materias.js`. O projeto do diário de estudo possui mais duas entidades: **tópicos** e **registros de estudo**, ambas com relacionamento com matérias.

Esta atividade consiste em implementar os services equivalentes para essas duas coleções, respeitando os relacionamentos entre elas.

---

## Modelo de dados

As três coleções do projeto e seus campos:

**materias**
| campo | tipo | descrição |
|---|---|---|
| nome | string | nome da matéria |
| descricao | string | descrição opcional |
| corDestaque | string | cor em hex, opcional |

**topicos**
| campo | tipo | descrição |
|---|---|---|
| nome | string | nome do tópico |
| materiaId | string | ID do documento em `materias` |
| concluido | boolean | se o tópico foi concluído |

**registros**
| campo | tipo | descrição |
|---|---|---|
| materiaId | string | ID do documento em `materias` |
| topicoId | string | ID do documento em `topicos`, opcional |
| descricao | string | descrição do que foi estudado, opcional |
| data | string | data do registro no formato `YYYY-MM-DD` |

### Chave estrangeira no Firestore

O Firestore não possui o conceito de chave estrangeira. Os campos `materiaId` e `topicoId` são apenas strings e o banco não verifica se o documento referenciado existe. A responsabilidade de manter a consistência dos relacionamentos é do código da aplicação.

---

## O que implementar

### 1. `firebase-cli/service/crud-topicos.js`

Implemente as seguintes funções, seguindo o mesmo padrão do `crud-materias.js`:

| Função | Operação Firestore | Observação |
|---|---|---|
| `adicionarTopico(dados)` | `addDoc` | |
| `definirTopico(id, dados)` | `setDoc` | |
| `listarTopicos()` | `getDocs` | retorna todos |
| `listarTopicosPorMateria(materiaId)` | `getDocs` + `query` + `where` | filtra por `materiaId` |
| `buscarTopico(id)` | `getDoc` | |
| `atualizarTopico(id, dados)` | `updateDoc` | |
| `removerTopico(id)` | `deleteDoc` | |

### 2. `firebase-cli/service/crud-registros.js`

Implemente as seguintes funções:

| Função | Operação Firestore | Observação |
|---|---|---|
| `adicionarRegistro(dados)` | `addDoc` | |
| `listarRegistros()` | `getDocs` | retorna todos |
| `listarRegistrosPorMateria(materiaId)` | `getDocs` + `query` + `where` | filtra por `materiaId` |
| `buscarRegistro(id)` | `getDoc` | |
| `atualizarRegistro(id, dados)` | `updateDoc` | |
| `removerRegistro(id)` | `deleteDoc` | |

### 3. Funções de teste e execução

Cada arquivo deve conter funções de teste para todas as operações, e um `main()` que as execute em sequência, demonstrando o funcionamento completo incluindo as buscas por `materiaId`.

---

## Plano de consistência

O Firestore não realiza exclusão em cascata. Se uma matéria for removida, os tópicos e registros que referenciam aquela matéria continuam existindo no banco como registros órfãos.

Como parte desta atividade, elabore um plano em alto nível descrevendo como você manteria a consistência do banco em cada cenário abaixo. O plano deve ser escrito em um arquivo `plano-consistencia.md` dentro da pasta `B3A1/`, em texto (**sem código**).

Descreva o que precisaria acontecer, em ordem, para cada operação:

1. **Remover uma matéria**: o que fazer com os tópicos e registros vinculados a ela?
2. **Remover um tópico**: o que fazer com os registros vinculados a ele?
3. **Remover um registro**: há alguma dependência a considerar?

Não é necessário implementar o cascade nesta atividade, apenas descrever o plano.


