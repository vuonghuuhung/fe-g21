import axios from '../utils/axios';
import ProductSchema from '../schemas/Product';

const getProductList = async () => {
    try {
        const response = await axios.get('/api/products');
        const data = response.data.data;
        data.map(async (data) => await ProductSchema.validate(data, {abortEarly: false}));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { getProductList };