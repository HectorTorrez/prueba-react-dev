"use client";
import React, { useState } from "react";
import { Switch } from "antd";

type SiwthComponentProps = {
  record: boolean;
  key: string;
  onChange: (idDoc: string, doc: string, state: boolean) => void;
  idDoc: string;
  doc: string;
};

const SwitchComponent = ({
  record,
  onChange,
  idDoc,
  doc,
}: SiwthComponentProps) => {
  const [value, SetValue] = useState(record);

  const handleChange = (checked: boolean) => {
    // recibe una funcion helper para poder cambiar el estado de la ruta
    onChange(idDoc, doc, checked);
    SetValue(!value);
  };
  return (
    <Switch
      defaultChecked
      onChange={handleChange}
      defaultValue={record}
      value={value}
    />
  );
};

export default SwitchComponent;
