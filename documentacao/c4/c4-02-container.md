# C4-02 — Containers

Este diagrama detalha os principais **containers** (grandes blocos executáveis) do sistema.

**O que este nível representa (C4 — Container):**
- Decompõe o sistema em **containers** (aplicações, serviços, bancos, etc.).
- Cada container costuma ser algo que pode ser **executado/deploy** separadamente.
- Mostra **tecnologias** e **comunicação** entre containers.
- Responde: “Quais são as aplicações/serviços que compõem o sistema?”

### O que é “container” no C4

No C4, “container” **não significa Docker**. É um termo genérico para um “recipiente de execução” de software, por exemplo:

- um app mobile
- um front-end web
- uma API/serviço
- um banco de dados
- um sistema de mensageria

### Para quem é útil

- Time de desenvolvimento, arquitetura e devops.
- Ajuda a dividir responsabilidade, estimar trabalho e planejar deploy.

### Perguntas que este diagrama responde

- Quais aplicações/serviços compõem o sistema?
- Quais tecnologias cada parte usa?
- Como os containers se comunicam (protocolos, SDKs, integrações)?
- Onde ficam os dados (qual é o data store)?

### Dicas de modelagem

- Um container deve ter um nome claro, uma responsabilidade e uma tecnologia.
- Se existe um serviço externo crítico (como Firebase), colocá-lo como **System_Ext** é adequado.

### O que NÃO entra aqui (armadilhas comuns)

- Não detalhar funções internas, hooks, classes ou componentes de UI (isso é do nível Component).
- Evitar desenhar “fluxos de tela” aqui.


