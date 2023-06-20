import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPaymentInfo } from "../services/apis/payment";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("payment_id");
  const [paymentInfo, setPaymentInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        if (id) {
          const response = await getPaymentInfo(id);
          setPaymentInfo(response);
        } else {
          // Handle case when id is not available
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPayment();
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Payment Successful
        </h1>
        {paymentInfo && (
          <div>
            <p className="mb-4 text-lg text-black">
              <span className="font-bold text-xl text-yellow-500">
                Order ID:
              </span>{" "}
              {paymentInfo.order_id}
            </p>
            <p className="mb-4 text-lg text-black">
              <span className="font-bold text-xl text-yellow-500">
                Transaction No:
              </span>{" "}
              {paymentInfo.transaction_no}
            </p>
            <p className="mb-8 text-lg text-black">
              <span className="font-bold text-xl text-yellow-500">Amount:</span>{" "}
              {paymentInfo.amount}
            </p>
            {paymentInfo.response_code === "00" && (
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg w-full"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
