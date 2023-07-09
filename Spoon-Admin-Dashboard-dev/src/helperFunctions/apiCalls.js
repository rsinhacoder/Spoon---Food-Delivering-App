import axios from "axios";
import { urls } from "../config/urls";

const postFunction = async (url, body) => {
  try {
    const response = await axios.post(url, body).then(function (response) {
      return response.data;
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const getFunction = async (url) => {
  try {
    const response = await axios.get(url).then(function (response) {
      return response.data;
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const deleteFunction = async (url) => {
  try {
    const response = await axios.delete(url).then(function (response) {
      return response.data;
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// post calls
export const login = async (email, password) => {
  let body = {
    email: email,
    password: password,
  };
  const response = await postFunction(urls.login, body);
  return response;
};

export const setNewPassword = async (email) => {
  let body = {
    email: email,
  };
  const response = await postFunction(urls.setPassword, body);
  return response;
};

export const getAdminData = async (token) => {
  let body = {
    token: token,
  };
  const response = await postFunction(urls.adminData, body);
  return response;
};

export const resetAdminPassword = async (id, oldPassword, newPassword) => {
  const body = {
    id: id,
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  const response = await postFunction(urls.changePassword, body);
  return response;
};

export const resetPassword = async (token, email, newPassword) => {
  let body = {
    token: token,
    email: email,
    newPassword: newPassword,
  };
  const response = await postFunction(urls.resetPassword, body);
  return response;
};

export const updateAdminDetails = async (formData) => {
  const response = await postFunction(urls.updateAdminDetails, formData);
  return response;
};

export const addCategory = async (formData) => {
  const response = await postFunction(urls.addNewCategory, formData);
  return response;
};

export const addItem = async (formData) => {
  const response = await postFunction(urls.addNewFoodItem, formData);
  return response;
};

export const searchItemInCategory = async (searchItem, selectedCategory) => {
  let body = {
    query: searchItem,
    category: selectedCategory,
  };
  const response = await postFunction(urls.searchItemInMenuEditor, body);
  return response;
};

export const searchOrder = async (searchItem) => {
  let body = {
    query: searchItem,
  };
  const response = await postFunction(urls.searchItemInOrderHistory, body);
  return response;
};

export const editCategory = async (url, formData) => {
  const response = await postFunction(url, formData);
  return response;
};

export const editItem = async (url, formData) => {
  const response = await postFunction(url, formData);
  return response;
};

export const addUser = async (adminId, email, name) => {
  let body = {
    id: adminId,
    email: email,
    name: name,
  };
  const response = await postFunction(urls.addNewUser, body);
  return response;
};

export const editUser = async (adminId, id, email, name) => {
  let body = {
    adminId: adminId,
    id: id,
    email: email,
    name: name,
  };
  const response = await postFunction(urls.editUserDetails, body);
  return response;
};

// get calls
export const tokenValidation = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const getCategories = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const getItemsByCategory = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const itemAvailibilityStatus = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const getOrderByStatus = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const updateOrderByStatusApi = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const orderHistory = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const allBackendUsers = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const categoryAvailibility = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const canOrderStatus = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const getCanOrderStatus = async (url) => {
  const response = await getFunction(url);
  return response;
};

export const togglePopularity = async (url) => {
  const response = await getFunction(url);
  return response;
};

// delete function
export const deleteItem = async (url) => {
  const response = await deleteFunction(url);
  return response;
};

export const deleteCategory = async (url) => {
  const response = await deleteFunction(url);
  return response;
};

export const deleteUser = async (url) => {
  const response = await deleteFunction(url);
  return response;
};
