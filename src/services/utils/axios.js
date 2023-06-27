import axios from 'axios';

const instance = axios.create({
    baseURL: "https://g21-be.azurewebsites.net/",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000000,
    withCredentials: true
});

export default instance;
