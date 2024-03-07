import TableComponent from "./components/table";
import ModalComponent from "./components/modal";
import RouteForm from "./components/route-form";
import { getData } from "./api/route";

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
            text="Crea una nueva ruta"
            title="Agrega una nueva ruta"
          >
            <RouteForm />
          </ModalComponent>
        </section>
        <TableComponent data={routesData} />
      </section>
    </section>
  );
}
