import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

interface SignUpData {
  name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  email: string;
  phone: string;
  password: string;
}

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: SignUpData) => {
      return axios.post("/authentication/sign-up", data);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return axios.post("/authentication/sign-in", data);
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data.access_token);
    },
  });
};
