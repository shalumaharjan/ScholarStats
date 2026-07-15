import axiosInstance from "./axiosInstance";

export const login = async (username, password) => {
  const response = await axiosInstance.post("/login", {
    username,
    password,
  });

  return response.data;
};

export const register = async (username, password) => {
  const response = await axiosInstance.post("/register", {
    username,
    password,
  });

  return response.data;
};
