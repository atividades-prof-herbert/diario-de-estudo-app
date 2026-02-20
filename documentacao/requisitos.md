# Requisitos — Diário de Estudos

**Origem:** `documentacao/visao.md`  
**Data:** 19/02/2026

## Lista de requisitos (tabela)

> Convenções:
> - **Tipo:** RF (Funcional) / RNF (Não Funcional)
> - **Prioridade:** Must (MVP) / Should (importante) / Could (desejável)

| ID | Tipo | Nome | Descrição | Prioridade | Critério de aceite (resumo) |
|---|---|---|---|---|---|
| RF-01 | RF | Cadastrar matéria | Permitir criar uma matéria com nome e descrição opcional. | Must | Criar matéria com validação de nome obrigatório e persistir. |
| RF-02 | RF | Listar matérias | Exibir lista de matérias cadastradas. | Must | Listagem retorna matérias com dados básicos (nome/descrição). |
| RF-03 | RF | Editar matéria | Permitir atualizar dados de uma matéria existente. | Must | Alterações são salvas e refletidas nas consultas. |
| RF-04 | RF | Remover matéria | Permitir excluir uma matéria. | Must | Matéria é removida com comportamento definido para dependências (tópicos/registros). |
| RF-05 | RF | Cadastrar tópico | Permitir criar tópico vinculado a uma matéria. | Must | Criar tópico com matéria associada e nome obrigatório. |
| RF-06 | RF | Listar tópicos por matéria | Exibir tópicos de uma matéria selecionada. | Must | Listagem filtrada por matéria correta. |
| RF-07 | RF | Editar tópico | Permitir atualizar dados de um tópico existente. | Must | Alterações são salvas e refletidas nas consultas. |
| RF-08 | RF | Remover tópico | Permitir excluir um tópico. | Must | Tópico é removido com comportamento definido para registros vinculados. |
| RF-09 | RF | Criar registro de estudo | Criar registro associado a uma **matéria OU tópico**, com data, duração e métricas de questões. | Must | Registro deve obedecer às regras RN-01, RN-02 e RN-03. |
| RF-10 | RF | Definir data do estudo | A data do registro deve ser preenchida com “hoje” por padrão e ser editável. | Must | Ao criar, data vem preenchida; usuário pode alterar. |
| RF-11 | RF | Informar duração | Permitir registrar duração do estudo em minutos ou HH:MM (armazenar em minutos). | Must | Duração válida e convertida/persistida em minutos. |
| RF-12 | RF | Informar questões | Permitir registrar questões feitas e corretas (inteiros). | Must | Validações de não-negativo e corretas ≤ feitas. |
| RF-13 | RF | Observações no registro | Permitir observação textual opcional no registro de estudo. | Could | Campo opcional não bloqueia o salvamento. |
| RF-14 | RF | Consultar histórico | Listar registros de estudo por período (dia/semana/mês). | Must | Filtros por período retornam registros corretos em ordem consistente. |
| RF-15 | RF | Resumo por matéria | Exibir resumo por matéria: tempo total, questões, acertos e taxa de acerto quando aplicável. | Must | Valores agregados batem com os registros do período selecionado. |
| RF-16 | RF | Resumo por tópico | Exibir resumo por tópico: tempo total, questões, acertos e taxa de acerto quando aplicável. | Must | Valores agregados batem com os registros do período selecionado. |
| RF-17 | RF | Calcular taxa de acerto | Calcular taxa de acerto = acertos/feitas quando feitas>0. | Must | Se feitas==0, taxa deve ser N/A (ou não exibida). |

## Regras de negócio

### RN-01 — Vínculo do registro
- Um registro de estudo deve estar associado **a exatamente um** destes:
  - **Matéria**; ou
  - **Tópico**.

### RN-02 — Consistência de questões
- `questoes_feitas` deve ser inteiro `>= 0`.
- `questoes_corretas` deve ser inteiro `>= 0`.
- `questoes_corretas <= questoes_feitas`.

### RN-03 — Duração
- Duração deve ser positiva quando informada.
- Recomenda-se padronizar duração em **minutos** no armazenamento.

### RN-04 — Taxa de acerto
- Se `questoes_feitas == 0`, a taxa de acerto deve aparecer como **N/A** (ou não ser exibida como percentual).
