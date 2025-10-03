import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://ecommerce-naab.vercel.app",
});

export default API;

export const login = async (userData) => {
  try {
    let res = await API.post(`auth/admin_login`, userData);
    let json = res.data;
    return json;
  } catch (error) {
    toast.error("Invalid Credentials");
    throw error;
  }
};
export const changePassword = async (userData) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Cookie: "COOKIE_SUPPORT=true; GUEST_LANGUAGE_ID=en_US",
  };
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/users/change_password/",
      userData, // Send userData directly as the body
      { headers } // Pass headers separately
    );

    return response.data;
  } catch (error) {
    console.error(
      "Change password error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const getUsersData = async (url) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await API.get(`/api/${url}`, requestOptions);
  let json = res.data;
  return json;
};
export const saveUserData = async (url, userData) => {
  const token = localStorage.getItem("token");

  try {
    const res = await API.post(`/api/${url}`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error);
  }
};
export const updateUserData = async (url, userData, id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await API.patch(`/api/${url}/${id}`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error);
    throw error;
  }
};
export const deleteItem = async (url, id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await API.delete(`/api/${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error);
    throw error;
  }
};
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "naab_preset"); // set in Cloudinary settings
  formData.append("cloud_name", "djcfedb5t");
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/djcfedb5t/image/upload",
    formData
  );
  return res.data.secure_url; // Cloudinary hosted URL
};
