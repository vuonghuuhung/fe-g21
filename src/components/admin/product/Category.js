import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import LoadingBox from '../../LoadingBox';
import MessageBox from '../../MessageBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import {
  deleteCategory,
  getCategoryList,
  updateCategory,
} from '../../../services/apis/authCategory';
import { createCategory } from '../../../services/apis/authProduct';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        categorise: action.payload.data,
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
    case 'CREATECATE_REQUEST':
      return { ...state, loadingCreateCate: true, errorUpload: '' };
    case 'CREATECATE_SUCCESS':
      return {
        ...state,
        loadingCreateCate: false,
        errorUpload: '',
      };
    case 'CREATECATE_FAIL':
      return {
        ...state,
        loadingCreateCate: false,
        errorUpload: action.payload,
      };
    case 'EDITCATE_REQUEST':
      return { ...state, loadingEditCate: true, errorUpload: '' };
    case 'EDITCATE_SUCCESS':
      return {
        ...state,
        loadingEditCate: false,
        errorUpload: '',
      };
    case 'EDITCATE_FAIL':
      return {
        ...state,
        loadingEditCate: false,
        errorUpload: action.payload,
      };
    default:
      return state;
  }
};

export default function Category() {
  const [descriptionCate, setDescriptionCate] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [edit, setEdit] = useState(null);
  const [descriptionCateEdit, setDescriptionCateEdit] = useState(null);
  const [categoryNameEdit, setCategoryNameEdit] = useState(null);
  const [
    {
      loading,
      error,
      pages,
      categorise,
      loadingCreate,
      loadingDelete,
      successDelete,
      loadingCreateCate,
      loadingEditCate,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;
  const [query, setQuery] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cate = await getCategoryList(page, query);
        dispatch({ type: 'FETCH_SUCCESS', payload: cate });
      } catch (err) {}
    };
    fetchData();
  }, [successDelete, loadingCreateCate, loadingEditCate, page, query]);

  const deleteHandler = async (category) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        const status = 0;
        await deleteCategory(category.id, status);
        toast.success('category deleted successfully', { autoClose: 1000 });
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error('Error');
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  const handleCreateCate = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATECATE_REQUEST' });
      await createCategory({
        category_name: categoryName,
        description: descriptionCate,
      });
      dispatch({
        type: 'CREATECATE_SUCCESS',
      });
      toast.success('Category created successfully', { autoClose: 1000 });
      setCategoryName(null);
      setDescriptionCate(null);
      toggleModal();
    } catch (err) {
      toast.error('CREATECATE_FAIL');
      dispatch({ type: 'CREATECATE_FAIL' });
    }
  };

  const handleEditCate = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'EDITCATE_REQUEST' });
      await updateCategory(edit, {
        category_name: categoryNameEdit,
        description: descriptionCateEdit,
      });
      dispatch({
        type: 'EDITCATE_SUCCESS',
      });
      toast.success('Category edited successfully', { autoClose: 1000 });
      toggleModalEditClose();
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'EDITCATE_FAIL' });
    }
  };

  const toggleModal = () => {
    document.getElementById('modal').classList.toggle('hidden');
  };

  const toggleModalEdit = (cate) => {
    document.getElementById('modal-edit').classList.toggle('hidden');
    setEdit(cate.id);
    setDescriptionCateEdit(cate.description);
    setCategoryNameEdit(cate.category_name);
  };

  const toggleModalEditClose = () => {
    setEdit(null);
    setDescriptionCateEdit(null);
    setCategoryNameEdit(null);
    console.log(categoryName, descriptionCate);
    document.getElementById('modal-edit').classList.toggle('hidden');
  };

  return (
    <div className="h-full mt-4">
      <ToastContainer />
      <div className="flex relative">
        <div className="w-full text-center">
          <h1 className="font-bold text-3xl mb-2">Categories</h1>
          <div className="text-xl pb-6">Category infomation</div>
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
            <div className="w-10">
              <div className="text-center">
                <button
                  className="p-3 mx-6 font-bold bg-green-500 text-white rounded-md"
                  onClick={toggleModal}
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
                      d="M12 6v12m6-6H6"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <table className="border-collapse border border-slate-500">
              <thead>
                <tr className="rounded-md border-b-2 border-gray">
                  <th className="px-12 py-2">ID</th>
                  <th className="px-12 py-2">NAME</th>
                  <th className="px-12 py-2 w-[400px]"> DESCRIPTION</th>
                  <th className="px-12 py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(categorise.data).map((category, index) => (
                  <tr
                    key={category.id}
                    className="rounded-md border-b-2 border-gray"
                  >
                    <td className="text-center items-center">{category.id}</td>
                    <td className="text-center items-center">
                      {category.category_name}
                    </td>
                    <td className="text-center items-center">
                      {category.description}
                    </td>
                    <td className="text-center items-center px-4">
                      <button
                        className="px-2 mx-2 py-2 font-semibold text-white bg-yellow-300 rounded-md"
                        onClick={() => toggleModalEdit(category)}
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
                      &nbsp;
                      <button
                        className="px-2 mx-2 py-2 font-semibold text-white bg-red-400 rounded-md"
                        onClick={() => deleteHandler(category)}
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
                    </td>
                    <div
                      className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                      id="modal-edit"
                    >
                      <span className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="fixed inset-0 transition-opacity">
                          <span className="absolute inset-0 bg-gray-900 opacity-75" />
                        </span>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                          &#8203;
                        </span>
                        <span
                          className="p-4 inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="modal-headline"
                        >
                          <span className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <span className="mb-6 mr-4 w-1/2">
                              <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Category Name
                              </label>
                              <input
                                type="text"
                                id="base-input"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 outline-none"
                                value={categoryNameEdit}
                                onChange={(e) =>
                                  setCategoryNameEdit(e.target.value)
                                }
                              />
                            </span>
                            <span className="mb-6">
                              <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Description
                              </label>
                              <textarea
                                id="message"
                                rows="4"
                                className="block px-4 py-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Write your description here..."
                                value={descriptionCateEdit}
                                onChange={(e) =>
                                  setDescriptionCateEdit(e.target.value)
                                }
                              ></textarea>
                            </span>
                          </span>
                          <span className="mt-4 px-4 py-3 text-right">
                            <button
                              type="button"
                              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                              onClick={toggleModalEdit}
                            >
                              <i className="fas fa-times"></i> Cancel
                            </button>
                            <button
                              type="button"
                              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                              onClick={handleEditCate}
                            >
                              <i className="fas fa-plus"></i>{' '}
                              {loadingEditCate ? ' Loading...' : 'Update'}
                            </button>
                          </span>
                        </span>
                      </span>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-center my-10">
            <div className="w-2/5 flex justify-between items-center">
              {categorise.links.map((link, index) => (
                <div
                  className={`rounded-full w-10 h-10 flex justify-center items-center m-2 cursor-pointer ${
                    link.active ? 'bg-green-400 text-white' : 'bg-gray-100'
                  }`}
                  key={index}
                >
                  <div
                    onClick={() =>
                      navigate(
                        link.url
                          ? `/admin/categories${link.url}`
                          : '/admin/categories'
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
          <div
            className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
            id="modal"
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
                  <div className="mb-6 mr-4 w-1/2">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="base-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 outline-none"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="block px-4 py-2.5 w-4/6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Write your description here..."
                      value={descriptionCate}
                      onChange={(e) => setDescriptionCate(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="bg-gray-200 px-4 py-3 text-right">
                  <button
                    type="button"
                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    onClick={toggleModal}
                  >
                    <i className="fas fa-times"></i> Cancel
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                    onClick={handleCreateCate}
                  >
                    <i className="fas fa-plus"></i>{' '}
                    {loadingCreateCate ? ' Loading...' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
