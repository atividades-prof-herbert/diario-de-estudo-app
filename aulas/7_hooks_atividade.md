# Aula 7 — Exercício

## `TelaNovoRegistro`: substituir `TextInput` por `Picker`

A `TelaNovoRegistro` tem um `TextInput` livre para "Nome da matéria". Aplique o mesmo padrão da seção 5 de [7_hooks.md](7_hooks.md).

**O que fazer:**

1. Importe `Picker` de `'@react-native-picker/picker'`.
2. Importe `useEffect` junto com `useState`.
3. Importe `listarMaterias` de `'../services/MateriaService'` e o type `Materia`.
4. Troque o estado `materia: string` por `materiaId: number` (inicial `0`).
5. Crie o estado `materias` e carregue com `useEffect`.
6. Substitua o `TextInput` de matéria pelo `Picker` com `value={m.id}`, seguindo o padrão da seção 5.
7. Ajuste a validação para `!materiaId` e passe `materiaId` ao salvar.
