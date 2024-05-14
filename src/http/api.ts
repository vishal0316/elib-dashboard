import axios from "axios";

const api = axios.create({
  // env
  baseURL: "http://localhost:5513/",
  headers: {
    "content-type": "application/json",
  },
});

export const login = async (data: { email: string; password: string }) => {
  return api.post("/api/users/login", data);
};
