"use client";
import { Space } from "antd";
import SwitchComponent from "../../components/switch";
import ModalComponent from "../../components/modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditForm from "../../components/edit-routes-form";
import DeleteButton from "../../components/delete-button";
import { DriverTypesFromFirebase } from "../../types/drivers";
import { deleteDocument } from "../../helpers/delete";

import { TableProps } from "antd/lib";
import { getState } from "../../helpers/getState";
import EditDriversForm from "../components/edit";
import TableComponent from "@/app/components/table";
import { viewDriversColumns } from "./viewDriversColumns";

export const driverColumns: TableProps<DriverTypesFromFirebase>["columns"] = [
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
    title: "Activo/Inactivo",
    key: "switch",
    dataIndex: "switch",
    render: (_, record) => (
      <SwitchComponent
        key={record.idDoc}
        record={record.state}
        onChange={getState}
        idDoc={record.idDoc}
        doc="conductores"
      />
    ),
  },
  {
    title: "Estado del conductor",
    dataIndex: "state",
    key: "state",
    render: (state) => (state ? "Activo" : "Inactivo"),
  },
  {
    title: "Opciones",
    key: "opciones",
    render: (record) => (
      <Space size="middle">
        <ModalComponent
          buttonType="link"
          text={<EditOutlined style={{ fontSize: 20, display: "block" }} />}
          title="Editar conductor"
        >
          <EditDriversForm value={record as DriverTypesFromFirebase} />
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
        <ModalComponent
          width="60%"
          buttonType="primary"
          text="Ver más"
          title="Conductores"
        >
          <TableComponent
            pagination={false}
            columns={viewDriversColumns as any}
            data={[record]}
          />
        </ModalComponent>
      </Space>
    ),
  },
];
