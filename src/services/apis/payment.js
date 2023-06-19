import axios from '../utils/axios';

const createPayment = async (order, orderDetail) => {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/api/payment/create', {
            "order": order,
            "order-detail": orderDetail
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const getPaymentInfo = async (id) => {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get('/api/payment/check_status', { params: { id: id } });
        return response.data.payment;
    } catch (error) {
        console.log(error);
    }
}

export { createPayment, getPaymentInfo };