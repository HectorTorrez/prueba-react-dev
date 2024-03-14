"use client";
import React from "react";
import { Table } from "antd";
import { RouteFromFirebase } from "../types/routes";
import { DriverTypesFromFirebase } from "../types/drivers";
import { VehicleFromFirebase } from "../types/vehicles";
import { ShipmentTypesFromFirebase } from "../types/shipment";
import styles from "../css/table.module.css";
import { ColumnsType } from "antd/es/table";

type CombinedType =
  | RouteFromFirebase
  | DriverTypesFromFirebase
  | VehicleFromFirebase
  | ShipmentTypesFromFirebase;

type TableComponentProps<T extends CombinedType> = {
  data: T[];
  columns: ColumnsType<T>;
  pagination: false | object | undefined;
};

// componente de tabla reutilizable

const TableComponent = <T extends CombinedType>({
  data,
  columns,
  pagination,
}: TableComponentProps<T>) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={pagination}
      scroll={{ x: 100 }}
      className={styles["myTable"]}
      rowClassName={(record) =>
        // se realiza una validacion para ver si existe el campo state en types de la tabla para asi poder cambiar el color de la fila dependiendo de su estado
        "state" in record && record.state === false
          ? styles["inactiveRow"]
          : styles["activeRow"]
      }
    />
  );
};

export default TableComponent;
