import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const redirectToSignIn = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    console.log("Redirecting to sign-in page...");
    // Force a hard redirect to clear all state
    window.location.replace("/auth/sign-in");
  }
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const token = localStorage.getItem("access_token");

      if (!token) {
        redirectToSignIn();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Create a new axios instance for refresh to avoid interceptor conflicts
        const refreshAxios = Axios.create({
          baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        });
        
        const refreshResponse = await refreshAxios.post(
          "/authentication/refresh-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newToken = refreshResponse.data.access_token;

        localStorage.setItem("access_token", newToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return axios(originalRequest);
      } catch (refreshError: unknown) {
        console.log("Refresh token failed:", refreshError);
        processQueue(refreshError, null);
        
        // If refresh token fails (including 401), redirect to sign-in
        redirectToSignIn();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
