import { useEffect, useState } from "react";
import { RouteFromFirebase } from "../types/routes";
import { getActiveRoutes } from "../api/getDataFromFirebase";

export default function useGetRoutes() {
  const [routes, setRoutes] = useState<RouteFromFirebase[]>([]);
  const activeRoutes = async () => {
    const activeRoutes = await getActiveRoutes();
    setRoutes(activeRoutes);
  };

  useEffect(() => {
    activeRoutes();
  }, []);

  return routes;
}
