import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../services/apis/product";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);
  return <div>Product Detail</div>;
};

export default ProductDetail;
