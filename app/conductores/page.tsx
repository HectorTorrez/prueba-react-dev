import React from "react";
import ModalComponent from "../components/modal";
import TableComponent from "../components/table";
import DriverForm from "./components/driver-form";
import { getDrivers } from "../api/route";
import { driverColumns } from "./constants/driversColumns";

export default async function DriversPage() {
  const driversData = await getDrivers();

  return (
    <section>
      <p>Conductores</p>
      <section>
        <section>
          <ModalComponent
            text="Agrega un nuevo conductor"
            title="Agrega un nuevo conductor"
          >
            <DriverForm />
          </ModalComponent>
        </section>
        <TableComponent data={driversData} columns={driverColumns} />
      </section>
    </section>
  );
}
