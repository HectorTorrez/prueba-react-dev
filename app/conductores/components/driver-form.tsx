"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import UploadImageComponent from "../../components/upload-image";
import { validateDUI } from "../../helpers/validateDUI";
import { driverLicence } from "../../contants/drivingLicence";
import { DriverTypes, DriverTypesFromFirebase } from "../../types/drivers";
import { set } from "firebase/database";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

//formulario para agregar conductores
// este componente recibe un parametro opcional value  para poder editar un conductor
// estos valores se pasan al formulario para que el usuario pueda editarlos en el parametro initialValue
// este recibe un booleado isEdit para saber si se esta editando o creando un nuevo conductor
const DriverForm = ({
  values,
  isEdit,
}: {
  values?: DriverTypesFromFirebase;
  isEdit: boolean;
}) => {
  const [avatar, setAvatar] = useState<string>(values?.imageUrl ?? "");
  const [form] = Form.useForm();

  const onFinish = async (values: DriverTypes) => {
    if (avatar.length === 0) {
      message.error("Debes subir una imagen");
      return;
    }

    try {
      // despues de evaluar que la imagen no este vacia se agrega el conductor a la base de datos
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
        createdAt: new Date().toISOString(),
      });
      message.success("Conductor agregado");
      location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("Error al agregar el conductor");
    }
  };

  const onEdit = async () => {
    if (!values) return;
    const route = doc(db, "conductores", values.idDoc);
    try {
      // se envian los datos editados a la base de datos en firebase

      await updateDoc(route, {
        imageUrl: avatar,
        name: form.getFieldValue("name"),
        dui: form.getFieldValue("dui"),
        address: form.getFieldValue("address"),
        age: form.getFieldValue("age"),
        licence: form.getFieldValue("licence"),
        phone: form.getFieldValue("phone"),
        email: form.getFieldValue("email"),
      });
      message.success("Conductor actualizado");
      location.reload();
    } catch (error) {}
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
        label="Foto de Perfil"
      >
        <UploadImageComponent avatar={avatar} setAvatar={handleGetAvatar} />
      </Form.Item>
      <Form.Item
        initialValue={values?.name ?? ""}
        name="name"
        label="Nombre "
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="dui"
        label="DUI"
        rules={[
          { required: true },
          { validator: validateDUI, message: "DUI no válido" },
        ]}
        initialValue={values?.dui ?? ""}
      >
        <Input placeholder="00000000-0" />
      </Form.Item>
      <Form.Item
        initialValue={values?.address ?? ""}
        name="address"
        label="Dirección"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={values?.age ?? ""}
        name="age"
        label="Edad"
        rules={[{ required: true, max: 2 }]}
      >
        <Input type="number" maxLength={2} />
      </Form.Item>
      <Form.Item
        initialValue={values?.licence ?? null}
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
        rules={[{ required: true, max: 8 }]}
        initialValue={values?.phone ?? ""}
      >
        <Input type="number" maxLength={8} />
      </Form.Item>
      <Form.Item
        initialValue={values?.email ?? ""}
        name="email"
        label="Correo"
        rules={[{ required: true }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Editar" : "Agregar"}
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Restablecer
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default DriverForm;
