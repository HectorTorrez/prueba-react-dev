"use client";
import React, { useState } from "react";
import { Button, Form, Input, Space, message } from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import UploadImageComponent from "../../components/upload-image";

import { VehicleFromFirebase, VehicleTypes } from "@/app/types/vehicles";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

//formulario para agregar vehiculos
// este componente recibe un parametro opcional value  para poder editar una vehiculo
// estos valores se pasan al formulario para que el usuario pueda editarlos en el parametro initialValue
// este recibe un booleado isEdit para saber si se esta editando o creando un nuevo vehiculo
const VehicleForm = ({
  values,
  isEdit,
}: {
  values?: VehicleFromFirebase;
  isEdit: boolean;
}) => {
  const [avatar, setAvatar] = useState<string>(values?.imageUrl ?? "");
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

  const onEdit = async () => {
    if (avatar.length === 0) {
      message.error("Debes subir una imagen");
      return;
    }
    if (!values) return;
    try {
      // despues de evaluar que la imagen no este vacia se agrega el vehiculos a la base de datos
      const route = doc(db, "vehiculos", values.idDoc);
      await updateDoc(route, {
        imageUrl: avatar,
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
    isEdit ? setAvatar(values?.imageUrl ?? "") : setAvatar("");
  };

  const handleGetAvatar = (url: string) => {
    setAvatar(url);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={isEdit ? onEdit : onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        initialValue={values?.imageUrl ?? ""}
        name="imageUrl"
        label="Foto del vehiculo"
      >
        <UploadImageComponent avatar={avatar} setAvatar={handleGetAvatar} />
      </Form.Item>
      <Form.Item
        initialValue={values?.brand ?? ""}
        name="brand"
        label="Marca "
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={values?.model ?? ""}
        name="model"
        label="Modelo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={values?.year ?? ""}
        name="year"
        label="Año"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={values?.vehiclePlate ?? ""}
        name="vehiclePlate"
        label="Placa del Vehiculo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={values?.vehicleCapacity ?? ""}
        name="vehicleCapacity"
        label="Capacidad del Vehiculo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={values?.typeOfVehicle ?? ""}
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
