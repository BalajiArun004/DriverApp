import axios from "axios";
import { APIs } from "../config/Api";
import { authService } from "./AuthServices";
// import { Toast } from "toastify-react-native";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(undefined, (err) => {
  // Toast.error(err.message);
  return err;
});

export class ApiService {
  static getAPIConfig(endpoint) {
    console.log(
      `🚀 ~ file: api.js ~ line 17 ~ getAPIConfig ~ APIs[endpoint]`,
      APIs[endpoint]
    );
    return APIs[endpoint];
  }

  static makeAPICall = async (options) => {
    const { endpoint, body = {}, query = "", pathParam = "" } = options;
    const {
      url,
      method,
      noAuth = false,
      formData,
    } = this.getAPIConfig(endpoint);
    const token = await authService.getAuthToken();

    const header = {
      headers: {
        "x-access-token": token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": " Origin, Content-Type, X-Auth-Token",
        "Access-Control-Allow-Credentials": "true",
      },
    };
    if (formData) header.headers["Content-Type"] = "multipart/form-data";
    const response = await axiosInstance({
      url: `${url}${pathParam ? pathParam : ""}${query ? query : ""}`,
      method,
      ...(method === "get" ? {} : { data: body }),
      ...(noAuth ? {} : header),
    });
    return response;
  };
}
