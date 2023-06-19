import axios from '../utils/axios';

const createPayment = async () => {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/api/payment/create');
        console.log(response);
    } catch (error) {
        console.log(error);
        return false;
    }
};

export { createPayment };