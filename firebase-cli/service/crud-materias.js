import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  terminate,
} from "firebase/firestore";
import { db } from "./firebase.js";

const COLECAO = "materias";

// ─── CRUD ────────────────────────────────────────────────────────────────────

export async function adicionarMateria(dados) {
  const ref = await addDoc(collection(db, COLECAO), dados);
  console.log("Matéria adicionada com ID:", ref.id);
  return ref.id;
}

export async function definirMateria(id, dados) {
  const ref = doc(db, COLECAO, id);
  await setDoc(ref, dados);
  console.log("Matéria definida:", id);
}

export async function listarMaterias() {
  const snapshot = await getDocs(collection(db, COLECAO));
  const materias = snapshot.docs.map((doc) => 
    ({ id: doc.id, ...doc.data() })
);
  console.log("Matérias:", materias);
  return materias;
}

export async function buscarMateria(id) {
  const ref = doc(db, COLECAO, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    console.log("Matéria não encontrada:", id);
    return null;
  }
  const materia = { id: snapshot.id, ...snapshot.data() };
  console.log("Matéria encontrada:", materia);
  return materia;
}

export async function atualizarMateria(id, dados) {
  const ref = doc(db, COLECAO, id);
  await updateDoc(ref, dados);
  console.log("Matéria atualizada:", id);
}

export async function buscarMateriaPorNome(nome) {
  const q = query(collection(db, COLECAO), where("nome", "==", nome));
  const snapshot = await getDocs(q);
  const materias = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(`Matérias com nome "${nome}":`, materias);
  return materias;
}

export async function removerMateria(id) {
  const ref = doc(db, COLECAO, id);
  await deleteDoc(ref);
  console.log("Matéria removida:", id);
}

// ─── Funções de teste ────────────────────────────────────────────────────────

async function testarAdicionar() {
  console.log("\n--- testarAdicionar ---");
  await adicionarMateria({ nome: "Matemática", cor: "#FF5733" });
}

async function testarDefinir() {
  console.log("\n--- testarDefinir ---");
  await definirMateria("historia", { nome: "História", cor: "#3498DB" });
}

async function testarListar() {
  console.log("\n--- testarListar ---");
  await listarMaterias();
}

async function testarBuscar(id) {
  console.log("\n--- testarBuscar ---");
  await buscarMateria(id);
}

async function testarAtualizar(id) {
  console.log("\n--- testarAtualizar ---");
  await atualizarMateria(id, { cor: "#2ECC71" });
}

async function testarBuscarPorNome(nome) {
  console.log("\n--- testarBuscarPorNome ---");
  await buscarMateriaPorNome(nome);
}

async function testarRemover(id) {
  console.log("\n--- testarRemover ---");
  await removerMateria(id);
}

// ─── Execução ────────────────────────────────────────────────────────────────

async function main() {
  // Adiciona com ID gerado automaticamente
  const idGerado = await testarAdicionar();

  // Define com ID fixo
  await testarDefinir();

  // Lista tudo
  await testarListar();

  // Busca pelo ID fixo criado com setDoc
  await testarBuscar("historia");

  // Atualiza só a cor da matéria com ID fixo
  await testarAtualizar("historia");

  // Remove a matéria com ID fixo
  await testarRemover("historia");

  // Lista novamente para confirmar remoção
  await testarListar();

  // Busca por nome no campo do documento
  await testarBuscarPorNome("Matemática");
}

main()
  .then(() => console.log("\n--- Testes concluídos ---"))
  .finally(() => terminate(db));
