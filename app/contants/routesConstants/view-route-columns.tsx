"use client";
import { TableProps } from "antd";
import { DataType } from "../../types/routes";
import { ColumnsType } from "antd/es/table";

// columnas de la tabla de conductores al hacer click en ver mas
export const viewColumns: ColumnsType<DataType> = [
  {
    title: "Tipo de viaje",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Nombre de Ruta",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Origen de Ruta",
    dataIndex: "origin",
    key: "origin",
  },
  {
    title: "Destino de Ruta",
    key: "destiny",
    dataIndex: "destiny",
  },

  {
    title: "Estado de Ruta",
    dataIndex: "state",
    key: "state",
    render: (state) => (state ? "Activo" : "Inactivo"),
  },
];
