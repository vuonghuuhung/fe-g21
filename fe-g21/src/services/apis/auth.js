import axios from '../utils/axios';

const login = (username, password) => {
    return axios.get("/sanctum/csrf-cookie").then(response => {
        axios.post('/api/login', { username, password })
            .then(response => {
                console.log(response);
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