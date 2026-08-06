# Aula 9 — Hooks (parte 3)

## Implementação do exercício da aula anterior

- [TelaTopicos.tsx](../app-diario/src/telas/TelaTopicos.tsx) — `useEffect` com dependência para filtrar tópicos por matéria

## Implementando o Picker de tópicos dependente de matéria

- [TelaNovoRegistro.tsx](../app-diario/src/telas/TelaNovoRegistro.tsx) — `useEffect` com dependência encadeada (matéria → tópicos)

---

## O que vamos construir hoje

Uma tela que faz tudo em um só lugar:

1. Cadastrar matéria
2. Editar matéria: ao clicar em **Editar**, o formulário é preenchido com os dados do item
3. Excluir matéria: ao clicar em **Excluir**, aparece um alerta de confirmação
4. Listar as matérias cadastradas


---

## 1. O que precisamos para implementar o editar?

Antes de escrever código, vamos pensar no que o editar exige.

**O que precisamos ter?**

O **ID** do item sendo editado. Sem ele, não sabemos qual registro atualizar.

**O que fazemos com o ID?**

Guardamos em um estado. Esse estado tem dois possíveis valores:

- `null`: não estamos editando nada (modo criação)
- `número`: estamos editando o item com aquele ID

**O que precisamos fazer em cada momento?**

| Momento | Ação |
|---|---|
| Usuário clica em Editar | Preencher o formulário com os dados do item + guardar o ID no estado |
| Usuário clica em Salvar | Se tem ID: atualizar; se não tem: criar |
| Após salvar ou cancelar | Limpar o formulário + zerar o ID |


---

## 2. Mantendo a lista atualizada após mutações

O `useEffect` com `[]` roda uma vez. Para que a lista reflita as mudanças (salvar, editar, excluir), criamos duas funções auxiliares:

```tsx
function recarregar() {
  setMaterias(listarMaterias());
}

function limparFormulario() {
  setNome('');
  setDescricao('');
  setCorDestaque('');
  setEditandoId(null);
}
```

Chamamos `recarregar()` sempre que os dados mudam. O React re-renderiza a lista automaticamente porque o estado `materias` mudou. Já `limparFormulario()` reseta todos os campos e sai do modo de edição de uma vez.

---

## 3. Estado para controlar se estamos editando

```tsx
const [editandoId, setEditandoId] = useState<number | null>(null);
```

- `null`: modo de criação
- `número`: modo de edição do item com aquele ID

Esse único estado controla o comportamento do botão **e** o título da tela:

```tsx
<Cabecalho titulo={editandoId !== null ? 'Editar matéria' : 'Nova matéria'} />

<TouchableOpacity onPress={salvar}>
  <Text>{editandoId !== null ? 'Salvar alterações' : 'Salvar matéria'}</Text>
</TouchableOpacity>
```

---

## 4. Função `editar`: preenche o formulário

Quando o usuário clica em Editar, recebemos o objeto `Materia` completo e preenchemos cada campo:

```tsx
function editar(materia: Materia) {
  setNome(materia.nome);
  setDescricao(materia.descricao);
  setCorDestaque(materia.corDestaque ?? '');
  setEditandoId(materia.id); // ativa o modo edição
}
```

O `?? ''` garante que, se `corDestaque` for `undefined`, o campo receba uma string vazia em vez de `undefined`.

---

## 5. Função `salvar`: cria ou atualiza

Com `editandoId`, a mesma função serve para os dois casos:

```tsx
function salvar() {
  if (!nome.trim()) {
    mostrarAlerta('Campo obrigatório', 'Informe o nome da matéria.');
    return;
  }

  if (editandoId !== null) {
    atualizarMateria(editandoId, { nome, descricao, corDestaque: corDestaque || undefined });
  } else {
    adicionarMateria({ nome, descricao, corDestaque: corDestaque || undefined });
  }

  limparFormulario();
  recarregar();
}
```

---

## 6. O que precisamos para implementar o excluir?

**O que precisamos ter?**

O **ID** do item a excluir e, opcionalmente, o nome, para exibir na mensagem de confirmação.


**O que acontece em cada momento?**

| Momento | Ação |
|---|---|
| Usuário clica em Excluir | Exibir alerta com botões "Cancelar" e "Confirmar" |
| Usuário confirma | Remover o item + recarregar a lista |
| Usuário cancela | Não fazer nada |



---

## 8. Passando callbacks para o CartaoMateria

O componente `CartaoMateria` recebe `onEditar` e `onExcluir` como props opcionais. Como são funções, o tipo é `() => void`:

```tsx
type CartaoMateriaProps = {
  nome: string;
  descricao: string;
  corDestaque?: string;
  onEditar?: () => void;  
  onExcluir?: () => void;
};
```


```tsx
materias.map((m) => (
  <CartaoMateria
    key={m.id}
    nome={m.nome}
    descricao={m.descricao}
    corDestaque={m.corDestaque}
    onEditar={() => editar(m)}
    onExcluir={() => excluir(m.id, m.nome)}
  />
))
```


---

## Exercícios

Os exercícios desta aula foram movidos para [9_hooks_atividade.md](9_hooks_atividade.md).

---

## Arquivos de referência

- [TelaNovaMateria.tsx](../app-diario/src/telas/TelaNovaMateria.tsx) — tela principal da aula: formulário + lista + editar + excluir
- [CartaoMateria.tsx](../app-diario/src/componentes/CartaoMateria.tsx) — cartão atualizado com botões de ação
- [alerta.ts](../app-diario/src/utils/alerta.ts) — utilitário de alertas, incluindo o novo `confirmarAlerta`
