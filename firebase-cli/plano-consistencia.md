# Plano de consistência

O Firestore não possui chave estrangeira nem exclusão em cascata. Os campos `materiaId` e `topicoId` são apenas strings armazenadas nos documentos de `topicos` e `registros`, e o banco não impede a criação de registros órfãos nem avisa quando o documento referenciado deixa de existir. Por isso, garantir a consistência entre as três coleções é responsabilidade exclusiva do código da aplicação. A seguir está o plano para cada cenário de remoção.

## 1. Remover uma matéria

Antes de remover o documento da matéria, a aplicação precisa localizar tudo o que depende dela.

1. Buscar todos os tópicos vinculados à matéria, usando `listarTopicosPorMateria(materiaId)`.
2. Buscar todos os registros vinculados diretamente à matéria, usando `listarRegistrosPorMateria(materiaId)`.
3. Para cada tópico encontrado, também é preciso localizar os registros que apontam para aquele `topicoId`, já que um registro pode referenciar um tópico sem repetir explicitamente a mesma consulta por matéria.
4. Remover primeiro os registros (tanto os vinculados à matéria quanto os vinculados aos tópicos da matéria), depois os tópicos e só então o documento da matéria.
5. Essa ordem evita órfãos parciais: se o processo for interrompido no meio do caminho, é preferível que sobrem tópicos e registros sem matéria (situação detectável e corrigível) a sobrar uma matéria removida com tópicos ainda apontando para ela.
6. Como o Firestore não garante atomicidade entre múltiplas operações desse tipo sem uma transação ou batch, o ideal é agrupar as exclusões em um `writeBatch` ou em uma transação, garantindo que a remoção da matéria só seja confirmada se as remoções dependentes também forem.
7. Alternativamente, em vez de excluir tópicos e registros, a aplicação pode optar por uma exclusão lógica da matéria, mantendo o documento marcado como inativo, o que evita a necessidade de cascata imediata e permite decidir depois o que fazer com os dados dependentes.

## 2. Remover um tópico

O tópico é referenciado apenas pelos registros, então o cuidado aqui é mais localizado.

1. Buscar todos os registros vinculados ao tópico que será removido.
2. Como o campo `topicoId` é opcional em `registros`, a decisão de negócio é entre remover esses registros junto com o tópico ou preservá los, apenas desvinculando a referência.
3. Se a decisão for preservar o histórico de estudo, cada registro encontrado deve ser atualizado para que `topicoId` fique nulo ou vazio, mantendo os demais campos (matéria, descrição e data) intactos.
4. Se a decisão for remover o histórico junto com o tópico, os registros encontrados devem ser excluídos antes da exclusão do tópico, pela mesma razão de ordem descrita no cenário anterior.
5. Em qualquer uma das duas abordagens, a atualização ou remoção dos registros e a remoção do tópico devem ocorrer como uma operação agrupada, para que uma falha no meio do processo não deixe registros apontando para um tópico que já não existe mais.

## 3. Remover um registro

O registro é a entidade que só recebe referências, ele não é referenciado por nenhuma outra coleção do modelo de dados.

1. Não há dependências a propagar, já que nenhuma outra coleção guarda uma referência a um `registroId`.
2. A remoção pode ser feita diretamente, sem necessidade de buscas ou operações adicionais antes ou depois.
3. O único cuidado é conceitual, não estrutural: por representar um evento de estudo já ocorrido, pode fazer sentido do ponto de vista de produto perguntar ao usuário antes de remover, mas isso não afeta a consistência do banco.
