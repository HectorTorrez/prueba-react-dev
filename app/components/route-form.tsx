"use client";
import React from "react";
import { Button, Form, Input, Space, message } from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DataType, RouteFromFirebase } from "../types/routes";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// Formulario para agregar rutas
// este componente recibe un parametro opcional value que es de tipo RouteFromFirebase para poder editar una ruta
// estos valores se pasan al formulario para que el usuario pueda editarlos en el parametro initialValue
// este recibe un booleado isEdit para saber si se esta editando o creando una nueva ruta
const RouteForm = ({
  value,
  isEdit,
}: {
  value?: RouteFromFirebase;
  isEdit: boolean;
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: DataType) => {
    try {
      await addDoc(collection(db, "rutas"), {
        id: crypto.randomUUID(),
        state: true,
        name: values.name,
        type: values.type,
        origin: values.origin,
        destiny: values.destiny,
        key: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
      message.success("Ruta agregada");
      location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("Error al agregar la ruta");
    }
  };

  const onEdit = async () => {
    if (!value) return;
    const ruta = doc(db, "rutas", value.idDoc);
    try {
      await updateDoc(ruta, {
        name: form.getFieldValue("name"),
        type: form.getFieldValue("type"),
        origin: form.getFieldValue("origin"),
        destiny: form.getFieldValue("destiny"),
      });
      message.success("Ruta actualizada");
      location.reload();
    } catch (error) {}
  };

  const onReset = () => {
    form.resetFields();
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
        initialValue={value?.type ?? ""}
        name="type"
        label="Tipo de viaje"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombre de la ruta"
        rules={[{ required: true }]}
        initialValue={value?.name ?? ""}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item
        name="origin"
        label="Origen de la ruta"
        rules={[{ required: true }]}
        initialValue={value?.origin ?? ""}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item
        name="destiny"
        label="Destino de la ruta"
        rules={[{ required: true }]}
        initialValue={value?.destiny ?? ""}
      >
        <Input maxLength={50} />
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

export default RouteForm;
