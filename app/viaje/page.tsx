import React from "react";
import SectionLayout from "../components/section-layout";
import Title from "antd/es/typography/Title";
import ModalComponent from "../components/modal";
import { BUTTONS_ADD_WIDTH } from "../contants/styles";
import {
  getActiveDrivers,
  getActiveRoutes,
  getActiveVehicles,
  getShipments,
} from "../api/route";
import ShipmentForm from "./components/shipment-form";
import TableComponent from "../components/table";
import { shipmentColumns } from "./constants/shipment-columns";

export default async function ShipmentPage() {
  const activeRoutes = await getActiveRoutes();
  const activeDrivers = await getActiveDrivers();
  const activeVehicles = await getActiveVehicles();

  const shipments = await getShipments();

  return (
    <section>
      <Title level={2} style={{ marginTop: "10px" }}>
        Vehiculos
      </Title>
      <SectionLayout>
        <ModalComponent
          width="1000px"
          text="Agrega un nuevo viaje"
          title="Agrega un  viaje"
          buttonType="primary"
          buttonWidth={BUTTONS_ADD_WIDTH}
        >
          <ShipmentForm
            isEdit={false}
            routes={activeRoutes}
            drivers={activeDrivers}
            vehicles={activeVehicles}
          />
        </ModalComponent>
        <TableComponent
          pagination={undefined}
          data={shipments}
          columns={shipmentColumns as []}
        />
      </SectionLayout>
    </section>
  );
}
