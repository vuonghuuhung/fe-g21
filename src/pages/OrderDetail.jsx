import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { rate } from "../services/apis/authOrders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state.order;

  const [ratings, setRatings] = useState({});

  const handleRatingChange = (productId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };

  const handleRatingSubmit = async () => {
    for (const productId in ratings) {
      const rating = ratings[productId];
      await rate(productId, rating);
    }
    toast.success("Cảm ơn vì đã phản hồi cho chúng tôi!");
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Order Detail</h1>
      {order && (
        <div>
          <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
          <p className="mb-2">Total Price: ${order.total_price}</p>
          <p className="mb-2">Address: {order.address}</p>
          <p className="mb-4">Created At: {order.created_at}</p>
          {/* Hiển thị các thông tin khác về đơn hàng */}
          <h3 className="text-xl font-bold mb-2">Product List</h3>
          {order.detail.map((product) => (
            <div key={product.id} className="border rounded p-4 mb-4">
              <p className="font-bold mb-2">Product ID: {product.id}</p>
              <p className="mb-2">Total Price: ${product.total_price}</p>
              {/* Hiển thị các thông tin khác về sản phẩm */}
              {product.rate === null && (
                <div>
                  <label htmlFor={`rating-${product.id}`} className="mr-2">
                    Rating:
                  </label>
                  <select
                    id={`rating-${product.id}`}
                    value={ratings[product.id] || ""}
                    onChange={(e) =>
                      handleRatingChange(product.id, e.target.value)
                    }
                    className="border rounded p-2"
                  >
                    <option value="">Select rating</option>
                    <option value="1">1 star</option>
                    <option value="2">2 stars</option>
                    <option value="3">3 stars</option>
                    <option value="4">4 stars</option>
                    <option value="5">5 stars</option>
                  </select>
                </div>
              )}
            </div>
          ))}
          {Object.values(ratings).length > 0 && (
            <button
              onClick={handleRatingSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit Ratings
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
