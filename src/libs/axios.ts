import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

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
        localStorage.removeItem("access_token");
        window.location.href = "/auth/sign-in";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post("/authentication/refresh-token");
        const newToken = refreshResponse.data.access_token;
        
        localStorage.setItem("access_token", newToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        
        processQueue(null, newToken);
        
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("access_token");
        window.location.href = "/auth/sign-in";
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
