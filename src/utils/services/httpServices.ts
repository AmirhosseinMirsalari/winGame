import axios from "axios";

const BASE_URL = "https://wingamebackend.onrender.com/api";

const app = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err)
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
