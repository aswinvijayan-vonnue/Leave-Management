import api from "../api/api";
import axios from "axios";

export async function login(email: string, password: string) {
  try {
    const res = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.payload.token);
    return res.data.payload;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data.message ?? "Login failed,Please try again";
      throw new Error(`${message}`,{cause:err})
    } 
    throw new Error("Unexpected error",{cause:err})
  }
}

export function logout() {
  localStorage.removeItem("token");
}
