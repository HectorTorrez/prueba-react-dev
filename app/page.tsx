import TableComponent from "./components/table";
import ModalComponent from "./components/modal";
import RouteForm from "./components/route-form";
import { getData } from "./api/route";
import { columns } from "./components/routesColumns";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export const dynamic = "force-dynamic";

export default async function Home() {
  const routesData = await getData();

  return (
    <section>
      <p>Rutas</p>
      <section>
        <section>
          <ModalComponent
            buttonType="primary"
            text="Crea una nueva ruta"
            title="Agrega una nueva ruta"
          >
            <RouteForm />
          </ModalComponent>
        </section>
        <TableComponent
          pagination={undefined}
          columns={columns as any}
          data={routesData}
        />
      </section>
    </section>
  );
}
