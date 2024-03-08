import React from "react";
import { Image } from "antd";

type ImageComponentProps = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

const ImageComponent = ({ url, alt, width, height }: ImageComponentProps) => (
  <Image alt={url + alt} width={width} src={url} height={height} />
);

export default ImageComponent;
