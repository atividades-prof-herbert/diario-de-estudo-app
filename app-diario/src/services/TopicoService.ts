import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Topico } from '../types/Topico';

const COLECAO = 'topicos';

export async function listarTopicos(): Promise<Topico[]> {
  const snapshot = await getDocs(collection(db, COLECAO));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Topico));
}

export async function buscarTopicoPorId(id: string): Promise<Topico | undefined> {
  const ref = doc(db, COLECAO, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return undefined;
  return { id: snapshot.id, ...snapshot.data() } as Topico;
}

export async function listarTopicosPorMateria(materiaId: string): Promise<Topico[]> {
  const q = query(collection(db, COLECAO), where('materiaId', '==', materiaId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Topico));
}

// "Join" manual: como o Firestore não filtra por usuário direto em topicos
// (só materias tem usuarioId), primeiro buscamos as materias do usuário e
// depois os topicos cujo materiaId está entre os ids dessas materias.
export async function listarTopicosPorMaterias(materiaIds: string[]): Promise<Topico[]> {
  if (materiaIds.length === 0) return [];
  const q = query(collection(db, COLECAO), where('materiaId', 'in', materiaIds));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Topico));
}

export async function adicionarTopico(dados: Omit<Topico, 'id'>): Promise<Topico> {
  const ref = await addDoc(collection(db, COLECAO), dados);
  return { id: ref.id, ...dados };
}

export async function atualizarTopico(id: string, dados: Partial<Omit<Topico, 'id'>>): Promise<void> {
  const ref = doc(db, COLECAO, id);
  await updateDoc(ref, dados);
}

export async function removerTopico(id: string): Promise<void> {
  const ref = doc(db, COLECAO, id);
  await deleteDoc(ref);
}
