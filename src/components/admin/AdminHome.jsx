import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import bg from '../../assets/admin/bg-admin.jpg';
import order from '../../assets/admin/order.jpg';
import product from '../../assets/admin/product.jpg';
import user from '../../assets/admin/user.jpg';
import { analysis } from '../../services/apis/authOrders';
import { useReducer } from 'react';
import LoadingBox from '../LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        result: action.payload.data,
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

export default function AdminHome() {
  const [{ loading, error, result, pages }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await analysis();
        dispatch({ type: 'FETCH_SUCCESS', payload: res });
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <div className="mx-20">
      {loading ? (
        <LoadingBox />
      ) : (
        <div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/3 mr-5 rounded shadow-lg p-5">
              {' '}
              <div className="text-3xl font-extrabold">Orders</div>
              <div className="mt-3">
                <img className="h-[90px] w-full" src={order} alt="" />
              </div>
              <div className="text-2xl mt-5 font-bold flex justify-between">
                <div>{result.order} orders</div>
                <div>{result.sum.toFixed(2)}$</div>
              </div>
            </div>
            <div className="w-1/3 mr-5 rounded shadow-lg p-5">
              <div className="text-3xl font-extrabold">Products</div>
              <div className="mt-3">
                <img className="h-[90px] w-full" src={product} alt="" />
              </div>
              <div className="text-2xl mt-5 font-bold flex justify-between">
                <div>{result.product} products</div>
                <div>{result.style} styles</div>
              </div>
            </div>
            <div className="w-1/3 rounded shadow-lg p-5">
              <div className="text-3xl font-extrabold">Users</div>
              <div className="mt-3">
                <img className="h-[90px] w-full" src={user} alt="" />
              </div>
              <div className="text-2xl mt-5 font-bold flex justify-between">
                <div>{result.user} users</div>
                <div>{result.admin} admin</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-10">
        <img src={bg} alt="" />
      </div>
    </div>
  );
}
