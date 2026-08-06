import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  terminate,
} from "firebase/firestore";
import { db } from "./firebase.js";

const COLECAO = "registros";

// ─── CRUD ────────────────────────────────────────────────────────────────────

export async function adicionarRegistro(dados) {
  const ref = await addDoc(collection(db, COLECAO), dados);
  console.log("Registro adicionado com ID:", ref.id);
  return ref.id;
}

export async function listarRegistros() {
  const snapshot = await getDocs(collection(db, COLECAO));
  const registros = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log("Registros:", registros);
  return registros;
}

export async function listarRegistrosPorMateria(materiaId) {
  const q = query(collection(db, COLECAO), where("materiaId", "==", materiaId));
  const snapshot = await getDocs(q);
  const registros = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(`Registros da matéria "${materiaId}":`, registros);
  return registros;
}

export async function buscarRegistro(id) {
  const ref = doc(db, COLECAO, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    console.log("Registro não encontrado:", id);
    return null;
  }
  const registro = { id: snapshot.id, ...snapshot.data() };
  console.log("Registro encontrado:", registro);
  return registro;
}

export async function atualizarRegistro(id, dados) {
  const ref = doc(db, COLECAO, id);
  await updateDoc(ref, dados);
  console.log("Registro atualizado:", id);
}

export async function removerRegistro(id) {
  const ref = doc(db, COLECAO, id);
  await deleteDoc(ref);
  console.log("Registro removido:", id);
}

// ─── Funções de teste ────────────────────────────────────────────────────────

async function testarAdicionar() {
  console.log("\n--- testarAdicionar ---");
  return await adicionarRegistro({
    materiaId: "matematica",
    topicoId: "equacoes",
    descricao: "Revisão de equações de segundo grau",
    data: "2026-08-05",
  });
}

async function testarListar() {
  console.log("\n--- testarListar ---");
  await listarRegistros();
}

async function testarListarPorMateria(materiaId) {
  console.log("\n--- testarListarPorMateria ---");
  await listarRegistrosPorMateria(materiaId);
}

async function testarBuscar(id) {
  console.log("\n--- testarBuscar ---");
  await buscarRegistro(id);
}

async function testarAtualizar(id) {
  console.log("\n--- testarAtualizar ---");
  await atualizarRegistro(id, { descricao: "Revisão de equações de segundo grau e fatoração" });
}

async function testarRemover(id) {
  console.log("\n--- testarRemover ---");
  await removerRegistro(id);
}

// ─── Execução ────────────────────────────────────────────────────────────────

async function main() {
  // Adiciona com ID gerado automaticamente
  const idGerado = await testarAdicionar();

  // Lista tudo
  await testarListar();

  // Busca pelo ID gerado no addDoc
  await testarBuscar(idGerado);

  // Atualiza a descrição do registro criado
  await testarAtualizar(idGerado);

  // Lista os registros filtrando pela matéria vinculada
  await testarListarPorMateria("matematica");

  // Remove o registro criado
  await testarRemover(idGerado);

  // Lista novamente para confirmar remoção
  await testarListar();
}

main()
  .then(() => console.log("\n--- Testes concluídos ---"))
  .finally(() => terminate(db));
