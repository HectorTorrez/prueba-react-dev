import { Space, TableProps } from "antd";
import SwitchComponent from "../components/switch";
import { DataType, RouteFromFirebase } from "../types/routes";
import { getState } from "../helpers/getState";
import ModalComponent from "../components/modal";
import EditForm from "../components/edit-form";
import DeleteButton from "../components/delete-button";
import { deleteDocument } from "../helpers/delete";

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "Estado de Ruta",
    dataIndex: "state",
    key: "state",
    render: (state) => (state ? "Activo" : "Inactivo"),
  },
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
    title: "Opciones",
    key: "opciones",
    render: (_, record) => (
      <Space size="middle">
        <ModalComponent text="Editar" title="Editar ruta">
          <EditForm value={record as RouteFromFirebase} />
        </ModalComponent>
        <DeleteButton
          cancelMessage="No se ha eliminado"
          confirmMessage="Se ha eliminado"
          onDelete={() => deleteDocument("ruta", record.idDoc)}
          title="¿Quieres eliminar esta ruta?"
          description="¿Está seguro que desea eliminar esta ruta?"
        />
      </Space>
    ),
  },
];
