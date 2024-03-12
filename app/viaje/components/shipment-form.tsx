"use client";
import React, { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  TimePicker,
  message,
} from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ShipmentTypes, ShipmentTypesFromFirebase } from "@/app/types/shipment";
import { db } from "@/app/firebase/firebase";

import dayjs from "dayjs";
import useGetRoutes from "@/app/hooks/useGetActiveRoutes";
import useGetActiveDriver from "@/app/hooks/useGetActiveDrivers";
import useGetActiveVehicle from "@/app/hooks/useGetActiveVehicle";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// Formulario para agregar viajes
// este componente recibe un parametro opcional value que es de tipo ShipmentTypesFromFirebase para poder editar un viaje
// estos valores se pasan al formulario para que el usuario pueda editarlos en el parametro initialValue
// este recibe un booleado isEdit para saber si se esta editando o creando una nueva ruta
// ademas recibe tres arreglos drivers, vehicles y routes para poder seleccionar un conductor, vehiculo y ruta los cuales ya son filtrados para mostrar solo los activos
const ShipmentForm = ({
  values,
  isEdit,
}: {
  values?: ShipmentTypesFromFirebase;
  isEdit: boolean;
}) => {
  const [form] = Form.useForm();

  const routes = useGetRoutes();
  const drivers = useGetActiveDriver();
  const vehicles = useGetActiveVehicle();

  const onFinish = async (values: ShipmentTypes) => {
    // convierto las fechas y horas a objetos Date para poder guardarlas en la base de datos enviandolas como toISOString
    const dateArrival = new Date(values.dateArrival);
    const timeArrival = new Date(values.timeArrival);
    const dateCollection = new Date(values.dateCollection);
    const timeCollection = new Date(values.timeCollection);

    try {
      await addDoc(collection(db, "viajes"), {
        id: crypto.randomUUID(),
        name: values.name,
        dateCollection: dateCollection.toISOString(),
        timeCollection: timeCollection.toISOString(),
        timeArrival: timeArrival.toISOString(),
        dateArrival: dateArrival.toISOString(),
        driver: values.driver,
        vehicle: values.vehicle,
        route: values.route,
        key: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
      message.success("Viaje agregado");
      location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("Error al agregar el viaje");
    }
  };

  const onEdit = async () => {
    // convierto las fechas y horas a objetos Date para poder guardarlas en la base de datos enviandolas como toISOString
    const dateArrival = new Date(form.getFieldValue("dateArrival"));
    const timeArrival = new Date(form.getFieldValue("timeArrival"));
    const dateCollection = new Date(form.getFieldValue("dateCollection"));
    const timeCollection = new Date(form.getFieldValue("timeCollection"));
    if (!values) {
      message.error("Error al obtener el viaje");
      return;
    }

    const ruta = doc(db, "viajes", values.idDoc);
    try {
      await updateDoc(ruta, {
        name: form.getFieldValue("name"),
        dateCollection: dateCollection.toISOString(),
        timeCollection: timeCollection.toISOString(),
        timeArrival: timeArrival.toISOString(),
        dateArrival: dateArrival.toISOString(),
        driver: form.getFieldValue("driver"),
        vehicle: form.getFieldValue("vehicle"),
        route: form.getFieldValue("route"),
      });
      message.success("Viaje actualizado");
      location.reload();
    } catch (error) {
      console.error("Error updating document: ", error);
      message.error("Error al actualizar el viaje");
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
      onFinish={isEdit ? onEdit : onFinish}
      style={{ maxWidth: 600, margin: "auto" }}
    >
      <Form.Item
        initialValue={values?.name ?? ""}
        name="name"
        label="Nombre del viaje"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="dateCollection"
        label="Fecha de recogida"
        rules={[{ required: true }]}
        // para el initial value, utilice dayjs para formatear la fecha, ya que el new Date() no trae por defecto una propiedad isValid que me permita saber si la fecha es valida, ya que como desde la base de datos se trae un string, debo de convertirlo a objecto Date para poder pasarselo como initialValue al DatePicker y asi poder editar la fecha
        initialValue={
          values?.dateCollection ? dayjs(values.dateCollection) : null
        }
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="timeCollection"
        label="Hora de recogida"
        rules={[{ required: true }]}
        initialValue={
          values?.timeCollection ? dayjs(values.timeCollection) : null
        }
      >
        <TimePicker format="hh:mm A" />
      </Form.Item>

      <Form.Item
        name="dateArrival"
        label="Fecha de llegada"
        rules={[{ required: true }]}
        initialValue={values?.dateArrival ? dayjs(values.dateArrival) : null}
      >
        <DatePicker />
      </Form.Item>
      {/* <Form.Item
        name="dateArrival"
        label="Fecha de llegada"
        rules={[{ required: true }]}
        initialValue={values?.dateTimeArrival ?? ""}
      >
        <DatePicker showTime format="DD/MM/YY" />
      </Form.Item> */}
      <Form.Item
        name="timeArrival"
        label="Hora de llegada"
        rules={[{ required: true }]}
        initialValue={values?.timeArrival ? dayjs(values.timeArrival) : null}
      >
        <TimePicker format="hh:mm A" />
      </Form.Item>
      <Form.Item
        name="driver"
        label="Seleccionar un conductor "
        rules={[{ required: true }]}
        initialValue={values?.driver ?? null}
      >
        <Select placeholder="Selecciona una conductor" allowClear>
          {drivers?.map((type) => (
            <Select.Option key={type.id} value={type.name}>
              {type.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="vehicle"
        label="Seleccionar un vehículo"
        rules={[{ required: true }]}
        initialValue={values?.vehicle ?? null}
      >
        <Select placeholder="Selecciona un vehículo" allowClear>
          {vehicles?.map((type) => (
            <Select.Option key={type.id} value={type.brand}>
              {type.brand}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="route"
        label="Seleccionar una ruta"
        rules={[{ required: true }]}
        initialValue={values?.route ?? null}
      >
        <Select placeholder="Selecciona una ruta" allowClear>
          {routes?.map((type) => (
            <Select.Option key={type.id} value={type.name}>
              {type.name}
            </Select.Option>
          ))}
        </Select>
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

export default ShipmentForm;
