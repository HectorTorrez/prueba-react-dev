export interface ShipmentTypes {
  name: string;
  dateCollection: string;
  timeCollection: string;
  dateArrival: string;
  timeArrival: string;
  driver: string;
  vehicle: string;
  route: string;
  id: string;
  key: string;
  createdAt: string;
  state: boolean;
}

export interface ShipmentTypesFromFirebase extends ShipmentTypes {
  idDoc: string;
}
