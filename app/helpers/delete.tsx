"use client";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Esta funcion elimina un documento de la base de datos

export async function deleteDocument(col: string, id: string) {
  await deleteDoc(doc(db, col, id));
  await location.reload();
}
