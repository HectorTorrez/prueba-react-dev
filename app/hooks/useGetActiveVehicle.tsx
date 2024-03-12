import { useEffect, useState } from "react";
import { getActiveVehicles } from "../api/getDataFromFirebase";
import { VehicleFromFirebase } from "../types/vehicles";

export default function useGetActiveVehicle() {
  const [vehicles, setVehicles] = useState<VehicleFromFirebase[]>([]);
  const activeVehicles = async () => {
    const activeVehicle = await getActiveVehicles();
    setVehicles(activeVehicle);
  };

  useEffect(() => {
    activeVehicles();
  }, []);

  return vehicles;
}
