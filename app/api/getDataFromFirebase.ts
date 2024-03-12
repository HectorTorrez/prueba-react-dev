import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { RouteFromFirebase } from "../types/routes";
import { DriverTypesFromFirebase } from "../types/drivers";
import { VehicleFromFirebase } from "../types/vehicles";
import { ShipmentTypesFromFirebase } from "../types/shipment";

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

export const getVehicles = async () => {
  const q = query(collection(db, "vehiculos"), orderBy("createdAt", "desc"));
  // const querySnapshot = await getDocs(collection(db, "vehiculos"));
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

export const getShipments = async () => {
  const q = query(collection(db, "viajes"), orderBy("createdAt", "desc"));
  // const querySnapshot = await getDocs(collection(db, "viajes"));
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

// esta funcion trae todos los vehiculos activos
export const getActiveVehicles = async () => {
  const q = query(collection(db, "vehiculos"), where("state", "==", true));
  // const querySnapshot = await getDocs(collection(db, "vehiculos"));
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
