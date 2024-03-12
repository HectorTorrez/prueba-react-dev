export interface DriverTypes {
  name: string;
  dui: string;
  address: string;
  age: string;
  license: string;
  phone: string;
  email: string;
  imageUrl: string;
}

export interface DriverTypesFromFirebase extends DriverTypes {
  id: string;
  state: boolean;
  key: string;
  idDoc: string;
}
