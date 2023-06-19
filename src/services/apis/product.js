import axios from '../utils/axios';
import ProductSchema from '../schemas/Product';

const getAllProduct = async () => {
    try {
        const response = await axios.get(`/api/products/?perPage=100`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getProductList = async (page=1) => {
    try {
        const response = await axios.get(`/api/products/?perPage=8&page=${page}`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const searchProduct = async (findingPhrase) => {
    try {
        const response = await axios.get(`/api/products/?perPage=10&search=${findingPhrase}`);
        const data = response.data.data.data;
        data.map(async (data) => await ProductSchema.validate(data, {abortEarly: false}));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getTopPicks = async () => {
    try {
        const response = await axios.get('api/products');
        const data = response.data.data.data.slice(0, 8);
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

const getProductById = async (id) => {
    try {
        const response = await axios.get(`api/product/${id}`);
        const data = response.data.data;
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { getProductList, getTopPicks, getProductById, searchProduct, getAllProduct};