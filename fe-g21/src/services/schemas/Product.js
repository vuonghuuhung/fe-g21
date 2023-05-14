import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
    id: Yup.number().required(),
    product_name: Yup.string().required(),
    description: Yup.string().required(),
    category_id: Yup.number().required(),
    image: Yup.string().url().required(),
    option_type: Yup.number().required(),
    relate_to_product: Yup.mixed().nullable(),
    created_at: Yup.date().required(),
    updated_at: Yup.date().required(),
    category: Yup.object().shape({
        id: Yup.number().required(),
        category_name: Yup.string().required(),
        description: Yup.string().required(),
        created_at: Yup.date().required(),
        updated_at: Yup.date().required(),
    }).required(),
});

export default ProductSchema;