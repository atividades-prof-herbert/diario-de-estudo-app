# Aula 10 — Hooks (parte 4)

## Implementação do exercício da aula anterior

O exercício da aula 9 pedia um botão **Cancelar edição** que só aparecesse quando o formulário estivesse no modo de edição, permitindo ao usuário desistir da edição e voltar ao modo de criação sem sair da tela.

### Problema

Estando no modo de edição (`editandoId !== null`), não havia como o usuário abandonar a edição e cadastrar uma nova matéria sem navegar para fora da tela e voltar. Faltava um caminho visual para sair do modo de edição.

### Solução

Renderização condicional com o operador `&&`: o botão só existe no layout quando `editandoId !== null`. Ao ser pressionado, chama `limparFormulario()`, que já zera os campos e redefine `editandoId` para `null`.

```tsx
{editandoId !== null && (
  <TouchableOpacity style={estilos.botaoCancelar} onPress={limparFormulario}>
    <Text style={estilos.botaoCancelarTexto}>Cancelar edição</Text>
  </TouchableOpacity>
)}
```


- [TelaNovaMateria.tsx](../app-diario/src/telas/TelaNovaMateria.tsx) : botão cancelar com renderização condicional

---


