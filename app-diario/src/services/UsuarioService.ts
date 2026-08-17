import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { Usuario } from '../types/Usuario';

const COLECAO = 'usuarios';

export async function cadastrarUsuario(dados: Omit<Usuario, 'id'>): Promise<Usuario> {
  const ref = await addDoc(collection(db, COLECAO), dados);
  return { id: ref.id, ...dados };
}

export async function buscarUsuarioPorCredenciais(email: string, senha: string): Promise<Usuario | undefined> {
  const q = query(collection(db, COLECAO), where('email', '==', email), where('senha', '==', senha));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return undefined;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Usuario;
}
