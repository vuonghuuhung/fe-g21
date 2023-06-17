import axios from '../utils/axios';
import CitySchema from '../schemas/City';
import DistrictSchema from '../schemas/District';
import UrbanSchema from '../schemas/Urban';

const getCities = async () => {
    try {
        const response = await axios.get('/api/get_cities');
        const data = response.data.data;
        data.map(async (data) => await CitySchema.validate(data, {abortEarly: false}));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getDistricts = async (idCity) => {
    try {
        const response = await axios.get(`/api/get_districts_by_id_city/${idCity}`);
        const data = response.data.data;
        data.map(async (data) => await DistrictSchema.validate(data, {abortEarly: false}));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUrbans = async (idDistrict) => {
    try {
        const response = await axios.get(`/api/get_urbans_by_id_district/${idDistrict}`);
        const data = response.data.data;
        data.map(async (data) => await UrbanSchema.validate(data, {abortEarly: false}));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    getCities,
    getDistricts,
    getUrbans
};