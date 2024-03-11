export interface ShipmentTypes {
  name: string;
  dateTimeCollection: string;
  dateTimeArrival: string;
  driver: string;
  vehicle: string;
  route: string;
  id: string;
  key: string;
  createdAt: string;
}

export interface ShipmentTypesFromFirebase extends ShipmentTypes {
  idDoc: string;
}
