"use client";
import React from "react";
import { Flex, Table } from "antd";

import { DataType } from "../types/routes";
import { TableProps } from "antd/lib";
import { DriverTypesFromFirebase } from "../types/drivers";
import styled from "styled-components";
import { VehicleFromFirebase } from "../types/vehicles";

type TableComponentProps = {
  data: DataType[] | DriverTypesFromFirebase[] | VehicleFromFirebase[];
  columns: TableProps<
    DataType | DriverTypesFromFirebase | VehicleFromFirebase
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
