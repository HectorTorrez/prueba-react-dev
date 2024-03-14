"use client";

import { TableProps } from "antd/lib";

import { ShipmentTypesFromFirebase } from "@/app/types/shipment";

import { date, hour } from "@/app/helpers/getDate";

// columnas de la tabla de viajes
export const viewShipmentColumns: TableProps<ShipmentTypesFromFirebase>["columns"] =
  [
    {
      title: "Nombre del viaje",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ruta asignada",
      dataIndex: "route",
      key: "route",
    },
    {
      title: "Fecha y hora de recogida",
      dataIndex: "dateTimeCollection",
      key: "dateTimeCollection",
      render: (_, record) => {
        // convierto la fecha y hora en un string para poder mostrarlo en la tabla
        const newHour = hour(record.timeCollection);
        const newTime = date(record.dateCollection);
        return (
          <span>
            {newTime}, {newHour}
          </span>
        );
      },
    },
    {
      title: "Fecha y hora de llegada",
      dataIndex: "dateTimeArrival",
      key: "dateTimeArrival",
      render: (_, record) => {
        // convierto la fecha y hora en un string para poder mostrarlo en la tabla
        const newHour = hour(record.timeArrival);
        const newDate = date(record.dateArrival);
        return (
          <span>
            {newDate}, {newHour}
          </span>
        );
      },
    },
    {
      title: "Conductor",
      key: "driver",
      dataIndex: "driver",
    },
    {
      title: "Vehículo",
      key: "vehicle",
      dataIndex: "vehicle",
    },

    {
      title: "Estado del viaje",
      dataIndex: "state",
      key: "state",
      render: (state) => (state ? "Activo" : "Inactivo"),
    },
  ];
