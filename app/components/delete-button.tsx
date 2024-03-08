"use client";
import React from "react";
import { Button, message, Popconfirm } from "antd";
import { on } from "events";

type DeleteButtonProps = {
  title: string;
  description: string;
  onDelete: () => void;
  confirmMessage: string;
  cancelMessage: string;
};

const DeleteButton = ({
  title,
  description,
  onDelete,
  confirmMessage,
  cancelMessage,
}: DeleteButtonProps) => {
  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    onDelete();
    message.success(confirmMessage);
  };

  const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e);
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
      <Button danger>Delete</Button>
    </Popconfirm>
  );
};

export default DeleteButton;
