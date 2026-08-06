# Aula 8 — Exercício

## Filtro por matéria em `TelaTopicos`

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
