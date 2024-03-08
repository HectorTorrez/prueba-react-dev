"use client";
import React from "react";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navRoutes } from "../contants/navRoutes";

const NavbarWrapper = styled.nav`
  background-color: #ffffff;
  padding: 1rem;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
`;

const NavItem = styled.li`
  margin-right: 1rem;
  color: black;
`;

const active = {
  color: "red",
};

const Navbar = () => {
  const pathname = usePathname();
  return (
    <NavbarWrapper>
      <NavList>
        {navRoutes.map((route) => (
          <NavItem key={route.key}>
            <Link
              // className={`link ${pathname === route.href ? active : ""}`}
              href={route.href}
              style={{
                color: pathname === route.href ? "blue" : "black",
                borderBottom:
                  pathname === route.href ? "2px solid blue" : "none",
              }}
            >
              {route.title}
            </Link>
          </NavItem>
        ))}
      </NavList>
    </NavbarWrapper>
  );
};

export default Navbar;
