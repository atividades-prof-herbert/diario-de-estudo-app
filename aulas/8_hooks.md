# Aula 8 — Solução: `Picker` com `find` em `TelaNovoRegistro`

---

## 1. O que mudou na tela

O exercício final da aula 7 pediu para substituir o `TextInput` livre de matéria por um `Picker`. O campo deixou de armazenar um texto digitado e passou a armazenar o **id** da matéria selecionada.

```
Antes:  estado materia: string  →  TextInput livre
Depois: estado materiaId: number  →  Picker com itens do service
```

Com isso, o usuário só pode selecionar uma matéria que existe de fato no sistema — não há mais risco de digitar "Matematica" (sem acento) e não bater com "Matemática" no banco de dados.

---

## 2. O Picker guarda o `id`.

Quando o usuário seleciona "Matemática" no Picker, o estado `materiaId` recebe o valor `1` — não a string `"Matemática"`. Isso é intencional: ids são estáveis, nomes podem mudar.

Mas o `mostrarAlerta` precisa exibir o **nome** da matéria para o usuário. Então, na hora de salvar, precisamos responder a uma pergunta:

> "Dado o id que está no estado, qual é o nome da matéria correspondente?"

A resposta está no próprio vetor `materias` que já carregamos com `useEffect`. Basta procurar dentro dele.

```tsx
const materia = materias.find((m) => m.id === materiaId);
mostrarAlerta('Registro salvo!', 'Matéria: ' + (materia?.nome ?? ''));
```

---

## 3. O método `find` do JavaScript

`find` percorre um array e retorna o **primeiro elemento** que satisfaz uma condição. Se nenhum elemento satisfizer, retorna `undefined`.

```ts
const materia = materias.find((m) => m.id === materiaId);
```

Lendo em português: "percorra `materias`; para cada item `m`, verifique se `m.id` é igual a `materiaId`; retorne o primeiro que for."

### Comparativo com Java

Em Java, a busca equivalente seria escrita com um laço `for` tradicional:

```java
// Java — busca por id com laço manual
Materia encontrada = null;
for (int i = 0; i < materias.size(); i++) {
    if (materias.get(i).getId() == materiaId) {
        encontrada = materias.get(i);
        break;
    }
}
```

Em JavaScript, o `find` faz exatamente a mesma coisa em uma linha:

```ts
// JavaScript — mesma busca com find
const encontrada = materias.find((m) => m.id === materiaId);
```



A lógica é idêntica: percorrer o vetor item por item, comparar, parar no primeiro match. O `find` apenas esconde o laço, tornando a intenção mais legível.

### O `?.` após o resultado

Como `find` pode retornar `undefined` (se nenhum item bater), acessar `.nome` direto causaria erro. O operador `?.` protege esse acesso:

```ts
materia?.nome   // retorna undefined se materia for undefined, em vez de lançar erro
```

O `?? ''` garante que, mesmo assim, o alerta receba uma string vazia em vez de `undefined`:

```ts
materia?.nome ?? ''
```

---


## Exercício — Filtro por matéria em `TelaTopicos`

### Situação atual

A `TelaTopicos` carrega todos os tópicos com `listarTopicos()` e os exibe em lista única. Não há como filtrar por matéria.

```tsx
const [topicos, setTopicos] = useState<Topico[]>([]);

useFocusEffect(
  useCallback(() => {
    setTopicos(listarTopicos());
  }, [])
);
```

### O que fazer

Adicionar um `Picker` de matéria no topo da tela. Quando o usuário selecionar uma matéria, a lista deve mostrar apenas os tópicos daquela matéria. Quando a seleção for "Todas", a lista deve voltar a mostrar todos.

**Passo a passo:**

1. Importe `Picker` de `'@react-native-picker/picker'` e `useEffect` junto com os imports já existentes.
2. Importe `listarMaterias` de `'../services/MateriaService'` e `listarTopicosPorMateria` de `'../services/TopicoService'`.
3. Importe os types `Materia` e `Topico`.
4. Crie os estados:
   - `materiaId: number` com valor inicial `0` (representa "Todas")
   - `materias: Materia[]` com valor inicial `[]`
5. Carregue as matérias com `useEffect` de dependência `[]`.
6. Carregue os tópicos com um segundo `useEffect` de dependência `[materiaId]`:
   - Se `materiaId` for `0`, chame `listarTopicos()`
   - Caso contrário, chame `listarTopicosPorMateria(materiaId)`
7. Substitua o `useFocusEffect` pelo segundo `useEffect` acima — os dois carregam a mesma lista e não devem coexistir.
8. Adicione o `Picker` no JSX, antes da lista:

```tsx
<View style={estilos.picker}>
  <Picker selectedValue={materiaId} onValueChange={setMateriaId}>
    <Picker.Item label="Todas as matérias" value={0} />
    {materias.map((m) => (
      <Picker.Item key={m.id} label={m.nome} value={m.id} />
    ))}
  </Picker>
</View>
```

9. Adicione o estilo `picker` na folha de estilos:

```tsx
picker: {
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: 8,
  marginBottom: 16,
},
```



---

## Referências

- [Aula 7 — Revisão: useState em formulários](7_hooks.md)
- [MDN — Array.prototype.find](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [@react-native-picker/picker](https://github.com/react-native-picker/picker)
