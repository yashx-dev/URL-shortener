import api from "./api.js";

const userRegister = async (data) => {
  const respose = await api.post("/auth/register", data);
  return respose.data;
};
const userLogin = async (data) => {
  const respose = await api.post("/auth/login", data);
  return respose.data;
};
const userLogout = async () => {
  const respose = await api.post("/auth/logout");
  return respose.data;
};
const userProfile = async () => {
  const respose = await api.get("/auth/profile");
  return respose.data;
};
const userUpdateProfile = async (data) => {
  const respose = await api.put("/auth/profile", data);
  return respose.data;
};

export { userRegister, userLogin, userLogout, userProfile, userUpdateProfile };
