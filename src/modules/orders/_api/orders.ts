import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { OrderData } from "../types/order";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (data: OrderData) => {
      return axios.post("/orders", data);
    },
  });
};