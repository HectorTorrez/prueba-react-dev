import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DataType, RouteFromFirebase } from "../types/routes";
import { DriverTypesFromFirebase } from "../types/drivers";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

// Esta funcion obtiene las rutas de la base de datos

export const getData = async (): Promise<DataType[]> => {
  const querySnapshot = await getDocs(collection(db, "rutas"));
  const data: DataType[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({ idDoc: doc.id, ...doc.data() } as DataType);
  });

  return data;
};

// Esta funcion obtiene los conductores de la base de datos
export const getDrivers = async () => {
  const querySnapshot = await getDocs(collection(db, "conductores"));
  const data: DriverTypesFromFirebase[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({
      idDoc: doc.id,
      ...doc.data(),
    } as DriverTypesFromFirebase);
  });

  return data;
};
