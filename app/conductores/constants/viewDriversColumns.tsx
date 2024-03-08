"use client";
import { TableProps } from "antd";
import { DriverTypes, DriverTypesFromFirebase } from "@/app/types/drivers";
import ImageComponent from "@/app/components/image";

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
