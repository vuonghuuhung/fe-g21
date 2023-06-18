import axios from '../utils/axios';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;
const headers = {
  Authorization: `Bearer ${token}`,
};

const getProductList = async (page) => {
  try {
    const response = await axios.get(
      `/api/admin/products?page=${page}&perPage=6`,
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

const getCategoryList = async () => {
  try {
    const response = await axios.get(`/api/categories`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getProduct = async (id) => {
  try {
    const response = await axios.get(`/api/product/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteProduct = async (id, status) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(
      `/api/admin/product/update/${id}`,
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

const updateProduct = async (id, data) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(`/api/admin/product/update/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const saveImage = async (image_product) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(`/api/upload_image`, image_product, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createCategory = async (data) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(`/api/admin/category/create`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createProduct = async (data) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(`/api/admin/product/create`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getStyle = async (id) => {
  try {
    const response = await axios.get(`/api/style/${id}}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getColor = async (id) => {
  try {
    const response = await axios.get(`/api/color/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateStyle = async (id, data) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(`/api/admin/style/update/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateColor = async (id, data) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(`/api/admin/color/update/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createColor = async (data) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(`/api/admin/color/create`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createStyle = async (data) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(`/api/admin/style/create`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteStyle = async (id, status) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(
      `/api/admin/style/update/${id}`,
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

const deleteColor = async (id, status) => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post(
      `/api/admin/color/update/${id}`,
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

export {
  getProductList,
  deleteProduct,
  deleteStyle,
  deleteColor,
  getProduct,
  saveImage,
  getCategoryList,
  updateProduct,
  createCategory,
  createProduct,
  getStyle,
  getColor,
  updateStyle,
  updateColor,
  createColor,
  createStyle,
};
