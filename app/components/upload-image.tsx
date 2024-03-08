import { Upload, UploadProps, message } from "antd";
import { GetProp } from "antd/lib";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Tu imagen debe ser de tipo JPG o PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Tu imagen debe ser menor a 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const StyledUpload = styled(Upload)`
  & > div > span > img {
    width: 100%;
    height: 100%;
  }
`;

// componente para subir imagenes

export default function UploadImageComponent({
  setAvatar,
  avatar,
}: {
  setAvatar: (url: string) => void;
  avatar: string;
}) {
  const [imageUrl, setImageUrl] = useState<string>(avatar);
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Optienes la url de la imagen
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
        setAvatar(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Subir</div>
    </button>
  );
  return (
    <StyledUpload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      style={{ height: "100%" }}
    >
      {imageUrl ? (
        <img src={imageUrl ?? avatar} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </StyledUpload>
  );
}
