import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../services/apis/product";
import CartContext from "../components/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(() => {
          if (response.type.length > 0) {
            response.price = response.type[0].fixed_price;
            return response;
          }
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-12 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <img className="w-full rounded-lg" src={product.image} alt={product.product_name} />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4">{product.product_name}</h2>
            <p className="text-2xl mb-4">Price: ${product.price}</p>
            <p className="text-2xl mb-4">Color: {product.color}</p>
            <p className="text-2xl mb-8">Description: {product.description}</p>
            <button
              className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg"
              onClick={() => addProduct(product.id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;