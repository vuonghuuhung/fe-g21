import axios from '../utils/axios';

const login = async (email, password) => {
  try {
    const cookieSaved = await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post('/api/login', { email, password });
    const data = response.data;
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.data.user_info));
      return data.data.user_info.role;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
};

const getToken = () => {
  return localStorage.getItem('token');
};

export { login, logout, getToken };
