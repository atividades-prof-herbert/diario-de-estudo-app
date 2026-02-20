# Visão do Produto/Projeto — Diário de Estudos

**Projeto:** Diário de Estudos

**Data:** 19/02/2026

## 1. Contexto e problema

Estudar com consistência exige planejamento e, principalmente, acompanhamento do esforço e do resultado. Na prática, muitos estudantes e concurseiros:

- não têm clareza do que precisam estudar (matérias e tópicos);
- não registram o que foi estudado e quanto tempo dedicaram;
- não acompanham evolução por desempenho (questões feitas vs. acertos);
- perdem histórico e não conseguem identificar onde estão melhorando ou com dificuldade.

O **Diário de Estudos** é um aplicativo para organizar o conteúdo a estudar e registrar cada sessão de estudo com métricas simples (tempo e questões), permitindo acompanhar progresso ao longo do tempo.

## 2. Objetivo do produto

Disponibilizar um diário digital que permita:

1. **Cadastrar e organizar matérias** que precisam ser estudadas.
2. **Cadastrar tópicos** dentro de cada matéria.
3. **Registrar estudos** por matéria ou por tópico, informando:
   - tempo estudado;
   - quantidade de questões feitas;
   - quantidade de questões corretas.
4. **Consultar histórico e indicadores** para acompanhar evolução.

## 3. Público-alvo (personas)

### Persona 1 — Estudante (Ensino Médio/Faculdade)
- Quer manter rotina e controlar conteúdos por disciplina.
- Precisa de um registro rápido do que estudou no dia.

### Persona 2 — Concurseiro
- Estuda várias matérias e muitos tópicos específicos.
- Quer medir rendimento por questões e identificar fraquezas.

### Persona 3 — Profissional em Certificações
- Estuda em ciclos e precisa de dados para ajustar o plano.
- Dá valor a relatórios simples e comparativos.

## 4. Proposta de valor

- **Organização clara:** matérias → tópicos.
- **Registro rápido:** lançar sessões de estudo em poucos campos.
- **Métricas úteis:** tempo e desempenho em questões.
- **Evolução visível:** histórico e resumos por período.

## 5. Escopo do produto

### 5.1 MVP (primeira versão)

**Cadastro e gestão de conteúdo**
- CRUD de matérias (criar, listar, editar, remover).
- CRUD de tópicos por matéria.

**Registro de estudo**
- Criar registro de estudo associado **a uma matéria** _ou_ **a um tópico**.
- Campos mínimos do registro:
  - data (ex.: padrão “hoje”, editável);
  - duração do estudo (em minutos ou HH:MM);
  - questões feitas (inteiro ≥ 0);
  - questões corretas (inteiro ≥ 0 e ≤ questões feitas);
  - observações (opcional).

**Consultas e visões**
- Listar registros por período (dia/semana/mês).
- Resumo por matéria e por tópico:
  - tempo total;
  - total de questões;
  - total de acertos;
  - taxa de acerto (%), quando houver questões.

### 5.2 Fora do escopo do MVP (evoluções)

- Autenticação e múltiplos usuários.
- Metas (por tempo/questões) e alertas.
- Ciclos de estudo e planejamento por cronograma.
- Importação/exportação (CSV/Excel).
- Dashboards avançados (tendência, comparativos).
- Gamificação (streaks, conquistas).



## 6. Jornada do usuário (fluxo principal)

1. Usuário cadastra uma ou mais matérias.
2. Para cada matéria, cadastra tópicos.
3. Ao estudar, abre “Novo registro” e escolhe matéria ou tópico.
4. Informa duração e, se aplicável, questões feitas e corretas.
5. Consulta histórico e resumos para avaliar progresso.



**Versão do documento:** 1.0
