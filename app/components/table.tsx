"use client";
import React from "react";
import { Table } from "antd";

import { RouteFromFirebase } from "../types/routes";
import { TableProps } from "antd/lib";
import { DriverTypesFromFirebase } from "../types/drivers";
import { VehicleFromFirebase } from "../types/vehicles";

type TableComponentProps = {
  data: RouteFromFirebase[] | DriverTypesFromFirebase[] | VehicleFromFirebase[];
  columns: TableProps<
    RouteFromFirebase | DriverTypesFromFirebase | VehicleFromFirebase
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
    />
  );
};

export default TableComponent;
