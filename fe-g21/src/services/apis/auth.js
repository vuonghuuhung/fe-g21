import axios from '../utils/axios';

const login = (username, password) => {
    return axios.get("/sanctum/csrf-cookie").then(response => {
        axios.post('/api/login', { username, password })
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('token', response.data.data.token)
                    return true;
                } else {
                    return false;
                }
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    }).catch(error => { console.log(error); return false; });
};

const login2 = async (username, password) => {
    try {
        const response = await axios.post('/api/login', { username, password });
        const data = response.data;
        if (data.success) {
            localStorage.setItem('token', data.data.token)
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        throw error;
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