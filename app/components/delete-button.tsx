"use client";
import React from "react";
import { Button, message, Popconfirm } from "antd";

type DeleteButtonProps = {
  title: string;
  description: string;
  onDelete: () => void;
  confirmMessage: string;
  cancelMessage: string;
  buttonText: string | React.ReactNode;
  buttonType: "primary" | "default" | "dashed" | "link" | "text";
};

// componente button reutilizable para eliminar
const DeleteButton = ({
  title,
  description,
  onDelete,
  confirmMessage,
  cancelMessage,
  buttonText,
  buttonType,
}: DeleteButtonProps) => {
  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    onDelete();
    message.success(confirmMessage);
  };

  const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
    message.error(cancelMessage);
  };
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={confirm}
      onCancel={cancel}
      okText="Si"
      cancelText="No"
    >
      <Button type={buttonType} danger>
        {buttonText}
      </Button>
    </Popconfirm>
  );
};

export default DeleteButton;
