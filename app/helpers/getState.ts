import { changeState } from "./changeState";

export const getState = (idDoc: string, doc: string, state: boolean) => {
  // recibo el idDoc, doc y el estado del switch para poder actualizar el estado de la ruta en la base de datos
  changeState(idDoc, doc, state);
};
