"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";

const ModalComponent = ({
  children,
  text,
  title,
}: {
  children: React.ReactNode;
  text: string;
  title: string;
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
      <Button type="primary" onClick={showModal}>
        {text}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
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
