# Aula 3 — Exercício Prático

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
