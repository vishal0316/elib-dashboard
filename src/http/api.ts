// api.ts
import axios from "axios";
import useTokenStore from "@/store";

const api = axios.create({
  baseURL: "http://localhost:5513",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) =>
  api.post("/api/users/login", data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/api/users/register", data);

export const getBooks = async () => api.get("/api/books");

export const getBook = async (id: string) => api.get(`/api/books/${id}`);

export const createBook = async (data: FormData) =>
  api.post("/api/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const editBook = async (id: string, data: FormData) =>
  api.put(`/api/books/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteBook = async (id: string) => api.delete(`/api/books/${id}`);
