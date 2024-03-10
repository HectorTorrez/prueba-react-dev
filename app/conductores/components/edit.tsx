"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { driverLicence } from "@/app/contants/drivingLicence";
import { validateDUI } from "@/app/helpers/validateDUI";
import UploadImageComponent from "@/app/components/upload-image";
import { DriverTypesFromFirebase } from "@/app/types/drivers";
import { db } from "@/app/firebase/firebase";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const EditDriversForm = ({ value }: { value: DriverTypesFromFirebase }) => {
  const [avatar, setAvatar] = useState<string>(value.imageUrl);
  const [form] = Form.useForm();

  const onFinish = async () => {
    const ruta = doc(db, "conductores", value.idDoc);
    try {
      // se envian los datos editados a la base de datos en firebase
      await updateDoc(ruta, {
        imageUrl: form.getFieldValue("imageUrl"),
        name: form.getFieldValue("name"),
        dui: form.getFieldValue("dui"),
        address: form.getFieldValue("address"),
        age: form.getFieldValue("age"),
        licence: form.getFieldValue("licence"),
        phone: form.getFieldValue("phone"),
        email: form.getFieldValue("email"),
      });
      message.success("Ruta actualizada");
      location.reload();
    } catch (error) {}
  };

  const onReset = () => {
    form.resetFields();
    setAvatar(value.imageUrl);
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
        name="imageUrl"
        initialValue={value.imageUrl}
        label="Foto de Perfil"
      >
        <UploadImageComponent avatar={avatar} setAvatar={setAvatar} />
        {/* {avatar.length === 0 && (
          <p style={{ color: "red" }}>Debes subir una imagen</p>
        )} */}
      </Form.Item>
      <Form.Item
        initialValue={value.name}
        name="name"
        label="Nombre "
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={value.dui}
        name="dui"
        label="DUI"
        rules={[
          { required: true },
          { validator: validateDUI, message: "DUI no válido" },
        ]}
      >
        <Input placeholder="00000000-0" />
      </Form.Item>
      <Form.Item
        initialValue={value.address}
        name="address"
        label="Dirección"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={value.age}
        name="age"
        label="Edad"
        rules={[{ required: true, max: 2 }]}
      >
        <Input type="number" maxLength={2} />
      </Form.Item>
      <Form.Item
        initialValue={value.licence.toLowerCase()}
        name="licence"
        label="Licencia"
        rules={[{ required: true }]}
      >
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
        initialValue={value.phone}
        rules={[{ required: true, max: 8 }]}
      >
        <Input type="number" maxLength={8} />
      </Form.Item>
      <Form.Item
        initialValue={value.email}
        name="email"
        label="Correo"
        rules={[{ required: true }]}
      >
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

export default EditDriversForm;
