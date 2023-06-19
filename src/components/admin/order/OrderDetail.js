import React, { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import LoadingBox from '../../LoadingBox';
import MessageBox from '../../MessageBox';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getOrder } from '../../../services/apis/authOrders';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        user: action.payload.data.user,
        products: action.payload.data.detail,
        order: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderDetail() {
  const [{ loading, error, user, order, products, pages }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;
  const { id } = useParams();

  const { userInfo } = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrder(id);
        dispatch({ type: 'FETCH_SUCCESS', payload: res });
      } catch (err) {}
    };
    fetchData();
  }, [page, userInfo, id]);

  console.log(products);

  return (
    <div className="h-full mt-4">
      <ToastContainer />
      <div className="flex relative">
        <div className="w-full text-center">
          <h1 className="font-bold text-3xl p-2">Order</h1>
          <div className="text-xl pb-6">Order detail</div>
        </div>
      </div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="flex justify-between bg-gray-50 shadow-lg rounded-md py-10 mx-20">
            <div className="w-1/3 ml-20 bg-gray-50 shadow-lg rounded-lg p-5">
              <div>Order ID: #{order.id}</div>
              <div className="mt-3">Address: {order.address}</div>
              <div className="mt-3 flex">
                Status:{' '}
                {order.status === 1 ? (
                  <div className="mx-2 my-1 px-2 rounded bg-orange-200 text-orange-600">
                    Pending
                  </div>
                ) : order.status === 2 ? (
                  <div className="mx-2 my-1 px-2 rounded bg-blue-200 text-blue-600">
                    Confirmed
                  </div>
                ) : order.status === 3 ? (
                  <div className="mx-2 my-1 px-2 rounded bg-purple-200 text-purple-600">
                    Shipping
                  </div>
                ) : (
                  <div className="mx-2 my-1 px-2 rounded bg-green-200 text-green-600">
                    Finished
                  </div>
                )}
              </div>
              <div className="mt-3">
                Date: {order.created_at.substring(0, 10)}
              </div>
              <div className="mt-3 text-md font-bold">
                Total: {order.total_price}
              </div>
            </div>
            <div className="w-2/3 ml-10">
              <div className="flex text-xl">
                <div className="mr-10 w-60 h-60">
                  <img
                    className="rounded-full shadow-xl"
                    src="https://www.material-tailwind.com/img/face-2.jpg"
                    alt=""
                  />
                </div>
                <div className="w-1/2 bg-orange-50 rounded-xl p-8 shadow-lg">
                  <div className="flex mb-3 justify-start items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      Name: {user.firstname} {user.lastname}
                    </div>
                  </div>
                  <div className="flex mb-3 justify-start items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>Email: {user.email}</div>
                  </div>
                  <div className="flex mb-3 justify-start items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>Phone: {user.phone}</div>
                  </div>
                  <div className="flex mb-3 justify-start items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>Role: {user.role === 1 ? 'User' : 'Admin'}</div>
                  </div>
                  <div
                    className="cursor-pointer hover:text-gray-500"
                    onClick={() => navigate(`/admin/user/view/${user.id}`)}
                  >
                    More info...
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="w-full text-center">
              <h1 className="font-bold text-3xl p-2">Product</h1>
              <div className="text-xl pb-6">List items</div>
              <div className="mx-32 flex justify-center items-center">
                <div className="w-2/3 text-base">
                  {products.map((product) => (
                    <div
                      className="w-full rounded bg-gray-50 shadow-xl p-5 flex justify-between cursor-pointer mb-4"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="w-1/4 flex justify-center items-center">
                        <img
                          src={product.type.image}
                          alt=""
                          className="h-48 w-60 my-2"
                        />
                      </div>
                      <div className="text-left w-3/4 ml-5 ">
                        <div className="mb-3 ">
                          Product name: {product.info.product_name}
                        </div>
                        <div className="mb-3">
                          Product Description: {product.info.description}
                        </div>
                        <div className="mb-3 flex">
                          <div className="">
                            Product type:{' '}
                            {product.info.option_type === 1
                              ? product.type.color_name
                              : product.type.style_name}
                          </div>
                          <div className="ml-8">
                            Quantity: {product.quantity}
                          </div>
                        </div>
                        <div className="mb-3 font-bold">
                          Total: {product.total_price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
