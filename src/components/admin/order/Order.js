import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import LoadingBox from '../../LoadingBox';
import MessageBox from '../../MessageBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { deleteOrder, getOrderList } from '../../../services/apis/authOrders';
import { useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function Order() {
  const [
    {
      loading,
      error,
      orders,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const [query, setQuery] = useState(null);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { userInfo } = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrderList(page, query);
        dispatch({ type: 'FETCH_SUCCESS', payload: res });
      } catch (err) {}
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete, query]);

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        const status = 5;
        await deleteOrder(order.id, status);
        toast.success('Order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error('Error');
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (
    <div className="h-full mt-4">
      <ToastContainer />
      <div className="flex relative">
        <div className="w-full text-center">
          <h1 className="font-bold text-3xl mb-2">Orders</h1>
          <div className="text-xl pb-6">Order infomation</div>
        </div>
      </div>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          {' '}
          <div className="flex justify-end items-center mr-40 mb-6">
            <div className="w-full md:w-72 right-0">
              <Input
                className=" outline-none border-2 border-gray rounded-md pl-10"
                icon={<MagnifyingGlassIcon className="h-5 w-5 mt-2 ml-2" />}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <table className="border-collapse border border-slate-500">
              <thead>
                <tr className="rounded-md border-b-2 border-gray">
                  <th className="px-12 py-2">ID</th>
                  <th className="px-12 py-2">User</th>
                  <th className="px-12 py-2 w-48">Address</th>
                  <th className="px-12 py-2">Total</th>
                  <th className="px-12 py-2">Status</th>
                  <th className="px-12 py-2">Date</th>
                  <th className="px-12 py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(orders.data).map((order, index) => (
                  <tr
                    key={order.id}
                    className="rounded-md border-b-2 border-gray"
                  >
                    <td className="text-center items-center">{order.id}</td>
                    <td className="text-center items-center cursor-pointer">
                      <div
                        onClick={() =>
                          navigate(`/admin/user/view/${order.user_id}`)
                        }
                      >
                        {order.user_id}
                      </div>
                    </td>

                    <td className="text-center items-center">
                      {order.address}
                    </td>
                    <td className="text-center items-center">
                      {order.total_price}
                    </td>
                    <td className="text-center items-center">
                      {order.status === 1 ? (
                        <div className="mx-2 my-1 rounded bg-orange-200 text-orange-600">
                          Pending
                        </div>
                      ) : order.status === 2 ? (
                        <div className="mx-2 my-1 rounded bg-blue-200 text-blue-600">
                          Confirmed
                        </div>
                      ) : order.status === 3 ? (
                        <div className="mx-2 my-1 rounded bg-purple-200 text-purple-600">
                          Shipping
                        </div>
                      ) : (
                        <div className="mx-2 my-1 rounded bg-green-200 text-green-600">
                          Finished
                        </div>
                      )}
                    </td>
                    <td className="text-center items-center">
                      {order.created_at.substring(0, 10)}
                    </td>
                    <td className="text-center items-center px-4">
                      <button
                        className="px-2 mx-2 py-2 font-semibold text-white bg-red-400 rounded-md"
                        onClick={() => deleteHandler(order)}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          ></path>
                        </svg>
                      </button>
                      &nbsp;
                      <button
                        className="px-2 mx-2 py-2 mr-4 font-semibold text-white bg-green-400 rounded-md"
                        onClick={() =>
                          navigate(`/admin/order/view/${order.id}`)
                        }
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-center my-10">
            <div className="w-2/5 flex justify-between items-center">
              {orders.links.map((link, index) => (
                <div
                  className={`rounded-full w-10 h-10 flex justify-center items-center m-2 cursor-pointer ${
                    link.active ? 'bg-green-400 text-white' : 'bg-gray-100'
                  }`}
                  key={index}
                >
                  <div
                    onClick={() =>
                      navigate(
                        link.url ? `/admin/orders${link.url}` : '/admin/orders'
                      )
                    }
                    className=""
                  >
                    {link.label
                      .replace('&raquo;', '')
                      .replace('&laquo;', '')
                      .replace('Previous', '<')
                      .replace('Next', '>')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
