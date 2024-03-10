"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";

// modal reutilizable
const ModalComponent = ({
  children,
  text,
  title,
  buttonType,
  width,
  buttonWidth,
}: {
  children: React.ReactNode;
  text: string | React.ReactNode;
  title: string | React.ReactNode;
  buttonType?: "primary" | "default" | "dashed" | "link" | "text";
  buttonWidth: string;
  width: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        style={{ width: buttonWidth }}
        type={buttonType}
        onClick={showModal}
      >
        {text}
      </Button>
      <Modal
        style={{ overflow: "hidden" }}
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
