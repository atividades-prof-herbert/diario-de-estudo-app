import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Registro } from '../types/Registro';

const COLECAO = 'registros';

export async function listarRegistros(): Promise<Registro[]> {
  const snapshot = await getDocs(collection(db, COLECAO));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Registro));
}

export async function buscarRegistroPorId(id: string): Promise<Registro | undefined> {
  const ref = doc(db, COLECAO, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return undefined;
  return { id: snapshot.id, ...snapshot.data() } as Registro;
}

export async function adicionarRegistro(dados: Omit<Registro, 'id'>): Promise<Registro> {
  const ref = await addDoc(collection(db, COLECAO), dados);
  return { id: ref.id, ...dados };
}

export async function atualizarRegistro(id: string, dados: Partial<Omit<Registro, 'id'>>): Promise<void> {
  const ref = doc(db, COLECAO, id);
  await updateDoc(ref, dados);
}

export async function removerRegistro(id: string): Promise<void> {
  const ref = doc(db, COLECAO, id);
  await deleteDoc(ref);
}
