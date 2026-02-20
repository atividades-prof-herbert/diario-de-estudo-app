# C4-03 — Componentes (App Expo/React Native)

Este diagrama detalha componentes internos do **App Mobile** relevantes para desenvolvimento.

**O que este nível representa (C4 — Component):**
- Decompõe **um container específico** em componentes (módulos/serviços internos).
- Mostra responsabilidades e dependências principais.
- Útil para dividir trabalho, organizar pastas/camadas e orientar testes.
- Responde: “Como o container é estruturado internamente?”

### O que é “componente” no C4 (e o que não é)

No C4, componente é uma unidade de software **coesa** dentro de um container. Em um app React Native, exemplos típicos:

- módulo de autenticação
- camada de repositórios (acesso ao Firestore)
- serviços de domínio (validações, cálculos, agregações)
- telas (screens) e componentes de UI (quando o objetivo é mapear responsabilidades)

**Não precisa** ser 1:1 com cada arquivo. A intenção é mapear partes que:
- têm responsabilidade clara;
- podem ser testadas/separadas;
- têm dependências relevantes.

### Para quem é útil

- Desenvolvedores e QA (planejamento de testes), e professores (divisão de temas em aula).
- Excelente para definir “quem chama quem” e onde colocar regras.

### Perguntas que este diagrama responde

- Quais são os principais módulos internos e suas responsabilidades?
- Onde ficam regras de negócio, validações e acesso a dados?
- Quais dependências internas e externas existem?

### O que NÃO entra aqui (armadilhas comuns)

- Não detalhar métodos/linhas de código (isso vira diagrama de classe/sequence ou documentação de API).
- Evitar representação de todos os componentes minúsculos; prefira os que ajudam o entendimento.