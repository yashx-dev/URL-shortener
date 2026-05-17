import api from "./api.js";

const createUrl = async (data) => {
  const response = await api.post("/urls/shorten", data);
  return response.data;
};
const getUrls = async () => {
  const response = await api.get("/urls/my-urls");
  return response.data;
};
const deleteUrl = async (shortCode) => {
  const response = await api.delete(`/urls/my-urls/${shortCode}`);
  return response.data;
};

export { createUrl, getUrls, deleteUrl };
