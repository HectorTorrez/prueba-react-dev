import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DataType, RouteFromFirebase } from "../types/routes";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const getData = async (): Promise<DataType[]> => {
  const querySnapshot = await getDocs(collection(db, "rutas"));
  const data: DataType[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({ idDoc: doc.id, ...doc.data() } as DataType);
  });

  return data;
};
