"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";

const ModalComponent = ({
  children,
  text,
  title,
  buttonType,
  width,
}: {
  children: React.ReactNode;
  text: string | React.ReactNode;
  title: string | React.ReactNode;
  buttonType?: "primary" | "default" | "dashed" | "link" | "text";
  width?: number | string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type={buttonType} onClick={showModal}>
        {text}
      </Button>
      <Modal
        destroyOnClose
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        width={width}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
