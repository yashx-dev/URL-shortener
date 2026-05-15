import api from "./api.js";

const userRegister = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
const userLogin = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
const userLogout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
const userProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
const userUpdateProfile = async (data) => {
  const response = await api.put("/auth/profile", data);
  return response.data;
};

export { userRegister, userLogin, userLogout, userProfile, userUpdateProfile };
