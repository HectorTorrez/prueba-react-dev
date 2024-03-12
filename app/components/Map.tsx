"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import React from "react";
import { message } from "antd";

// el api key esta aqui por el momento ya que tomtom da error de cors y no deja hacer peticiones desde el localhost
// se cambiara cuando se suba a produccion
const API_KEY = process.env.NEXT_PUBLIC_API_KEY_TOMTOM;

// Todas las importaciones estan dentro de la funcion para que no se carguen hasta que se llame a la funcion
// ya que tomtom tiene problemas con el server side rendering de next a pesar de que este es un 'use client'
// por eso algunos tipados estan como any

const EL_SALVADOR: [number, number] = [-88.89653, 13.794185];

// recibe dos ciudades y muestra un mapa con la ruta entre ellas
const MapComponent = React.memo(function MemoMapComponent({
  firstCity,
  secondCity,
}: {
  firstCity: string;
  secondCity: string;
}) {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any>([]);
  const [centerCity, setCenterCity] = useState<[number, number]>();

  useEffect(() => {
    // se hace el llamado a la api de tomtom para cargar el mapa
    const init = async () => {
      const tt = await import("@tomtom-international/web-sdk-maps");
      if (mapElement.current) {
        const map = tt.map({
          key: API_KEY ?? "",
          container: mapElement.current,
          center: centerCity ?? EL_SALVADOR,
          zoom: 10,
        });
        setMap(map);
        return () => {
          map.remove();
          return;
        };
      }
    };
    init();
  }, [centerCity]);

  useEffect(() => {
    //Aqui se hace la peticion a la api de tomtom para obtener la latitud y longitud de las ciudades
    // y se crean los marcadores en el mapa
    // el warning de las dependencias se ignora ya que no se pueden poner las dependencias en el arreglo por que se crean un loop y hace muchos llamados a la api
    const init = async () => {
      const tt = await import("@tomtom-international/web-sdk-maps");

      const { services } = await import(
        "@tomtom-international/web-sdk-services"
      );
      services
        .geocode({
          key: API_KEY ?? "",
          query: `${firstCity}, El Salvador`,
        })
        .then((result) => {
          const { lat, lng } = result.results[0].position;
          const marker = new tt.Marker().setLngLat([lng, lat]);
          if (map) {
            marker.addTo(map);
          }

          const lngLat = marker.getLngLat();
          setCenterCity([lngLat.lng, lngLat.lat]);
          setMarkers((prevMarkers: any) => [...prevMarkers, marker]);
        });
      services
        .geocode({
          key: API_KEY ?? "",
          query: `${secondCity}, El Salvador`,
        })
        .then((result) => {
          const { lat, lng } = result.results[0].position;
          const marker = new tt.Marker().setLngLat([lng, lat]);
          if (map) {
            marker.addTo(map);
          }
          setMarkers((prevMarkers: any) => [...prevMarkers, marker]);
        });
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateRoute = useCallback(
    // aqui recibe el color de la ruta y las opciones de la ruta para poder calcularla y trasarla en el mapa
    async (color: string, routeOptions: any) => {
      const { services } = await import(
        "@tomtom-international/web-sdk-services"
      );
      try {
        const response = await services.calculateRoute(routeOptions);
        const geojson = response.toGeoJson();

        if (map) {
          map.addLayer({
            id: crypto.randomUUID(),
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            paint: {
              "line-color": color,
              "line-width": 6,
            },
          });
        }
      } catch (error) {
        console.error("Error : ", error);
        message.error("Error calculando la ruta");
      }
    },
    [map]
  );

  const route = useCallback(() => {
    // aqui se calcula la ruta entre los dos marcadores
    if (markers.length < 2) return;

    const key = API_KEY;
    const locations = markers.map((marker: { getLngLat: () => any }) =>
      marker.getLngLat()
    );

    calculateRoute("blue", {
      key,
      locations,
    });
  }, [markers, calculateRoute]);

  useEffect(() => {
    route();
  }, [markers, route]);

  return (
    <div className="App">
      <div
        style={{ minHeight: "500px", height: "100%", width: "100%" }}
        ref={mapElement}
        className="mapDiv"
      ></div>
    </div>
  );
});

export default MapComponent;
