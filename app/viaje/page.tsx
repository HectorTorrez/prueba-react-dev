import React from "react";
import SectionLayout from "../components/section-layout";
import Title from "antd/es/typography/Title";
import ModalComponent from "../components/modal";
import { BUTTONS_ADD_WIDTH } from "../contants/styles";
import { getShipments } from "../api/getDataFromFirebase";
import ShipmentForm from "./components/shipment-form";
import TableComponent from "../components/table";
import { shipmentColumns } from "./constants/shipment-columns";

export default async function ShipmentPage() {
  const shipments = await getShipments();

  return (
    <section>
      <Title level={2} style={{ marginTop: "10px" }}>
        Viajes
      </Title>
      <SectionLayout>
        <ModalComponent
          width="700px"
          text="Agrega un nuevo viaje"
          title="Agrega un  viaje"
          buttonType="primary"
          buttonWidth={BUTTONS_ADD_WIDTH}
        >
          <ShipmentForm isEdit={false} />
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
