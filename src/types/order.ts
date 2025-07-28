export interface Order {
  id: number;
  customerName: string;
  freight: number;
  shipName: string;
  shipCountry: string;
}

export interface OrderFormData {
  customerName: string;
  freight: string;
  shipName: string;
  shipCountry: string;
}