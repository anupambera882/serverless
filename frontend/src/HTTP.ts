import axios from "axios";
import { BACKEND_URL } from "./config";

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "DELETE, POST, GET";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With";
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
axios.defaults.baseURL = BACKEND_URL;

export const HTTP = axios;
