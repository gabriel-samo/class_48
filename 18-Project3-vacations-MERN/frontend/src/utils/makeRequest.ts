import axios from "axios";

export const makeRequest = (token?: string) =>
  axios.create({
    baseURL: "http://localhost:8000",
    headers: { Authorization: token }
  });
