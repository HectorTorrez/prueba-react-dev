export interface DataType {
  id: string;
  state: boolean;
  type: string;
  name: string;
  origin: string;
  destiny: string;
  key: string;
}

export interface RouteFromFirebase extends DataType {
  idDoc: string;
}
