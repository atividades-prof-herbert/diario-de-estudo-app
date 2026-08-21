import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { buscarUsuarioPorId } from './UsuarioService';
import { Usuario } from '../types/Usuario';

// Continua guardado em memória (não em disco): quem persiste a sessão
// de verdade agora é o Firebase Auth (via auth.ts, configurado por
// plataforma). Esta variável é só uma cópia local do perfil (usuarios/{uid})
// correspondente ao usuário autenticado no momento, para as telas lerem
// de forma síncrona com getUsuarioLogado().
let usuarioLogado: Usuario | null = null;

export function getUsuarioLogado(): Usuario | null {
  return usuarioLogado;
}

export async function carregarUsuarioLogado(uid: string): Promise<void> {
  usuarioLogado = (await buscarUsuarioPorId(uid)) ?? null;
}

// Chamado uma única vez, na raiz do app (app/_layout.tsx). O Firebase Auth
// avisa, de forma assíncrona, se existe uma sessão persistida (localStorage
// na web, AsyncStorage no nativo) assim que o app abre, e também toda vez
// que alguém loga ou desloga depois disso.
export function observarSessao(aoMudar: () => void): () => void {
  return onAuthStateChanged(auth, async (usuarioAutenticado) => {
    if (usuarioAutenticado) {
      await carregarUsuarioLogado(usuarioAutenticado.uid);
    } else {
      usuarioLogado = null;
    }
    aoMudar();
  });
}

export async function deslogar(): Promise<void> {
  await signOut(auth);
}
