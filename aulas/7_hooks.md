# Aula 7 — Revisão: `useState` em Formulários



---

## 1. Revisão rápida: o padrão de formulário controlado

Todo formulário com `useState` segue sempre o mesmo ciclo:

```
estado controla o input → handler valida → (service persiste) → alerta confirma → campos são limpos
```

### 1.1 Um estado por campo

```tsx
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
```

### 1.2 `TextInput` conectado ao estado

```tsx
<TextInput
  value={nome}
  onChangeText={setNome}
/>
```

- `value` faz o input exibir sempre o que está no estado.
- `onChangeText` atualiza o estado a cada letra digitada.

### 1.3 Handler separado com validação

```tsx
function salvar() {
  if (!nome.trim()) {
    mostrarAlerta('Atenção', 'Preencha o nome.');
    return;
  }
  // prossegue apenas se válido
}
```

`trim()` remove espaços em branco das bordas antes de verificar se o campo está vazio.

### 1.4 Limpar campos após salvar

```tsx
setNome('');
setEmail('');
```

Chamar os setters com `''` faz o React re-renderizar os `TextInput` vazios, prontos para um novo cadastro.

---

## Exercícios

### Exercício 1 — `TelaNovoRegistro`: inputs controlados e alerta

**Situação inicial:** a tela tinha quatro `TextInput` sem estado — o app não conseguia ler o que o usuário digitava.

**O que foi feito:**

1. Importado `useState` de `'react'`.
2. Criado um estado para cada campo: `materia`, `topico`, `descricao` e `data`.
3. Conectado cada `TextInput` com `value` e `onChangeText`.
4. Extraída a função `salvar` do `onPress` do botão.
5. Dentro de `salvar`: valida se `materia` e `topico` estão preenchidos; se não, exibe alerta e retorna.
6. Se válido, exibe os dados com `mostrarAlerta`.

**Solução — `TelaNovoRegistro.tsx`:**

```tsx
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { mostrarAlerta } from '../utils/alerta';

import Cabecalho from '../componentes/Cabecalho';

export default function TelaNovoRegistro() {
  const [materia, setMateria] = useState('');
  const [topico, setTopico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  function salvar() {
    if (!materia.trim() || !topico.trim()) {
      mostrarAlerta('Atenção', 'Preencha a matéria e o tópico.');
      return;
    }
    mostrarAlerta('Registro salvo!', 'Matéria: ' + materia + '\nTópico: ' + topico + '\nDescrição: ' + descricao + '\nData: ' + data);
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Novo registro" />

      <Text style={estilos.label}>Nome da matéria</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Matemática"
        value={materia}
        onChangeText={setMateria}
      />

      <Text style={estilos.label}>Nome do tópico</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Derivadas"
        value={topico}
        onChangeText={setTopico}
      />

      <Text style={estilos.label}>Descrição</Text>
      <TextInput
        style={[estilos.input, estilos.inputMultiline]}
        placeholder="Descreva brevemente a sessão de estudo"
        multiline
        numberOfLines={3}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={estilos.label}>Data</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: 24/04/2025"
        value={data}
        onChangeText={setData}
      />

      <TouchableOpacity style={estilos.botao} onPress={salvar}>
        <Text style={estilos.botaoTexto}>Salvar registro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
```

**Pontos de atenção:**

- `!materia.trim() || !topico.trim()` — valida os dois obrigatórios de uma vez; `descricao` e `data` são opcionais.
- O `onPress` do botão passa apenas `salvar` (sem `() =>`), pois a função não precisa de argumentos.

---

### Exercício 2 — `TelaNovoTopico`: gravando no service e limpando os campos

**Situação inicial:** a tela já tinha `useState` e validação, mas ao confirmar não persistia nada, apenas exibia um alerta genérico.

**O que foi feito:**

1. Importado `adicionarTopico` de `'../services/TopicoService'`.
2. Dentro de `salvar`, após as validações, chamado `adicionarTopico({ nome, materia, concluido })`.
3. Exibido alerta de sucesso com os dados salvos.
4. Limpado os três campos após salvar.

**Solução — `TelaNovoTopico.tsx`:**

```tsx
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mostrarAlerta } from '../utils/alerta';
import { useState } from 'react';

import Cabecalho from '../componentes/Cabecalho';
import { adicionarTopico } from '../services/TopicoService';

export default function TelaNovoTopico() {
  const [nome, setNome] = useState('');
  const [materia, setMateria] = useState('');
  const [concluido, setConcluido] = useState(false);

  function salvar() {
    if (!nome.trim()) {
      mostrarAlerta('Campo obrigatório', 'Informe o nome do tópico.');
      return;
    }
    if (!materia.trim()) {
      mostrarAlerta('Campo obrigatório', 'Informe a matéria do tópico.');
      return;
    }
    adicionarTopico({ nome, materia, concluido });
    mostrarAlerta('Tópico salvo!', 'Nome: ' + nome + '\nMatéria: ' + materia);
    setNome('');
    setMateria('');
    setConcluido(false);
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Novo tópico" />

      <Text style={estilos.label}>Nome *</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Derivadas"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={estilos.label}>Matéria *</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Matemática"
        value={materia}
        onChangeText={setMateria}
      />

      <View style={estilos.switchRow}>
        <Text style={estilos.label}>Concluído</Text>
        <Switch value={concluido} onValueChange={setConcluido} />
      </View>

      <TouchableOpacity style={estilos.botao} onPress={salvar}>
        <Text style={estilos.botaoTexto}>Salvar tópico</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
```

**Pontos de atenção:**

- `adicionarTopico({ nome, materia, concluido })`: passa um objeto sem `id`; o service gera o id automaticamente.
- As validações são feitas em dois `if` separados para que cada mensagem de erro seja específica.
- Se o nome de uma variável de estado for diferente da propriedade esperada pelo type, use a sintaxe `variavel: estado` para fazer o mapeamento:

  ```tsx
  // type Topico tem a propriedade "nome", mas na tela o estado se chama "nomeTopico"
  adicionarTopico({ nome: nomeTopico, materia, concluido });
  ```

  No exercício as variáveis coincidem com o type, então a forma curta `{ nome, materia, concluido }` já funciona.


---

## 2. Rotas com parâmetros no expo-router

### 2.1 Pastas criam rotas

No expo-router, a **estrutura de arquivos é a estrutura de rotas**. Criar uma pasta com um arquivo dentro cria uma rota com o nome dessa pasta.

```
app/
  inicio.tsx                   →  /inicio
  topicos-materia/
    [id].tsx                   →  /topicos-materia/1
                                   /topicos-materia/2
                                   /topicos-materia/...
```

> Criar a pasta `topicos-materia/` dentro de `app/` registra a rota `/topicos-materia/...` automaticamente. Nenhuma configuração extra é necessária.

---

### 2.2 O arquivo `[id].tsx` — segmento dinâmico

Os colchetes no nome do arquivo indicam um **segmento dinâmico**: qualquer valor que aparecer naquela posição da URL será capturado e disponibilizado para o componente.

```
/topicos-materia/1   →  id = "1"
/topicos-materia/42  →  id = "42"
/topicos-materia/7   →  id = "7"
```

O arquivo em si é simples — apenas exporta o componente da tela:

```tsx
// app/topicos-materia/[id].tsx
import TelaTopicosMateria from '../../src/telas/TelaTopicosMateria';

export default TelaTopicosMateria;
```

---

### 2.3 Navegando e passando o parâmetro — `TelaInicio`

Para navegar passando o `id`, basta incluí-lo na URL de destino. Envolvemos cada `CartaoMateria` num `TouchableOpacity`:

```tsx
materias.map((item) => (
  <TouchableOpacity key={item.id} onPress={() => router.push('/topicos-materia/' + item.id)}>
    <CartaoMateria
      nome={item.nome}
      descricao={item.descricao}
      corDestaque={item.corDestaque}
    />
  </TouchableOpacity>
))
```

Ao tocar no cartão da matéria de `id = 2`, o app navega para `/topicos-materia/2`. O expo-router captura o `2` e entrega para a tela destino.

---

### 2.4 Recebendo o parâmetro na tela destino

Na tela `TelaTopicosMateria`, usamos o hook `useLocalSearchParams` do expo-router para ler o valor que veio na URL:

```tsx
import { useLocalSearchParams } from 'expo-router';

const { id } = useLocalSearchParams<{ id: string }>();
```

> **Atenção:** parâmetros de URL são sempre `string`. Se precisar de número, converta com `Number(id)`.

---

### 2.5 Verificando que o parâmetro chegou

Antes de usar o `id` para qualquer lógica, vale confirmar que ele chega corretamente. Uma forma simples é exibir um alerta logo no início do componente:

```tsx
export default function TelaTopicosMateria() {
  const { id } = useLocalSearchParams<{ id: string }>();

  mostrarAlerta('Parâmetro recebido', 'id da matéria: ' + id);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Cabecalho titulo="Tópicos da matéria" />
    </ScrollView>
  );
}
```

Ao abrir a tela tocando em um cartão, o alerta deve exibir o id correto. Esse passo é temporário — serve só para validar antes de avançar.

---

## 3. `useEffect`

### 3.1 O que é um efeito colateral?

`useState` guarda dados que mudam com o tempo. Mas alguns componentes precisam fazer coisas **além de renderizar**: buscar dados ao abrir a tela, reagir a mudanças de parâmetro. Essas ações são chamadas de **efeitos colaterais** (*side effects*).

O hook `useEffect` é o lugar certo para colocá-los:

```tsx
import { useEffect } from 'react';

useEffect(() => {
  // código do efeito
}, [dependências]);
```

---

### 3.2 O array de dependências

O segundo argumento controla **quando** o efeito executa:

| Array | Quando executa |
|---|---|
| Omitido | A cada renderização |
| `[]` | Uma vez, quando o componente aparece na tela |
| `[valor]` | Sempre que `valor` mudar |

---

### 3.3 Exemplo: carregar dados na montagem

```tsx
const [materias, setMaterias] = useState<Materia[]>([]);

useEffect(() => {
  setMaterias(listarMaterias());
}, []);
```

O que acontece passo a passo:

1. O componente renderiza pela primeira vez, `materias` ainda é `[]`.
2. O React termina de montar o componente na tela.
3. O `useEffect` executa, chama `listarMaterias()` e atualiza o estado.
4. O React re-renderiza com a lista preenchida.

---

## 4. Refatorando `TelaTopicosMateria`

> **O que precisamos fazer ao abrir a tela?**
> Buscar todos os tópicos daquela matéria e exibi-los.

Temos o `id` da matéria vindo da rota. Precisamos usá-lo para carregar a lista certa assim que a tela abrir.

---

### 4.1 Criando a função no service

Em vez de filtrar diretamente na tela, **encapsulamos a consulta no service**. Isso mantém a lógica de dados fora do componente:

```ts
// TopicoService.ts
export function listarTopicosPorMateria(materiaId: number): Topico[] {
  return db.filter((t) => t.materiaId == materiaId);
}
```

A função recebe o `id` da matéria (number) e retorna apenas os tópicos com aquele `materiaId`.



---

### 4.2 Usando `useEffect` + service na tela

Com a função no service, a tela fica limpa: lê o parâmetro, busca a matéria, e usa `useEffect` para carregar os tópicos quando o `id` chegar ou mudar:

```tsx
export default function TelaTopicosMateria() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [topicos, setTopicos] = useState<Topico[]>([]);

  const materia = buscarMateriaPorId(Number(id));

  useEffect(() => {
    if (materia) {
      setTopicos(listarTopicosPorMateria(materia.id));
    }
  }, [id]);

  return (
    // ...
    topicos.map((topico) => (
      <CartaoTopico
        key={topico.id}
        nome={topico.nome}
        materiaVinculada={materia?.nome ?? 'Desconhecida'}
        concluido={topico.concluido}
      />
    ))
  );
}
```

Pontos importantes:

- `buscarMateriaPorId(Number(id))` — converte o `id` de `string` para `number` para buscar a matéria.
- `listarTopicosPorMateria(materia.id)` — passa o `id` numérico; o service filtra por `t.materiaId`.
- `[id]` no array de dependências — o efeito re-executa se o `id` mudar, garantindo que a lista seja recarregada ao navegar para outra matéria.


---

## 5. `Picker` com dados do service — `TelaNovoTopico`

### 5.1 Instalando o componente

O React Native não tem um seletor nativo multiplataforma. Usamos `@react-native-picker/picker`:

```bash
npx expo install @react-native-picker/picker
```

### 5.2 O padrão: `useEffect` carrega, `Picker` exibe

Adicionamos dois estados: `materiaId` (o que será salvo) e `materias` (a lista para exibir):

```tsx
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { listarMaterias } from '../services/MateriaService';
import { Materia } from '../types/Materia';

const [materiaId, setMateriaId] = useState(0);
const [materias, setMaterias] = useState<Materia[]>([]);

useEffect(() => {
  setMaterias(listarMaterias());
}, []);
```

No JSX, o `TextInput` de matéria é substituído pelo `Picker`:

```tsx
<View style={estilos.picker}>
  <Picker selectedValue={materiaId} onValueChange={setMateriaId}>
    <Picker.Item label="Selecione uma matéria..." value={0} />
    {materias.map((m) => (
      <Picker.Item key={m.id} label={m.nome} value={m.id} />
    ))}
  </Picker>
</View>
```

| Prop | Equivalente no `TextInput` | O que faz |
|---|---|---|
| `selectedValue` | `value` | Liga o Picker ao estado |
| `onValueChange` | `onChangeText` | Atualiza o estado ao selecionar |

- `label={m.nome}` é o que o usuário **vê**; `value={m.id}` é o que o estado **armazena**.
- Ao salvar: `adicionarTopico({ nome, materiaId, concluido })` 
---

## Exercício — `TelaNovoRegistro`: substituir `TextInput` por `Picker`

O exercício desta seção foi movido para [7_hooks_atividade.md](7_hooks_atividade.md).

---

## Referências

- [Aula 6 — Hooks e Estado com useState](6_hooks.md)
- [React — Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [expo-router — Dynamic Routes](https://docs.expo.dev/router/advanced/dynamic-routes/)
- [@react-native-picker/picker](https://github.com/react-native-picker/picker)
