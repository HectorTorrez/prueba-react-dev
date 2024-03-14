import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { RouteFromFirebase } from "../types/routes";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

// Esta funcion obtiene las rutas de la base de datos

export const getData = async () => {
  const q = query(collection(db, "rutas"), orderBy("createdAt", "desc"));
  // const querySnapshot = await getDocs(collection(db, "rutas"));
  const querySnapshot = await getDocs(q);
  const data: RouteFromFirebase[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({ idDoc: doc.id, ...doc.data() } as RouteFromFirebase);
  });

  return data;
};

// esta funcion trae todas las rutas activas
export const getActiveRoutes = async () => {
  const q = query(collection(db, "rutas"), where("state", "==", true));
  // const querySnapshot = await getDocs(collection(db, "rutas"));
  const querySnapshot = await getDocs(q);
  const data: RouteFromFirebase[] = [];
  querySnapshot.forEach((doc) => {
    return data.push({ idDoc: doc.id, ...doc.data() } as RouteFromFirebase);
  });

  return data;
};
