import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  timeout: 10000,
});

// Interceptor: Gắn token, log request/response, handle lỗi
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("[Request]", config);
    return config;
  },
  (error) => {
    console.error("[Request Error]", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("[Response]", response);
    return response;
  },
  (error) => {
    console.error("[Response Error]", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
