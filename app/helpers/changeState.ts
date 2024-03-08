import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { message } from "antd";

// Esta funcion cambia el estado de un documento en la base de datos

export async function changeState(
  idDoc: string,
  document: string,
  state?: boolean
) {
  const ruta = doc(db, document, idDoc);
  try {
    await updateDoc(ruta, {
      state: state,
    });
    message.success("Ruta actualizada");
    location.reload();
  } catch (error) {
    console.error("Error updating document: ", error);
    message.error("Error al actualizar la ruta");
  }
}
