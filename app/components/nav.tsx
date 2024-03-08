"use client";
import React from "react";
import { Anchor } from "antd";

const Navbar = () => {
  const onChange = (link: string) => {
    console.log("Anchor:OnChange", link);
  };

  return (
    <Anchor
      affix={false}
      onChange={onChange}
      items={[
        {
          key: "1",
          href: "/",
          title: "Basic demo",
        },
      ]}
      direction="horizontal"
      style={{ display: "flex", justifyContent: "end" }}
    />
  );
};

export default Navbar;
