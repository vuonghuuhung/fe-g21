import axios from '../utils/axios';

const login = async (email, password) => {
  try {
    const cookieSaved = await axios.get('/sanctum/csrf-cookie');
    console.log(cookieSaved);
    const response = await axios.post('/api/login', { email, password });
    console.log(response);
    const data = response.data;
    if (response.status === 200 && data.success) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.data.user_info));
      return data.data.user_info.role;
    } else {
      return 0;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Đăng nhập thất bại: email hoặc mật khẩu không chính xác");
    } else {
      console.log("Đã xảy ra lỗi khi đăng nhập: " + error);
    }
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
