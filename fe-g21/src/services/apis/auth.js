import axios from '../utils/axios';

const login = async (email, password) => {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/api/login', { email, password });
        const data = response.data;
        if (data.success) {
            console.log(`save token ${data.data.token} to cookie`);
            localStorage.setItem('token', data.data.token)
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const logout = () => {
    localStorage.removeItem('token');
}

const getToken = () => {
    return localStorage.getItem('token');
}

export {
    login,
    logout,
    getToken
}