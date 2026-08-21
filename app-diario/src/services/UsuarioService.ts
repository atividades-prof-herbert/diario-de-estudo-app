import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Usuario } from '../types/Usuario';

const COLECAO = 'usuarios';

// O id não é gerado pelo Firestore: é o uid que o Firebase Auth já gerou
// para esse usuário. setDoc grava no documento com esse id específico,
// diferente de addDoc, que geraria um id novo, sem relação com o uid.
export async function cadastrarUsuario(id: string, dados: Omit<Usuario, 'id'>): Promise<Usuario> {
  const ref = doc(collection(db, COLECAO), id);
  await setDoc(ref, dados);
  return { id, ...dados };
}

export async function buscarUsuarioPorId(id: string): Promise<Usuario | undefined> {
  const ref = doc(db, COLECAO, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return undefined;
  return { id: snapshot.id, ...snapshot.data() } as Usuario;
}
