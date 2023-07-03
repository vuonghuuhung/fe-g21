import axios from '../utils/axios';

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const headers = {
  Authorization: `Bearer ${token}`,
};

const getOrderListById = async (id) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.get(
      `/api/user/orderlist/${id}`,
      {
        headers,
      }
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const rate = async (orderDetailId, rate) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(
      `/api/user/productrate/${orderDetailId}`,
      {
        headers,
        rate
      }
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getOrderList = async (page, query) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.get(
      `/api/admin/orders?page=${page}&perPage=5&search=${query ? query : ''}`,
      {
        headers
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
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.get(`/api/admin/order/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const analysis = async (id) => {
  try {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.get(`/api/admin/analysis`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getOrderList, deleteOrder, getOrder, analysis, getOrderListById, rate };
