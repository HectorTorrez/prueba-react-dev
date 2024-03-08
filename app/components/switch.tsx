"use client";
import React from "react";
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
  const handleChange = (checked: boolean) => {
    onChange(idDoc, doc, checked);
    console.log("SwitchComponent:handleChange", checked);
  };
  return <Switch defaultChecked onChange={handleChange} value={record} />;
};

export default SwitchComponent;
