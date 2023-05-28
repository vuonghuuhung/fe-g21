import axios from "../utils/axios"
import RegisterSchema from "../schemas/Register"

const registry = async (userData) => {
    try {
        await RegisterSchema.validate(userData);
        console.log(userData);
        const response = await axios.post('/api/register', userData);
        const data = response.data;
        if (data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

export {
    registry
}
