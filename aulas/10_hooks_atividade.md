# Aula 10 — Atividade avaliativa

## Edição de registros de estudo

Implemente a funcionalidade de edição de registros de estudo no diário.

### Requisitos

1. **Botão editar nos registros** — adicione um botão "Editar" em cada item da lista de registros de estudo.

2. **Navegação com dados preenchidos** — ao pressionar o botão, o usuário deve ser direcionado para a tela de registro. O formulário deve chegar com os dados do registro já preenchidos nos campos.

3. **Salvar como atualização** — ao salvar, a operação deve ser um `update` no registro existente, e não a criação de um novo.

4. **Retorno com dados atualizados** — após salvar, o app deve voltar para a tela anterior e a lista deve refletir os dados atualizados.

5. **Refatoração do nome da tela** — renomeie `TelaNovoRegistro` para `TelaRegistrarEstudo` em todos os arquivos do projeto (componente, arquivo, navegação e referências).

### `RegistroService` — métodos disponíveis

O service já oferece tudo que a atividade exige. Nenhum método precisa ser criado.

**Type `Registro`:**

```ts
type Registro = {
  id: number;        // gerado automaticamente pelo service
  materiaId: number; // obrigatório
  topicoId?: number; // opcional
  descricao?: string;// opcional
  data: string;      // obrigatório
};
```

| Função | Assinatura | O que faz |
|---|---|---|
| `listarRegistros` | `() => Registro[]` | Retorna uma cópia de todos os registros |
| `buscarRegistroPorId` | `(id: number) => Registro \| undefined` | Retorna o registro com aquele id, ou `undefined` se não encontrar |
| `adicionarRegistro` | `(dados: Omit<Registro, 'id'>) => Registro` | Cria um novo registro com id gerado automaticamente e retorna o objeto criado |
| `atualizarRegistro` | `(id: number, dados: Partial<Omit<Registro, 'id'>>) => Registro \| undefined` | Atualiza apenas os campos informados no registro existente; retorna o registro atualizado ou `undefined` se o id não existir |
| `removerRegistro` | `(id: number) => boolean` | Remove o registro; retorna `true` se removeu, `false` se o id não existia |

**Uso típico na atividade:**

```tsx
// Carregar um registro para pré-preencher o formulário
const registro = buscarRegistroPorId(Number(id));

// Salvar a edição
atualizarRegistro(editandoId, { materiaId, topicoId, descricao, data });
```

### Conteúdo relacionado

- [Aula 5 — Rotas e navegação](./5_rotas.md)
- [Aulas 3 e 4 — Componentes e props](./3_componentes_props.md)
- [Aula 6 — Hooks (parte 1)](./6_hooks.md)
- [Aula 7 — Hooks (parte 2)](./7_hooks.md)
- [Aula 8 — Hooks (parte 3)](./8_hooks.md)
- [Aula 9 — Hooks (parte 4)](./9_hooks.md)
