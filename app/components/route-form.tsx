"use client";
import React from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { addDoc, collection } from "firebase/firestore";
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

const RouteForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await addDoc(collection(db, "rutas"), {
        id: crypto.randomUUID(),
        state: true,
        name: values.name,
        type: values.type,
        origin: values.origin,
        destiny: values.destiny,
        key: crypto.randomUUID(),
      });
      message.success("Ruta agregada");
      location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("Error al agregar la ruta");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="type" label="Tipo de ruta" rules={[{ required: true }]}>
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
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="origin"
        label="Origen de la ruta"
        rules={[{ required: true }]}
      >
        <Input type="url" />
      </Form.Item>
      <Form.Item
        name="destiny"
        label="Destino de la ruta"
        rules={[{ required: true }]}
      >
        <Input type="url" />
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

export default RouteForm;
