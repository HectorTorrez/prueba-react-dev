"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import UploadImageComponent from "../../components/upload-image";

import { VehicleTypes } from "@/app/types/vehicles";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

//formulario para agregar vehiculos

const VehicleForm = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [form] = Form.useForm();

  const onFinish = async (values: VehicleTypes) => {
    if (avatar.length === 0) {
      message.error("Debes subir una imagen");
      return;
    }

    try {
      // despues de evaluar que la imagen no este vacia se agrega el vehiculos a la base de datos
      await addDoc(collection(db, "vehiculos"), {
        id: crypto.randomUUID(),
        state: true,
        imageUrl: avatar,
        brand: values.brand,
        model: values.model,
        year: values.year,
        vehiclePlate: values.vehiclePlate,
        vehicleCapacity: values.vehicleCapacity,
        typeOfVehicle: values.typeOfVehicle,
        key: crypto.randomUUID(),
      });
      message.success("Vehículo agregado");
      location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("Error al agregar el vehículo");
    }
  };

  const onReset = () => {
    form.resetFields();
    setAvatar("");
  };

  const handleGetAvatar = (url: string) => {
    setAvatar(url);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="imageUrl" label="Foto del vehiculo">
        <UploadImageComponent avatar={avatar} setAvatar={handleGetAvatar} />
      </Form.Item>
      <Form.Item name="brand" label="Marca " rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="model" label="Modelo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="year" label="Año" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="vehiclePlate"
        label="Placa del Vehiculo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="vehicleCapacity"
        label="Capacidad del Vehiculo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="typeOfVehicle"
        label="Tipo de Vehiculo"
        rules={[{ required: true, max: 8 }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default VehicleForm;
