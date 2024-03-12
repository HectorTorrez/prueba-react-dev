"use client";
import { Space, TableProps } from "antd";
import SwitchComponent from "../../components/switch";
import { RouteFromFirebase } from "../../types/routes";
import { getState } from "../../helpers/getState";
import ModalComponent from "../../components/modal";
import DeleteButton from "../../components/delete-button";
import { deleteDocument } from "../../helpers/delete";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../components/table";
import { viewColumns } from "./viewRouteColumns";
import RouteForm from "@/app/components/route-form";
import Map from "@/app/provider/MapProvider";

// columnas de la tabla de rutas
export const columns: TableProps<RouteFromFirebase>["columns"] = [
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
    title: "Activo/Inactivo",
    key: "switch",
    dataIndex: "switch",
    render: (_, record) => (
      <SwitchComponent
        key={record.idDoc}
        record={record.state}
        onChange={getState}
        idDoc={record.idDoc}
        doc="rutas"
      />
    ),
  },
  {
    title: "Estado de Ruta",
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
          title="Editar ruta"
          width="700px"
          buttonWidth="100px"
        >
          <RouteForm value={record as RouteFromFirebase} isEdit />
        </ModalComponent>
        <DeleteButton
          buttonType="link"
          buttonText={
            <DeleteOutlined style={{ fontSize: 20, display: "block" }} />
          }
          cancelMessage="No se ha eliminado"
          confirmMessage="Se ha eliminado"
          // paso la funcion helper deleteDocument para eliminar el documento
          onDelete={() => deleteDocument("rutas", record.idDoc)}
          title="¿Quieres eliminar esta ruta?"
          description="¿Está seguro que desea eliminar esta ruta?"
        />
        <ModalComponent
          buttonWidth="100px"
          buttonType="primary"
          text="Ver más"
          title="Ruta"
          width="auto"
        >
          <TableComponent
            pagination={false}
            columns={viewColumns as []}
            data={[record]}
          />
        </ModalComponent>
        <ModalComponent
          buttonWidth="100px"
          buttonType="primary"
          text="Ver en mapa"
          title="Mapa"
          width="auto"
        >
          <Map firstCity={record.origin} secondCity={record.destiny} />
        </ModalComponent>
      </Space>
    ),
  },
];
