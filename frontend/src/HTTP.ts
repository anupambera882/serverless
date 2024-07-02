import axios from "axios";
import { BACKEND_URL } from "./config";
import { Response } from "./types/interface";

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "DELETE, POST, GET";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With";
axios.defaults.baseURL = BACKEND_URL;

export const HTTP = axios.create({
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const resp = await HTTP.get("api/v1/auth/access-token");
    return resp.data;
  } catch (e) {
    console.log("Error", e);
  }
};

export const PRIVATE_HTTP = axios.create({
  withCredentials: true,
});

PRIVATE_HTTP.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { response } = await refreshToken() as Response<{ accessToken: string }>;

      localStorage.setItem("token", response.accessToken);
      PRIVATE_HTTP.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.accessToken}`;
      originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
      return PRIVATE_HTTP(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default PRIVATE_HTTP;
