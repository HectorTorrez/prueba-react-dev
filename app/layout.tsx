import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import StyledComponentsRegistry from "./lib/registry";
import Navbar from "./components/nav";
const inter = Inter({ subsets: ["latin"] });
import esES from "antd/locale/es_ES";
import { ConfigProvider } from "antd";
import NavbarAnt from "./components/navbar";

export const metadata: Metadata = {
  title: "Rutas",
  description: "Rutas de la empresa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ maxWidth: "80%", margin: "auto" }}
      >
        <AntdRegistry>
          <ConfigProvider locale={esES}>
            <StyledComponentsRegistry>
              <NavbarAnt />
              {children}
            </StyledComponentsRegistry>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
