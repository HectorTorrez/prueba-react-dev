"use client";
import { Space, TableColumnsType } from "antd";
import SwitchComponent from "../../components/switch";
import ModalComponent from "../../components/modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteButton from "../../components/delete-button";
import { deleteDocument } from "../../helpers/delete";

import { getState } from "../../helpers/getState";
import { VehicleFromFirebase } from "@/app/types/vehicles";
import { viewVehiclesColumns } from "./view-vehicles-columns";
import TableComponent from "@/app/components/table";
import VehicleForm from "../components/vehicle-form";

// columnas de la tabla de vehiculos
export const vehicleColumns: TableColumnsType<VehicleFromFirebase> = [
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
  {
    title: "Inactivo / Activo",
    key: "switch",
    dataIndex: "switch",
    render: (_, record) => (
      <SwitchComponent
        key={record.idDoc}
        record={record.state}
        onChange={getState}
        idDoc={record.idDoc}
        doc="vehiculos"
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
          <VehicleForm isEdit={true} values={record} />
        </ModalComponent>

        {/* boton para eliminar */}
        <DeleteButton
          buttonType="link"
          buttonText={
            <DeleteOutlined style={{ fontSize: 20, display: "block" }} />
          }
          cancelMessage="No se ha eliminado"
          confirmMessage="Se ha eliminado"
          onDelete={() => deleteDocument("vehiculos", record.idDoc)}
          title="¿Quieres eliminar este vehículo?"
          description="¿Está seguro que desea eliminar este vehículo?"
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
            columns={viewVehiclesColumns as any}
            data={[record]}
          />
        </ModalComponent>
      </Space>
    ),
  },
];
