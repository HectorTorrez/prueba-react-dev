"use client";
import { Space, TableColumnsType } from "antd";
import SwitchComponent from "../../components/switch";
import ModalComponent from "../../components/modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteButton from "../../components/delete-button";
import { DriverTypesFromFirebase } from "../../types/drivers";
import { deleteDocument } from "../../helpers/delete";

import TableComponent from "@/app/components/table";
import { viewDriversColumns } from "./view-drivers-columns";
import DriverForm from "../components/driver-form";
import { changeState } from "@/app/helpers/changeState";

// columnas de la tabla de conductores
export const driverColumns: TableColumnsType<DriverTypesFromFirebase> = [
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
  {
    title: "Inactivo / Activo",
    key: "switch",
    dataIndex: "switch",
    render: (_, record) => (
      <SwitchComponent
        key={record.idDoc}
        record={record.state}
        onChange={changeState}
        idDoc={record.idDoc}
        doc="conductores"
      />
    ),
  },
  {
    title: "Opciones",
    key: "opciones",
    render: (record) => (
      <Space size="middle">
        {/* modal para editar conductor el cual el hijo recibe los valores */}
        <ModalComponent
          width="700px"
          buttonWidth="100px"
          buttonType="link"
          text={<EditOutlined style={{ fontSize: 20, display: "block" }} />}
          title="Editar conductor"
        >
          <DriverForm values={record as DriverTypesFromFirebase} isEdit />
        </ModalComponent>
        <DeleteButton
          buttonType="link"
          buttonText={
            <DeleteOutlined style={{ fontSize: 20, display: "block" }} />
          }
          cancelMessage="No se ha eliminado"
          confirmMessage="Se ha eliminado"
          onDelete={() => deleteDocument("conductores", record.idDoc)}
          title="¿Quieres eliminar este conductor?"
          description="¿Está seguro que desea eliminar este conductor?"
        />

        {/* modal para ver mas informacion de los conductores */}
        <ModalComponent
          width="90%"
          buttonType="primary"
          text="Ver más"
          title="Conductores"
          buttonWidth="100px"
        >
          <TableComponent
            pagination={false}
            columns={viewDriversColumns}
            data={[record]}
          />
        </ModalComponent>
      </Space>
    ),
  },
];
