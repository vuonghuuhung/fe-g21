import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 100000000,
    withCredentials: true
});

export default instance;