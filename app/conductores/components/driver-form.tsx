"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import UploadImageComponent from "../../components/upload-image";
import { validateDUI } from "../../helpers/validateDUI";
import { driverLicence } from "../../contants/drivingLicence";
import { DriverTypes } from "../../types/drivers";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const DriverForm = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [form] = Form.useForm();

  const onFinish = async (values: DriverTypes) => {
    if (avatar.length === 0) {
      message.error("Debes subir una imagen");
      return;
    }

    try {
      await addDoc(collection(db, "conductores"), {
        id: crypto.randomUUID(),
        state: true,
        imageUrl: avatar,
        name: values.name,
        dui: values.dui,
        address: values.address,
        age: values.age,
        licence: values.licence,
        phone: values.phone,
        email: values.email,
        key: crypto.randomUUID(),
      });
      message.success("Conductor agregado");
      location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("Error al agregar el conductor");
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
      <Form.Item name="imageUrl" label="Foto de Perfil">
        <UploadImageComponent avatar={avatar} setAvatar={handleGetAvatar} />
      </Form.Item>
      <Form.Item name="name" label="Nombre " rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="dui"
        label="DUI"
        rules={[
          { required: true },
          { validator: validateDUI, message: "DUI no válido" },
        ]}
      >
        <Input placeholder="00000000-0" />
      </Form.Item>
      <Form.Item name="address" label="Dirección" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Edad" rules={[{ required: true, max: 2 }]}>
        <Input type="number" maxLength={2} />
      </Form.Item>
      <Form.Item name="licence" label="Licencia" rules={[{ required: true }]}>
        <Select placeholder="Selecciona una licencia" allowClear>
          {driverLicence.map((type) => (
            <Select.Option key={type.value} value={type.value}>
              {type.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="phone"
        label="Teléfono"
        rules={[{ required: true, max: 8 }]}
      >
        <Input type="number" maxLength={8} />
      </Form.Item>
      <Form.Item name="email" label="Correo" rules={[{ required: true }]}>
        <Input type="email" />
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

export default DriverForm;
