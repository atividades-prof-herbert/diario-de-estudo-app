# Exercício Prático — Componentes e Composição

---

## Contexto

Você foi contratado(a) para criar o protótipo de um **app de cartão de visita digital**. O app deve exibir na tela as informações de um profissional: nome, profissão, e-mail e uma breve descrição.

Utilize apenas os conceitos vistos em aula: criação de projeto, estrutura de arquivos, componentes e composição de componentes.

---

## Etapa 1 — Projeto e Estrutura

1. Crie um novo projeto React Native com o nome `CartaoVisita`.
2. Dentro da pasta `src/` (crie se não existir), crie uma subpasta chamada `components/`.
3. Certifique-se de que o projeto roda corretamente antes de continuar.

**Estrutura esperada:**

```
CartaoVisita/
├── src/
│   └── components/
│       ├── Cabecalho.tsx
│       ├── InfoProfissional.tsx
│       └── Rodape.tsx
├── App.tsx
└── ...
```

---

## Etapa 2 — Criação dos Componentes

Crie os três componentes abaixo, cada um no seu próprio arquivo dentro de `src/components/`. Os dados devem estar escritos diretamente no código (sem props por enquanto).

### Cabecalho.tsx

- Exibe o **nome completo** do profissional em destaque (use seu próprio nome ou um fictício) e a **profissão** logo abaixo.



### InfoProfissional.tsx

- Exibe o **e-mail de contato** e uma **breve descrição** do profissional (2 a 3 frases sobre habilidades ou objetivos).

### Rodape.ts

- Exibe uma mensagem fixa, como *"Entre em contato!"* ou o ano atual.

> Cada componente deve ter sua própria função `export default`.

---

## Etapa 3 — Composição em App.tsx


## Etapa 4 — Extra

Para quem terminar as etapas anteriores:

- Crie um quarto componente chamado `Habilidades.js` que exibe uma lista de pelo menos 3 tecnologias que você conhece ou quer aprender, usando vários `Text` dentro de uma `View`.
- Inclua-o no `App.js` entre o `InfoProfissional` e o `Rodape`.


---

