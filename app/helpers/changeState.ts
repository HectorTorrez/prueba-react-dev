import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { message } from "antd";

// Esta funcion cambia el estado de un documento en la base de datos

export async function changeState(
  idDoc: string,
  document: string,
  state?: boolean
) {
  // recibiendo el id del documento y el nombre de la coleccion a la que pertenece el documento se actualiza el estado del documento
  const ruta = doc(db, document, idDoc);
  try {
    await updateDoc(ruta, {
      state: state,
    });
    message.success("Estado actualizado");
    location.reload();
  } catch (error) {
    console.error("Error updating document: ", error);
    message.error("Error a actualizar el estado");
  }
}
