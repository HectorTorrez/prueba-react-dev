"use client";
import { TableProps } from "antd";
import { DriverTypesFromFirebase } from "@/app/types/drivers";
import ImageComponent from "@/app/components/image";

// columnas de la tabla de conductores al hacer click en ver mas
export const viewDriversColumns: TableProps<DriverTypesFromFirebase>["columns"] =
  [
    {
      title: "Foto",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <ImageComponent alt="avatar" url={imageUrl} width={50} height={50} />
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "DUI",
      dataIndex: "dui",
      key: "dui",
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Licencia",
      key: "licence",
      dataIndex: "licence",
    },
    {
      title: "Correo",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Teléfono",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Dirección",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Estado del conductor",
      dataIndex: "state",
      key: "state",
      render: (state) => (state ? "Activo" : "Inactivo"),
    },
  ];
