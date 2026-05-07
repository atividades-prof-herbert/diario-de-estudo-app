import { Materia } from '../types/Materia';

const db: Materia[] = [
  { id: 1, nome: 'Matemática', descricao: 'Álgebra linear e cálculo diferencial' },
  { id: 2, nome: 'Português', descricao: 'Gramática, interpretação de texto e redação', corDestaque: '#E05C5C' },
  { id: 3, nome: 'Programação', descricao: 'React Native, TypeScript e lógica de programação', corDestaque: '#2ECC71' },
];

let proximoId = 4;

export function listarMaterias(): Materia[] {
  return [...db];
}

export function buscarMateriaPorId(id: number): Materia | undefined {
  return db.find((m) => m.id === id);
}

export function adicionarMateria(dados: Omit<Materia, 'id'>): Materia {
  const nova: Materia = { id: proximoId++, ...dados };
  db.push(nova);
  return nova;
}

export function atualizarMateria(id: number, dados: Partial<Omit<Materia, 'id'>>): Materia | undefined {
  const index = db.findIndex((m) => m.id === id);
  if (index === -1) return undefined;
  db[index] = { ...db[index], ...dados };
  return db[index];
}

export function removerMateria(id: number): boolean {
  const index = db.findIndex((m) => m.id === id);
  if (index === -1) return false;
  db.splice(index, 1);
  return true;
}
