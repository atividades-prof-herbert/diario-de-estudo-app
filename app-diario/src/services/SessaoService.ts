import { Usuario } from '../types/Usuario';

// Guarda o usuário logado em memória, enquanto o app está aberto.
// Nada é persistido em disco: se o app for fechado, a sessão se perde
// e é preciso logar novamente. É exatamente o que o Firebase Auth
// vai resolver quando ele substituir este service.
let usuarioLogado: Usuario | null = null;

export function logar(usuario: Usuario): void {
  usuarioLogado = usuario;
}

export function deslogar(): void {
  usuarioLogado = null;
}

export function getUsuarioLogado(): Usuario | null {
  return usuarioLogado;
}
