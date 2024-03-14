import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { VehicleFromFirebase } from "../types/vehicles";

export const getVehicles = async () => {
  const q = query(collection(db, "vehiculos"), orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  const data: VehicleFromFirebase[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({
      idDoc: doc.id,
      ...doc.data(),
    } as VehicleFromFirebase);
  });

  return data;
};

// esta funcion trae todos los vehiculos activos
export const getActiveVehicles = async () => {
  const q = query(collection(db, "vehiculos"), where("state", "==", true));
  const querySnapshot = await getDocs(q);
  const data: VehicleFromFirebase[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({
      idDoc: doc.id,
      ...doc.data(),
    } as VehicleFromFirebase);
  });

  return data;
};
