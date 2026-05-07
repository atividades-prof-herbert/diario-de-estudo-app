import { Topico } from '../types/Topico';

const db: Topico[] = [
  { id: 1, nome: 'Funções de 1º grau', materiaId: 1, concluido: true },
  { id: 2, nome: 'Sistemas lineares', materiaId: 1, concluido: false },
  { id: 3, nome: 'Derivadas', materiaId: 1, concluido: true },
  { id: 4, nome: 'Análise sintática', materiaId: 2, concluido: true },
  { id: 5, nome: 'Concordância verbal', materiaId: 2, concluido: false },
  { id: 6, nome: 'React Native', materiaId: 3, concluido: true },
  { id: 7, nome: 'Hooks no React', materiaId: 3, concluido: false },
  { id: 8, nome: 'TypeScript', materiaId: 3, concluido: true },
];

let proximoId = 9;

export function listarTopicos(): Topico[] {
  return [...db];
}

export function buscarTopicoPorId(id: number): Topico | undefined {
  return db.find((t) => t.id === id);
}

export function listarTopicosPorMateria(materiaId: number): Topico[] {
  return db.filter((t) => t.materiaId === materiaId);
}

export function adicionarTopico(dados: Omit<Topico, 'id'>): Topico {
  const novo: Topico = { id: proximoId++, ...dados };
  db.push(novo);
  return novo;
}

export function atualizarTopico(id: number, dados: Partial<Omit<Topico, 'id'>>): Topico | undefined {
  const index = db.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  db[index] = { ...db[index], ...dados };
  return db[index];
}

export function removerTopico(id: number): boolean {
  const index = db.findIndex((t) => t.id === id);
  if (index === -1) return false;
  db.splice(index, 1);
  return true;
}
