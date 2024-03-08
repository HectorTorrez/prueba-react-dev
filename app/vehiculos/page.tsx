import React from "react";
import ModalComponent from "../components/modal";
import CarForm from "./components/car-from";
// import TableComponent from "../components/table";

export default function page() {
  return (
    <section>
      <p>Conductores</p>
      <section>
        <section>
          <ModalComponent
            text="Agrega un nuevo conductor"
            title="Agrega un nuevo conductor"
            buttonType="primary"
            width="100px"
          >
            <CarForm />
          </ModalComponent>
        </section>
        {/* <TableComponent pagination={undefined} data={driversData} columns={driverColumns as any} /> */}
      </section>
    </section>
  );
}
