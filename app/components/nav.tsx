"use client";
import React from "react";
import { Anchor } from "antd";
import { navRoutes } from "../contants/navRoutes";

const Navbar = () => {
  const onChange = (link: string) => {
    console.log("Anchor:OnChange", link);
  };

  return (
    <Anchor
      affix={false}
      onChange={onChange}
      items={navRoutes}
      direction="horizontal"
      style={{ display: "flex", justifyContent: "end" }}
    />
  );
};

export default Navbar;
