import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProductById } from '../services/apis/product';
import CartContext from '../components/CartContext';

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
          }
          return response;
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

  const renderRate = (rate) => {
    const result = [];
    for (let i = 0; i < rate; i++) {
      result.push(
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>First star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }

    for (let i = rate; i < 5; i++) {
      result.push(
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-300 dark:text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Fifth star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }

    return <div className="flex">{result}</div>;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-12 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <img
              className="w-full rounded-lg"
              src={product.image}
              alt={product.product_name}
            />
            <div className="mt-4">
              Rate:
              <div class="flex items-center">
                {renderRate(product.rate)}
                <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {product.rate} out of 5
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{product.product_name}</h2>
            <p className="text-lg mb-4">Price: ${product.price}</p>
            <div className="flex">
              {product.type.map((st) => (
                <div className="w-1/3 bg-gray-100 shadow rounded p-4 m-1">
                  <div className="flex justify-between">
                    {product.option_type === 1 ? st.color_name : st.style_name}
                  </div>
                  <div className="mt-1 w-40">
                    <img src={st.image} alt="" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-lg mb-8">Description: {product.description}</p>
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
