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

## Parâmetro opcional de rota — mesma tela para criar e editar

### O problema

A `TelaRegistrarEstudo` será usada em dois contextos:

- Criar novo registro: sem id — os campos chegam vazios
- Editar registro existente: com id — os campos chegam preenchidos

O padrão ensinado na aula 7 usa segmentos dinâmicos no nome do arquivo (`[id].tsx`). Esse id faz parte da URL e é **obrigatório** — não é possível navegar para `/registrar-estudo/` sem ele. Logo, esse padrão não serve para uma tela que precisa funcionar nos dois modos.

### A solução: query string

Em vez de colocar o id no caminho da rota, passamos como **query string** — o trecho após o `?` na URL. Esse trecho é sempre opcional: se não for informado, simplesmente não existe.

```
/registrar-estudo        → criação (sem parâmetro)
/registrar-estudo?id=3   → edição do registro 3
```

A navegação fica assim:

```tsx
// Criação — navega sem parâmetro
router.push('/registrar-estudo');

// Edição — passa o id como query string
router.push('/registrar-estudo?id=' + registro.id);
```

### Lendo o parâmetro na tela destino

O `useLocalSearchParams` (visto na aula 7) lê tanto segmentos dinâmicos quanto query string. A diferença é que agora o `id` pode chegar como `string` ou como `undefined`:

```tsx
import { useLocalSearchParams } from 'expo-router';

const { id } = useLocalSearchParams<{ id?: string }>();
```

Com isso, basta verificar se o `id` veio para saber em qual modo a tela está:

```tsx
const modoEdicao = id !== undefined;
```

### Carregando os dados no modo edição

Se `id` existir, usamos `buscarRegistroPorId` dentro de um `useEffect` para pré-preencher os campos:

```tsx
useEffect(() => {
  if (id) {
    const registro = buscarRegistroPorId(Number(id));
    if (registro) {
      setMateriaId(registro.materiaId);
      setTopicoId(registro.topicoId ?? 0);
      setDescricao(registro.descricao ?? '');
      setData(registro.data);
    }
  }
}, [id]);
```

### Salvando: criar ou atualizar

Com o `id` disponível, a função `salvar` decide qual operação executar:

```tsx
function salvar() {
  // validações...

  if (id) {
    atualizarRegistro(Number(id), { materiaId, topicoId, descricao, data });
  } else {
    adicionarRegistro({ materiaId, topicoId, descricao, data });
  }

  router.back();
}
```

---

## `useFocusEffect` — recarregar dados ao voltar para uma tela

### O problema

O `useEffect` com `[]` executa uma única vez: quando o componente é montado. Se o usuário navegar para outra tela, fizer uma alteração e voltar, o `useEffect` **não executa de novo** — a tela já estava montada, não foi desmontada. A lista permanece desatualizada.

```
TelaRegistros (lista carregada)
    └─ router.push → TelaRegistrarEstudo (salva update)
          └─ router.back() → TelaRegistros (useEffect [] não roda de novo → lista antiga)
```

### A solução: `useFocusEffect`

O `useFocusEffect` executa o efeito toda vez que a tela **ganha foco** — inclusive quando o usuário volta de outra tela. É o hook certo para sincronizar dados com a tela que está visível no momento.

Para usá-lo, os dados precisam estar em estado (`useState`). Se a tela carrega a lista diretamente (`const registros = listarRegistros()`), é necessário converter para estado primeiro:

```tsx
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { listarRegistros } from '../services/RegistroService';
import { Registro } from '../types/Registro';

// 1. Estado para guardar a lista
const [registros, setRegistros] = useState<Registro[]>([]);

// 2. useFocusEffect recarrega sempre que a tela ganha foco
useFocusEffect(
  useCallback(() => {
    setRegistros(listarRegistros());
  }, [])
);
```

O `useCallback` é obrigatório aqui: o `useFocusEffect` exige que a função passada seja estável entre renderizações. Sem ele, o efeito entraria em loop infinito.

### Comparativo

| Hook | Quando executa |
|---|---|
| `useEffect(() => ..., [])` | Uma vez, ao montar o componente |
| `useFocusEffect(useCallback(..., []))` | Toda vez que a tela ganha foco |

### Quando usar cada um

- `useEffect` com `[]`: dados que não mudam enquanto a tela está aberta (ex.: carregar opções de um Picker que não vão ser alteradas em outra tela).
- `useFocusEffect`: listas que podem ser modificadas por outras telas e precisam estar sempre atualizadas ao voltar.

---

## Atividade avaliativa

A atividade avaliativa desta aula foi movida para [10_hooks_atividade.md](10_hooks_atividade.md).
