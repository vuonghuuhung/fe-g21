import * as Yup from 'yup';

const DistrictSchema = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string().required(),
    type: Yup.string().required(),
    slug: Yup.string().required(),
    name_with_type: Yup.string().required(),
    path: Yup.string().required(),
    path_with_type: Yup.string().required(),
    parent_code: Yup.number().required(),
    created_at: Yup.date().required(),
    updated_at: Yup.date().required(),
});

export default DistrictSchema;