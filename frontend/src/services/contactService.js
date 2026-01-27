import api from "./api";

// Submit contact form
export const submitContact = async (formData) => {
  const response = await api.post("/contact", formData);
  return response.data;
};
