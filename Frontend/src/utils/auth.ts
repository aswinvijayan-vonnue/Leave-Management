import api from "../api/api";

export async function login(email: string, password: string) {
  const res = await api.post("/api/auth/login", { email, password });
  localStorage.setItem("token",res.data.payload.token);
  return res.data.payload;
}

export function logout(){
  localStorage.removeItem("token");
}
