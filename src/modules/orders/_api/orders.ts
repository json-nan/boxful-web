import axios from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderData } from "../types/order";

export interface OrderItem {
  length: number;
  height: number;
  width: number;
  weight: number;
  content: string;
  status: string;
  _id: string;
}

export interface Order {
  _id: string;
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
  items: OrderItem[];
  status: string;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  __v: number;
}

interface GetOrdersParams {
  date_from?: string;
  date_to?: string;
}

export const useGetOrders = (params?: GetOrdersParams) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async (): Promise<Order[]> => {
      const searchParams = new URLSearchParams();
      if (params?.date_from) searchParams.append("date_from", params.date_from);
      if (params?.date_to) searchParams.append("date_to", params.date_to);
      
      const response = await axios.get(`/orders?${searchParams.toString()}`);
      return response.data;
    },
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (data: OrderData) => {
      return axios.post("/orders", data);
    },
  });
};