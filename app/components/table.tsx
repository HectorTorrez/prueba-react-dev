"use client";
import React from "react";
import { Table } from "antd";

import { DataType } from "../types/routes";
import { TableProps } from "antd/lib";

type TableComponentProps = {
  data: DataType[];
  columns: TableProps<DataType>["columns"];
  pagination: false | object | undefined;
};

const TableComponent = ({ data, columns, pagination }: TableComponentProps) => {
  return <Table columns={columns} dataSource={data} pagination={pagination} />;
};

export default TableComponent;
