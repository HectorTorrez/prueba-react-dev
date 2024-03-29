import React from "react";
import ModalComponent from "../components/modal";
import CarForm from "./components/vehicle-form";
import SectionLayout from "../components/section-layout";
import Title from "antd/es/typography/Title";
import { BUTTONS_ADD_WIDTH } from "../contants/styles";
import { getVehicles } from "../api/getVehiclesFromFirebase";
import { vehicleColumns } from "./constants/vehicles-columns";
import TableComponent from "../components/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehículos",
  description: "Vehículos de la empresa",
};

export const fetchCache = "force-no-store";
export const revalidate = 0;

export const dynamic = "force-dynamic";

export default async function page() {
  const vehiclesData = await getVehicles();

  return (
    <section>
      <Title level={2} style={{ marginTop: "10px" }}>
        Vehiculos
      </Title>
      <SectionLayout>
        <ModalComponent
          width="700px"
          text="Agrega un nuevo vehículo"
          title="Agrega un nuevo vehículo"
          buttonType="primary"
          buttonWidth={BUTTONS_ADD_WIDTH}
        >
          <CarForm isEdit={false} />
        </ModalComponent>
        <TableComponent
          pagination={undefined}
          data={vehiclesData}
          columns={vehicleColumns}
        />
      </SectionLayout>
    </section>
  );
}
