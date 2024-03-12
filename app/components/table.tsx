"use client";
import React from "react";
import { Table } from "antd";

import { RouteFromFirebase } from "../types/routes";
import { TableProps } from "antd/lib";
import { DriverTypesFromFirebase } from "../types/drivers";
import { VehicleFromFirebase } from "../types/vehicles";
import { ShipmentTypesFromFirebase } from "../types/shipment";
import styles from "../css/table.module.css";

type TableComponentProps = {
  data:
    | RouteFromFirebase[]
    | DriverTypesFromFirebase[]
    | VehicleFromFirebase[]
    | ShipmentTypesFromFirebase[];
  columns: TableProps<
    | RouteFromFirebase
    | DriverTypesFromFirebase
    | VehicleFromFirebase
    | ShipmentTypesFromFirebase
  >["columns"];
  pagination: false | object | undefined;
};

// componente de tabla reutilizable

const TableComponent = ({ data, columns, pagination }: TableComponentProps) => {
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
