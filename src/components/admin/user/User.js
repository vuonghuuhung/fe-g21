import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import LoadingBox from '../../LoadingBox';
import MessageBox from '../../MessageBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserList, updateUser } from '../../../services/apis/authUser';
import { Avatar, Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        users: action.payload.data,
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

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpload: '' };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        loadingUpdate: false,
        errorUpload: '',
      };
    case 'UPDATE_FAIL':
      return {
        ...state,
        loadingUpdate: false,
        errorUpload: action.payload,
      };
    default:
      return state;
  }
};

export default function User() {
  const [role, setRole] = useState(1);
  const [query, setQuery] = useState(null);
  const [{ loading, loadingUpdate, error, users, pages }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { userInfo } = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserList(page, query);
        dispatch({ type: 'FETCH_SUCCESS', payload: res });
      } catch (err) { }
    };
    fetchData();
  }, [page, userInfo, loadingUpdate, query]);

  const toggleModal = (id) => {
    document.getElementById('modal-' + id).classList.toggle('hidden');
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await updateUser(id, {
        role: role,
      });
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('User updated successfully', { autoClose: 1000});
      toggleModal(id);
      navigate(`/admin/users?page=${page}`);
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div className="h-full mt-4">
      <ToastContainer />
      <div className="flex relative">
        <div className="w-full text-center">
          <h1 className="font-bold text-3xl p-2">Users</h1>
          <div className="text-xl pb-6">Users infomation</div>
        </div>
      </div>

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
                  <th className="px-12 py-2">NAME</th>
                  <th className="px-12 py-2">EMAIL</th>
                  <th className="px-12 py-2">ROLE</th>
                  <th className="px-12 py-2">STATUS</th>
                  <th className="px-12 py-2">PHONE</th>
                  <th className="px-12 py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(users.data).map((user) => (
                  <tr
                    key={user.id}
                    className="rounded-md border-b-2 border-gray"
                  >
                    <td className="text-center items-center">{user.id}</td>
                    <td className="text-center items-center p-3 flex">
                      <div>
                        <Avatar
                          src="https://www.material-tailwind.com/img/face-2.jpg"
                          alt="avatar"
                          className="mr-2 rounded-full w-20 h-20"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-600">
                          {user.firstname} {user.lastname}
                        </div>
                        <div>{user.city.name}</div>
                      </div>
                    </td>
                    <td className="text-center items-center">{user.email}</td>
                    <td className="items-center flex justify-center mt-8">
                      {user.role === 2 ? (
                        <div className="text-center w-1/2 relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-purple-300 text-purple-900 py-2 px-2 text-xs rounded-md">
                          Admin
                        </div>
                      ) : (
                        <div className="text-center w-1/2 relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-300 text-green-900 py-2 px-2 text-xs rounded-md">
                          User
                        </div>
                      )}
                    </td>
                    <td className="text-center items-center">
                      {user.status === 1 ? (
                        <div className="ml-[25%] text-center w-1/2 relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-300 text-blue-900 py-2 px-2 text-xs rounded-md">
                          Active
                        </div>
                      ) : (
                        <div className="ml-[25%] text-center w-1/2 relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-red-300 text-red-900 py-2 px-2 text-xs rounded-md">
                          Inactive
                        </div>
                      )}
                    </td>
                    <td className="text-center items-center">{user.phone}</td>
                    <td className="text-center items-center">
                      <button
                        className="px-2 py-2 font-semibold text-white bg-yellow-300 rounded-md mr-2 ml-4"
                        onClick={() => toggleModal(user.id)}
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="px-2 py-2 mr-4 font-semibold text-white bg-green-400 rounded-md ml-2"
                        onClick={() => navigate(`/admin/user/view/${user.id}`)}
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
                    <div
                      className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                      id={`modal-${user.id}`}
                    >
                      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                          <div className="absolute inset-0 bg-gray-900 opacity-75" />
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                          &#8203;
                        </span>
                        <div
                          className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="modal-headline"
                        >
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <label
                              htmlFor="base-input"
                              className="block mb-4 font-medium text-gray-900 text-lg"
                            >
                              Role
                            </label>
                            <div className="mb-6 mr-4 w-1/2 flex text-lg">
                              <div className="flex items-center pl-4 border border-gray-200 rounded mr-4">
                                <input
                                  id="role-1"
                                  type="radio"
                                  value="1"
                                  name="role"
                                  className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                  onChange={(e) => setRole(e.target.value)}
                                />
                                <label
                                  htmlFor="role-1"
                                  className="w-full px-10 py-2 ml-2 font-medium text-green-600  bg-green-300 rounded"
                                >
                                  User
                                </label>
                              </div>
                              <div className="flex items-center pl-4 border border-gray-200 rounded">
                                <input
                                  id="role-2"
                                  type="radio"
                                  value="2"
                                  name="role"
                                  className="w-8 h-8 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                  onChange={(e) => setRole(e.target.value)}
                                />
                                <label
                                  htmlFor="role-2"
                                  className="w-full px-10 py-2 ml-2 font-medium text-purple-600 bg-purple-300 rounded"
                                >
                                  Admin
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-200 px-4 py-3 text-right">
                            <button
                              type="button"
                              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                              onClick={() => toggleModal(user.id)}
                            >
                              <i className="fas fa-times"></i> Cancel
                            </button>
                            <button
                              type="button"
                              className="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-700 mr-2"
                              onClick={(e) => handleUpdate(e, user.id)}
                            >
                              <i className="fas fa-plus"></i>{' '}
                              {loadingUpdate ? ' Loading...' : 'Update'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-center my-10">
            <div className="w-2/5 flex justify-between items-center">
              {users.links.map((link) => (
                <div
                  className={`rounded-full w-10 h-10 flex justify-center items-center m-4 cursor-pointer ${link.active ? 'bg-green-400 text-white' : 'bg-gray-100'
                    }`}
                >
                  <div
                    onClick={() =>
                      navigate(
                        link.url ? `/admin/users${link.url}` : '/admin/users'
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
