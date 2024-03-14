import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ShipmentTypesFromFirebase } from "../types/shipment";

export const getShipments = async () => {
  const q = query(collection(db, "viajes"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const data: ShipmentTypesFromFirebase[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({
      idDoc: doc.id,
      ...doc.data(),
    } as ShipmentTypesFromFirebase);
  });

  return data;
};
