import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
      statusCode?: number;
    }>;

    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  // Default fallback message
  return "Ha ocurrido un error";
};
