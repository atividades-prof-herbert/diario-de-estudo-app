# C4-01 — Contexto (System Context)

Este diagrama mostra o sistema **Diário de Estudos** no contexto do usuário e dos serviços externos.

**O que este nível representa (C4 — System Context):**
- Mostra o **sistema como uma caixa única** (uma “caixa preta”).
- Identifica **pessoas** (usuários/atores) e **sistemas externos** (dependências/integrações) com os quais ele se relaciona.
- É o nível mais alto de abstração. Serve para alinhamento com stakeholders e para explicitar fronteiras.

[C4 Model - Contexto](https://c4model.com/diagrams/system-context)

### Para quem é útil

- Pessoas de produto (PO), clientes, professores/alunos e time técnico.
- Excelente para apresentação inicial do projeto e para “abrir” a conversa sobre integrações.

### Perguntas que este diagrama responde

- Quem usa o sistema?
- Quais são as principais integrações/dependências externas?
- O que está **dentro** do sistema e o que está **fora**?

### O que NÃO entra aqui (armadilhas comuns)

- Não detalhar telas, classes, módulos, pastas, e nem “como” o sistema funciona internamente.
- Evitar colocar muitos detalhes técnicos (isso é para Containers/Components).

### Como ler este diagrama

- Comece pelas **pessoas**.
- Identifique o **sistema** (a caixa principal).
- Siga as relações para os **sistemas externos** (ex.: Firebase Auth e Firestore).


