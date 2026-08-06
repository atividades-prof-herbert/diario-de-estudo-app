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

const COLECAO = "topicos";

// ─── CRUD ────────────────────────────────────────────────────────────────────

export async function adicionarTopico(dados) {
  const ref = await addDoc(collection(db, COLECAO), dados);
  console.log("Tópico adicionado com ID:", ref.id);
  return ref.id;
}

export async function definirTopico(id, dados) {
  const ref = doc(db, COLECAO, id);
  await setDoc(ref, dados);
  console.log("Tópico definido:", id);
}

export async function listarTopicos() {
  const snapshot = await getDocs(collection(db, COLECAO));
  const topicos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log("Tópicos:", topicos);
  return topicos;
}

export async function listarTopicosPorMateria(materiaId) {
  const q = query(collection(db, COLECAO), where("materiaId", "==", materiaId));
  const snapshot = await getDocs(q);
  const topicos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(`Tópicos da matéria "${materiaId}":`, topicos);
  return topicos;
}

export async function buscarTopico(id) {
  const ref = doc(db, COLECAO, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    console.log("Tópico não encontrado:", id);
    return null;
  }
  const topico = { id: snapshot.id, ...snapshot.data() };
  console.log("Tópico encontrado:", topico);
  return topico;
}

export async function atualizarTopico(id, dados) {
  const ref = doc(db, COLECAO, id);
  await updateDoc(ref, dados);
  console.log("Tópico atualizado:", id);
}

export async function removerTopico(id) {
  const ref = doc(db, COLECAO, id);
  await deleteDoc(ref);
  console.log("Tópico removido:", id);
}

// ─── Funções de teste ────────────────────────────────────────────────────────

async function testarAdicionar() {
  console.log("\n--- testarAdicionar ---");
  await adicionarTopico({ nome: "Estruturas de repetição", materiaId: "matematica", concluido: false });
}

async function testarDefinir() {
  console.log("\n--- testarDefinir ---");
  await definirTopico("revolucao-francesa", { nome: "Revolução Francesa", materiaId: "historia", concluido: false });
}

async function testarListar() {
  console.log("\n--- testarListar ---");
  await listarTopicos();
}

async function testarListarPorMateria(materiaId) {
  console.log("\n--- testarListarPorMateria ---");
  await listarTopicosPorMateria(materiaId);
}

async function testarBuscar(id) {
  console.log("\n--- testarBuscar ---");
  await buscarTopico(id);
}

async function testarAtualizar(id) {
  console.log("\n--- testarAtualizar ---");
  await atualizarTopico(id, { concluido: true });
}

async function testarRemover(id) {
  console.log("\n--- testarRemover ---");
  await removerTopico(id);
}

// ─── Execução ────────────────────────────────────────────────────────────────

async function main() {
  // Adiciona com ID gerado automaticamente
  await testarAdicionar();

  // Define com ID fixo
  await testarDefinir();

  // Lista tudo
  await testarListar();

  // Busca pelo ID fixo criado com setDoc
  await testarBuscar("revolucao-francesa");

  // Atualiza o campo concluído do tópico com ID fixo
  await testarAtualizar("revolucao-francesa");

  // Lista os tópicos filtrando pela matéria vinculada
  await testarListarPorMateria("historia");

  // Remove o tópico com ID fixo
  await testarRemover("revolucao-francesa");

  // Lista novamente para confirmar remoção
  await testarListar();
}

main()
  .then(() => console.log("\n--- Testes concluídos ---"))
  .finally(() => terminate(db));
