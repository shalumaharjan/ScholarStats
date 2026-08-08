import axiosInstance from "./axiosInstance";

// 🔐 LOGIN
export const login = async (username, password) => {
  const response = await axiosInstance.post("/login", {
    username,
    password,
  });

  // ✅ Save token
  if (response.data?.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }

  return response.data;
};

// 📝 REGISTER
export const register = async (username, password) => {
  const response = await axiosInstance.post("/register", {
    username,
    password,
  });

  return response.data;
};

// 🚪 LOGOUT
export const logout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    return response.data;
  } finally {
    // ✅ Remove token always
    localStorage.removeItem("token");
  }
};