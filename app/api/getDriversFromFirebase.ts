import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { DriverTypesFromFirebase } from "../types/drivers";

// Esta funcion obtiene los conductores de la base de datos
export const getDrivers = async () => {
  const q = query(collection(db, "conductores"), orderBy("createdAt", "desc"));
  // const querySnapshot = await getDocs(collection(db, "conductores"));
  const querySnapshot = await getDocs(q);
  const data: DriverTypesFromFirebase[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({
      idDoc: doc.id,
      ...doc.data(),
    } as DriverTypesFromFirebase);
  });

  return data;
};

// esta funcion trae todos los conductores activos
export const getActiveDrivers = async () => {
  const q = query(collection(db, "conductores"), where("state", "==", true));
  // const querySnapshot = await getDocs(collection(db, "conductores"));
  const querySnapshot = await getDocs(q);
  const data: DriverTypesFromFirebase[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({
      idDoc: doc.id,
      ...doc.data(),
    } as DriverTypesFromFirebase);
  });
  return data;
};
