import axios from "axios";
axios.defaults.withCredentials = true;
const axiosApi = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
  },
});
class Api {
  async getTokensPagination(perPage: number, page: number) {
    return await axiosApi.get(`/estate`, {
      params: {
        perPage: perPage,
        page: page,
      },
    });
  }
}
export const api = new Api();
