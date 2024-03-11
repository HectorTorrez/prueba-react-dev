"use client";
import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    label: (
      <Link href="/" rel="noopener noreferrer">
        Rutas
      </Link>
    ),
    key: "routes",
  },
  {
    label: (
      <Link href="/conductores" rel="noopener noreferrer">
        Conductores
      </Link>
    ),
    key: "conductores",
  },
  {
    label: (
      <Link href="/vehiculos" rel="noopener noreferrer">
        Vehículos
      </Link>
    ),
    key: "vehiculos",
  },
  {
    label: (
      <Link href="/viaje" rel="noopener noreferrer">
        Viajes
      </Link>
    ),
    key: "viaje",
  },
];

const NavbarAnt: React.FC = () => {
  return <Menu mode="horizontal" items={items} />;
};

export default NavbarAnt;
