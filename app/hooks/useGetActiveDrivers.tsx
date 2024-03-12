import { useEffect, useState } from "react";
import { getActiveDrivers, getActiveRoutes } from "../api/getDataFromFirebase";
import { DriverTypesFromFirebase } from "../types/drivers";

export default function useGetActiveDriver() {
  const [drivers, setDrivers] = useState<DriverTypesFromFirebase[]>([]);
  const activeDrivers = async () => {
    const activeDriver = await getActiveDrivers();
    setDrivers(activeDriver);
  };

  useEffect(() => {
    activeDrivers();
  }, []);

  return drivers;
}
