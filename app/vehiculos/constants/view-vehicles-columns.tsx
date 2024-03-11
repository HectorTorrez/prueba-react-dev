"use client";

import { TableProps } from "antd/lib";

import { VehicleFromFirebase } from "@/app/types/vehicles";
import ImageComponent from "@/app/components/image";

// columnas de la tabla de vehiculos
export const viewVehiclesColumns: TableProps<VehicleFromFirebase>["columns"] = [
  {
    title: "Fotografía del vehículo",
    dataIndex: "imageUrl",
    key: "imageUrl",
    render: (imageUrl) => (
      <ImageComponent alt="avatar" url={imageUrl} width={50} height={50} />
    ),
  },
  {
    title: "Marca",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Modelo",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Año",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Placa",
    dataIndex: "vehiclePlate",
    key: "vehiclePlate",
  },
  {
    title: "Capacidad",
    key: "vehicleCapacity",
    dataIndex: "vehicleCapacity",
  },
  {
    title: "Tipo de vehículo",
    key: "typeOfVehicle",
    dataIndex: "typeOfVehicle",
  },
  {
    title: "Estado del vehículo",
    dataIndex: "state",
    key: "state",
    render: (state) => (state ? "Activo" : "Inactivo"),
  },
];
