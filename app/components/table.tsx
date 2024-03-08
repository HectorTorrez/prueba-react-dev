"use client";
import React from "react";
import { Table } from "antd";

import { DataType } from "../types/routes";
import { TableProps } from "antd/lib";
import { DriverTypesFromFirebase } from "../types/drivers";

type TableComponentProps = {
  data: DataType[] | DriverTypesFromFirebase[];
  columns: TableProps<DataType | DriverTypesFromFirebase>["columns"];
  pagination: false | object | undefined;
};

// componente de tabla reutilizable

const TableComponent = ({ data, columns, pagination }: TableComponentProps) => {
  return <Table columns={columns} dataSource={data} pagination={pagination} />;
};

export default TableComponent;
