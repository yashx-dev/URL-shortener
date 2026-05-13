import api from "./api.js";

const register = async (data) => {
  const respose = await api.post("/auth/register", data);
  return respose.data;
};
const login = async (data) => {
  const respose = await api.post("/auth/login", data);
  return respose.data;
};
const logout = async () => {
  const respose = await api.post("/auth/logout");
  return respose.data;
};
const profile = async () => {
  const respose = await api.get("/auth/profile");
  return respose.data;
};
const updateProfile = async (data) => {
  const respose = await api.put("/auth/profile", data);
  return respose.data;
};

export { register, login, logout, profile, updateProfile };
