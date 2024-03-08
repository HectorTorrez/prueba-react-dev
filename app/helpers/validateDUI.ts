import { RuleObject } from "antd/es/form";

// Esta funcion valida el formato de un DUI
export const validateDUI = (_: RuleObject, value: string) => {
  const regex = /^\d{8}-\d$/;
  if (!value || regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("Por favor, ingresa un número de DUI válido");
};
