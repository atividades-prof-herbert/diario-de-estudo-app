import { Registro } from '../types/Registro';

// materiaId aqui é texto porque agora referencia o ID de um documento no Firestore
// (coleção "materias"). Os valores abaixo são de exemplo e não apontam para
// nenhum documento real até que registros também seja migrado para o Firestore.
const db: Registro[] = [
  { id: 1, materiaId: '1', topicoId: 3, descricao: 'Regra da cadeia e produto', data: '21/04/2025' },
  { id: 2, materiaId: '3', topicoId: 6, descricao: 'Componentes e props', data: '22/04/2025' },
  { id: 3, materiaId: '2', topicoId: 5, data: '23/04/2025' },
  { id: 4, materiaId: '3', topicoId: 8, descricao: 'Tipos, interfaces e generics', data: '24/04/2025' },
];

let proximoId = 5;

export function listarRegistros(): Registro[] {
  return [...db];
}

export function buscarRegistroPorId(id: number): Registro | undefined {
  return db.find((r) => r.id === id);
}

export function adicionarRegistro(dados: Omit<Registro, 'id'>): Registro {
  const novo: Registro = { id: proximoId++, ...dados };
  db.push(novo);
  return novo;
}

export function atualizarRegistro(id: number, dados: Partial<Omit<Registro, 'id'>>): Registro | undefined {
  const index = db.findIndex((r) => r.id === id);
  if (index === -1) return undefined;
  db[index] = { ...db[index], ...dados };
  return db[index];
}

export function removerRegistro(id: number): boolean {
  const index = db.findIndex((r) => r.id === id);
  if (index === -1) return false;
  db.splice(index, 1);
  return true;
}
