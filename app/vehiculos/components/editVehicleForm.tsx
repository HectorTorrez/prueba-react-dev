"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import UploadImageComponent from "../../components/upload-image";
import { validateDUI } from "../../helpers/validateDUI";
import { driverLicence } from "../../contants/drivingLicence";
import { DriverTypes } from "../../types/drivers";
import { VehicleFromFirebase, VehicleTypes } from "@/app/types/vehicles";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

//formulario para agregar vehiculos

const EditVehicleForm = ({ value }: { value: VehicleFromFirebase }) => {
  // se inicializan los valores del formulario con los valores actuales del vehiculo mas el avatar su valor inicial sera el valor de la imageUrl
  const [avatar, setAvatar] = useState<string>(value.imageUrl);
  const [form] = Form.useForm();

  const onFinish = async (values: VehicleTypes) => {
    if (avatar.length === 0) {
      message.error("Debes subir una imagen");
      return;
    }

    try {
      // despues de evaluar que la imagen no este vacia se agrega el vehiculos a la base de datos
      const ruta = doc(db, "vehiculos", value.idDoc);
      await updateDoc(ruta, {
        imageUrl: form.getFieldValue("imageUrl"),
        brand: form.getFieldValue("brand"),
        model: form.getFieldValue("model"),
        year: form.getFieldValue("year"),
        vehiclePlate: form.getFieldValue("vehiclePlate"),
        vehicleCapacity: form.getFieldValue("vehicleCapacity"),
        typeOfVehicle: form.getFieldValue("typeOfVehicle"),
      });
      message.success("Vehículo actualizado");
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
      <Form.Item
        initialValue={value.imageUrl}
        name="imageUrl"
        label="Foto del vehiculo"
      >
        <UploadImageComponent avatar={avatar} setAvatar={handleGetAvatar} />
      </Form.Item>
      <Form.Item
        initialValue={value.brand}
        name="brand"
        label="Marca "
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={value.model}
        name="model"
        label="Modelo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={value.year}
        name="year"
        label="Año"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={value.vehiclePlate}
        name="vehiclePlate"
        label="Placa del Vehiculo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={value.vehicleCapacity}
        name="vehicleCapacity"
        label="Capacidad del Vehiculo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={value.typeOfVehicle}
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

export default EditVehicleForm;
