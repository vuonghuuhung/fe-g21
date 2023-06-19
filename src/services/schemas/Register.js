import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    city_id: yup.string().required(),
    district_id: yup.string().required(),
    urban_id: yup.number().required(),
    phone: yup.string().required()
});

export default RegisterSchema;