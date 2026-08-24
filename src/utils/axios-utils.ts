import axios from "axios";
import Cookies from "js-cookie";

const api = process.env.NEXT_PUBLIC_BACKEND_API;
const apiKey = process.env.NEXT_PUBLIC_BACKEND_API_KEY;

export const client = axios.create({
  baseURL: `${api}`,
  headers: {
    "x-api-key": apiKey,
  },
});

// Add request interceptor for debugging
client.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", {
      method: config.method?.toUpperCase(),
      url: (config.baseURL ?? "") + (config.url ?? ""),
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
client.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", {
      status: response.status,
      url: response.config.url ?? "",
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const request = ({ ...options }) => {
  const token = Cookies.get("accessToken");
  // Only add Authorization header if token exists and endpoint is not a public endpoint
  const publicEndpoints = ["/user/register", "/auth/login", "/user/register-business", "/auth/passcode-login"];
  const isPublicEndpoint = publicEndpoints.some(endpoint => options.url?.includes(endpoint));
  const isNoAuth = options?.noAuth === true;

  // Create a new headers object for this request
  const headers = { ...client.defaults.headers.common };

  if (token && !isPublicEndpoint && !isNoAuth) {
    headers.Authorization = `Bearer ${token}`;
  } else if (isPublicEndpoint || isNoAuth) {
    // Explicitly remove Authorization header for public endpoints
    delete headers.Authorization;
  }

  client.defaults.withCredentials = true;
  return client({
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
};

export const removeHeaderToken = (): void => {
  delete client.defaults.headers.common["Authorization"];
};
