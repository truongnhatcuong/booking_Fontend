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
    const customError = {
      message: error.message || "Lỗi không xác định khi gửi request",
      config: error.config,
      original: error,
      status: error.response?.status || 500,
    };

    console.error("[Request Error]", customError);
    return Promise.reject(customError);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("[Response]", response);
    return response;
  },
  (error) => {
    console.error("[Response Error]", error);

    // Trích xuất thông tin lỗi từ response
    const customError = {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi không xác định",
      data: error.response?.data || null,
      original: error, // giữ nguyên lỗi gốc nếu cần debug
    };

    return Promise.reject(customError);
  }
);

export default axiosInstance;
