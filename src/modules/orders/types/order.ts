export interface OrderItem {
  width: number;
  height: number;
  length: number;
  content: string;
  weight: number;
}

export interface OrderData {
  items: OrderItem[];
  pickup_address: string;
  programmed_date: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  deliver_address: string;
  city: string;
  municipality: string;
  reference_place: string;
  indications: string;
}

export interface OrderFormStep1Data {
  pickup_address: string;
  programmed_date: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  deliver_address: string;
  city: string;
  municipality: string;
  reference_place: string;
  indications: string;
}

export interface OrderFormStep2Data {
  items: OrderItem[];
}