"use client";
import { Space } from "antd";
import ModalComponent from "../../components/modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteButton from "../../components/delete-button";
import { deleteDocument } from "../../helpers/delete";

import { TableProps } from "antd/lib";

import { ShipmentTypesFromFirebase } from "@/app/types/shipment";
import ShipmentForm from "../components/shipment-form";
import { date, hour } from "@/app/helpers/getDate";
import TableComponent from "@/app/components/table";
import { viewShipmentColumns } from "./view-shipment-columns";
import useGetRoutes from "@/app/hooks/useGetActiveRoutes";

// columnas de la tabla de viajes
export const shipmentColumns: TableProps<ShipmentTypesFromFirebase>["columns"] =
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
        const newDate = date(record.dateCollection);
        return (
          <span>
            {newDate}, {newHour}
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
        const newTime = date(record.dateArrival);
        return (
          <span>
            {newTime}, {newHour}
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
    // {
    //   title: "Activo/Inactivo",
    //   key: "switch",
    //   dataIndex: "switch",
    //   render: (_, record) => (
    //     <SwitchComponent
    //       key={record.idDoc}
    //       record={record.state}
    //       onChange={getState}
    //       idDoc={record.idDoc}
    //       doc="vehiculos"
    //     />
    //   ),
    // },
    // {
    //   title: "Estado del vehículo",
    //   dataIndex: "state",
    //   key: "state",
    //   render: (state) => (state ? "Activo" : "Inactivo"),
    // },
    {
      title: "Opciones",
      key: "opciones",
      render: (record: ShipmentTypesFromFirebase) => {
        return (
          <Space size="middle">
            {/* modal para editar conductor el cual el hijo recibe los valores */}
            <ModalComponent
              width="700px"
              buttonWidth="100px"
              buttonType="link"
              text={<EditOutlined style={{ fontSize: 20, display: "block" }} />}
              title="Editar viaje"
            >
              <ShipmentForm isEdit={true} values={record} />
              {/* <ShipmentFormServer record={record} /> */}
            </ModalComponent>

            {/* boton para eliminar */}
            <DeleteButton
              buttonType="link"
              buttonText={
                <DeleteOutlined style={{ fontSize: 20, display: "block" }} />
              }
              cancelMessage="No se ha eliminado"
              confirmMessage="Se ha eliminado"
              // aqui se envian el nombre de la coleccion y el id del documento para eliminarlo
              onDelete={() => deleteDocument("viajes", record.idDoc)}
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
                columns={viewShipmentColumns as []}
                data={[record]}
              />
            </ModalComponent>
          </Space>
        );
      },
    },
  ];