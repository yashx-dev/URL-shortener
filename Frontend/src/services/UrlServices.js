import api from "./api.js";

const createUrl = async (data) => {
  const response = await api.post("/urls/shorten", data);
  return response.data;
};
const getUrls = async () => {
  const response = await api.get("/urls/my-urls");
  return response.data;
};
const deleteUrl = async (id) => {
  const response = await api.delete(`/urls/my-urls/${id}`);
  return response.data;
};

export { createUrl, getUrls, deleteUrl };
