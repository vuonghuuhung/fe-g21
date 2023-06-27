import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://g21-be.azurewebsites.net/",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000000,
    withCredentials: true
});

export default instance;
