import axios from '../utils/axios';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;
const headers = {
  Authorization: `Bearer ${token}`,
};

const getOrderList = async (page) => {
  try {
    const response = await axios.get(
      `/api/admin/orders?page=${page}&perPage=5`,
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

const deleteOrder = async (id, status) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(
      `/api/admin/order/update/${id}`,
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

const getOrder = async (id) => {
  try {
    const response = await axios.get(`/api/admin/order/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getOrderList, deleteOrder, getOrder };
