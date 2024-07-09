import axios from "axios";
import { BACKEND_URL } from "./config.ts";

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "DELETE, POST, GET";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With";
axios.defaults.baseURL = BACKEND_URL;

const HTTP = axios.create({
  withCredentials: true,
});

export default HTTP;
