"use client";
import React from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { RouteFromFirebase } from "../types/routes";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { typeOfTravel } from "../contants/typeOfTravel";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// Formulario para editar rutas
const EditForm = ({ value }: { value: RouteFromFirebase }) => {
  const [form] = Form.useForm();

  const onFinish = async () => {
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
      name={value.key}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        initialValue={value.type.toLowerCase()}
        name="type"
        label="Tipo de ruta"
        rules={[{ required: true }]}
      >
        <Select placeholder="Seleciona un tipo de ruta" allowClear>
          {typeOfTravel.map((type) => (
            <Option key={type.value} value={type.value}>
              {type.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombre de la ruta"
        rules={[{ required: true }]}
        initialValue={value.name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="origin"
        label="Origen de la ruta"
        rules={[{ required: true }]}
        initialValue={value.origin}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="destiny"
        label="Destino de la ruta"
        rules={[{ required: true }]}
        initialValue={value.destiny}
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

export default EditForm;
