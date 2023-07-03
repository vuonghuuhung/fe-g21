import axios from '../utils/axios';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;
const headers = {
  Authorization: `Bearer ${token}`,
};

const getCategoryList = async (page, query) => {
  try {
    const response = await axios.get(
      `/api/admin/categories?page=${page}&perPage=6&search=${
        query ? query : ''
      }`,
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

const deleteCategory = async (id, status) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(
      `/api/admin/category/update/${id}`,
      { status },
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

const updateCategory = async (id, data) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(
      `/api/admin/category/update/${id}`,
      data,
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

export { getCategoryList, deleteCategory, updateCategory };
