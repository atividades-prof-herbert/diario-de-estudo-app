# Aula 13 — Atividade

## Registros de estudo por usuário

`TelaRegistro` ainda lista **todos** os registros de estudo do banco, de qualquer usuário — igual funcionava `TelaTopicos` antes desta aula. A atividade é aplicar a mesma ideia (o "join" manual descrito em [13_usuario.md](13_usuario.md)) para que cada usuário veja só os próprios registros.

`Registro` não ganha um `usuarioId` próprio — segue a mesma modelagem normalizada usada para `Topico`: a posse é descoberta a partir de `materiaId`, que aponta para uma matéria, que por sua vez tem `usuarioId`.
