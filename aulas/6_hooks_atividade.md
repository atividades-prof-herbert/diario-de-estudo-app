# Aula 6 — Exercícios

## Exercício 1 — `TelaNovoRegistro`: inputs controlados e alerta

A `TelaNovoRegistro` tem quatro `TextInput` sem estado, assim, o app não lê o que o usuário digita. Aplique o mesmo padrão das telas anteriores.

**O que fazer:**

1. Importe `useState` de `'react'`.
2. Crie um estado para cada campo: `materia`, `topico`, `descricao` e `data`, todos iniciando com `''`.
3. Conecte cada `TextInput` ao seu estado com `value` e `onChangeText`.
4. Extraia a função `salvar` do `onPress` do botão.
5. Dentro de `salvar`, valide se `materia` e `topico` estão preenchidos; se não, mostre um alerta e retorne.
6. Se estiver tudo preenchido, exiba os dados com `mostrarAlerta`.

---

## Exercício 2 — `TelaNovoTopico`: gravando no service e atualizando a lista

A `TelaNovoTopico` já tem `useState` e validação. O próximo passo é persistir o dado no `TopicoService` e verificar que a `TelaTopicos` reflete a mudança.

**O que fazer:**

1. Importe `adicionarTopico` de `'../services/TopicoService'`.
2. Dentro de `salvar`, após as validações, chame:
   ```tsx
   adicionarTopico({ nome, materia, concluido });
   ```
3. Após a chamada, exiba o alerta de sucesso com os dados e limpe os campos.
