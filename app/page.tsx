import TableComponent from "./components/table";
import ModalComponent from "./components/modal";
import RouteForm from "./components/route-form";
import { getData } from "./api/route";
import { columns } from "./contants/routesConstants/routesColumns";
import SectionLayout from "./components/section-layout";
import { BUTTONS_ADD_WIDTH } from "./contants/styles";
import Title from "antd/es/typography/Title";
import { Metadata } from "next";
import { RouteFromFirebase } from "./types/routes";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rutas",
  description: "Rutas de la empresa",
};

export default async function Home() {
  const routesData = await getData();

  return (
    <section>
      <Title level={2} style={{ marginTop: "10px" }}>
        Rutas
      </Title>
      <SectionLayout>
        <ModalComponent
          buttonType="primary"
          text="Crea una nueva ruta"
          title="Agrega una nueva ruta"
          buttonWidth={BUTTONS_ADD_WIDTH}
          width="1000px"
        >
          <RouteForm isEdit={false} />
        </ModalComponent>

        <TableComponent
          pagination={undefined}
          columns={columns as []}
          data={routesData}
        />
      </SectionLayout>
    </section>
  );
}
