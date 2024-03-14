"use client";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Esta funcion elimina un documento de la base de datos

export async function deleteDocument(col: string, id: string) {
  // recibiendo el id del documento y el nombre de la coleccion a la que pertenece el documento se elimina el documento
  // se decidio crear un helper para eliminar documentos ya que se repite mucho el codigo y no hay otra manera de pasar el id del documento a eliminar
  await deleteDoc(doc(db, col, id));
  await location.reload();
}
