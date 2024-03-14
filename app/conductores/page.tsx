import React from "react";
import ModalComponent from "../components/modal";
import TableComponent from "../components/table";
import DriverForm from "./components/driver-form";
import { getDrivers } from "../api/getDriversFromFirebase";
import { driverColumns } from "./constants/driversColumns";
import SectionLayout from "../components/section-layout";
import { BUTTONS_ADD_WIDTH } from "../contants/styles";
import Title from "antd/es/typography/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conductores",
  description: "Conductores de la empresa",
};

export const fetchCache = "force-no-store";
export const revalidate = 0;

export const dynamic = "force-dynamic";

export default async function DriversPage() {
  const driversData = await getDrivers();

  return (
    <section>
      <Title level={2} style={{ marginTop: "10px" }}>
        Conductores
      </Title>
      <SectionLayout>
        <ModalComponent
          text="Agrega un nuevo conductor"
          title="Agrega un nuevo conductor"
          buttonType="primary"
          buttonWidth={BUTTONS_ADD_WIDTH}
          width="700px"
        >
          <DriverForm isEdit={false} />
        </ModalComponent>
        <TableComponent
          pagination={undefined}
          data={driversData}
          columns={driverColumns}
        />
      </SectionLayout>
    </section>
  );
}
