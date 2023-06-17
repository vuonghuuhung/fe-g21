import * as yup from 'yup';

const CitySchema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    slug: yup.string().required(),
    type: yup.string().required(),
    name_with_type: yup.string().required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required(),
});

export default CitySchema;