import * as yup from 'yup';

const UrbanSchema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    type: yup.string().required(),
    slug: yup.string().required(),
    name_with_type: yup.string().required(),
    path: yup.string().required(),
    path_with_type: yup.string().required(),
    parent_code: yup.number().required(),
    created_at: yup.string().required(),
    updated_at: yup.string().required(),
});

export default UrbanSchema;