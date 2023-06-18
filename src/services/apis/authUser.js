import axios from '../utils/axios';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;
const headers = {
  Authorization: `Bearer ${token}`,
};

const getUserList = async (page) => {
  try {
    const response = await axios.get(
      `/api/admin/users?page=${page}&perPage=5`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const response = await axios.get(`/api/admin/user/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async (id, data) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(`/api/admin/user/update/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getUserList, getUser, updateUser };
