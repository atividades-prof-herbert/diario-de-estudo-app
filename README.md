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