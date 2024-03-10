export interface VehicleTypes {
  brand: string;
  model: string;
  year: string;
  vehiclePlate: string;
  vehicleCapacity: string;
  typeOfVehicle: string;
}

export interface VehicleFromFirebase extends VehicleTypes {
  imageUrl: string;
  id: string;
  idDoc: string;
  state: boolean;
}
