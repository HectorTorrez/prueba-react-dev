"use client";
import React from "react";
import { Table } from "antd";

import { DataType } from "../types/routes";

import { columns } from "../contants/routesColumns";

type TableComponentProps = {
  data: DataType[];
};

const TableComponent = ({ data }: TableComponentProps) => {
  return <Table columns={columns} dataSource={data} />;
};

export default TableComponent;
