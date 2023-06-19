import { useEffect, useReducer, useState } from 'react';
import {
  createCategory,
  createProduct,
  getCategoryList,
  saveImage,
} from '../../../services/apis/authProduct';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBox from '../../LoadingBox';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
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
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};

export default function CreateProduct() {
  const [loadData, setLoadData] = useState(true);
  const [categorise, setCategorise] = useState([]);
  const [productName, setProductName] = useState(null);
  const [categoryId, setCategoryId] = useState(1);
  const [description, setDescription] = useState(null);
  const [descriptionCate, setDescriptionCate] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [type, setType] = useState(1);
  const [image, setImage] = useState(
    'https://res.cloudinary.com/dqejrpzru/image/upload/v1686068919/tmhklwphyqib6tez2vbz.png'
  );
  const navigate = useNavigate();
  const [
    { loading, error, loadingUpload, loadingCreateCate, loadingCreate },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const toggleModal = () => {
    document.getElementById('modal').classList.toggle('hidden');
  };

  const uploadFileHandler = async (e) => {
    const token = localStorage.getItem('token');
    const image_product = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image_product', image_product);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await saveImage(bodyFormData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      toast.success('Image uploaded successfully');
      setImage(data.secure_url);
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'UPLOAD_FAIL', payload: 'ERROR' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cate = await getCategoryList();
        dispatch({ type: 'FETCH_SUCCESS', payload: cate });
        setCategorise(cate.data);
        setLoadData(false);
      } catch (err) {}
    };
    fetchData();
  }, []);

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
      toast.success('Category created successfully');
      setCategoryName(null);
      setDescription(null);
      toggleModal();
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'CREATECATE_FAIL' });
    }
  };

  const createHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await createProduct({
        product_name: productName,
        category_id: categoryId,
        description,
        image,
        option_type: type,
      });
      toast.success('product created successfully');
      dispatch({ type: 'CREATE_SUCCESS' });
      console.log(data);
      navigate(`/admin/product/edit/${data}`);
    } catch (err) {
      toast.error('ERROR');
      dispatch({
        type: 'CREATE_FAIL',
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {loadData || loading ? (
        <LoadingBox />
      ) : (
        <div className="w-full h-full justify-center items-center flex">
          <div className="w-2/3">
            <div className=" font-bold text-xl text-center my-6">
              Create product
            </div>
            <div className="w-full flex">
              <div className="mb-6 mr-4 w-1/2">
                <label
                  for="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 outline-none"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6 ml-4 w-1/2 flex">
                <div className="w-5/6">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    for="grid-state"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-50 border border-gray-50 text-gray-900 py-3 px-4 pr-8 rounded leading-tight outline-none"
                      id="category_id"
                      name="category_id"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                    >
                      {categorise.map((cate) => (
                        <option value={cate.id}>{cate.category_name}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-center w-1/6 mt-7">
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
            <div className="mb-6">
              <label
                for="base-input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="4"
                className="block px-4 py-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Write your description here..."
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <label
              for="base-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Image
            </label>
            <div className="w-full flex mb-6">
              <div className="flex items-center justify-center w-1/2">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    {loadingUpload ? (
                      'Loading...'
                    ) : (
                      <div>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={uploadFileHandler}
                  />
                </label>
              </div>
              <div className="w-1/2 justify-center items-center flex">
                <div>
                  {' '}
                  <div className="px-8 mb-4">Preview:</div>
                  <img className="w-full px-8" src={image} alt="" />
                </div>
              </div>
            </div>
            <label
              for="base-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Type
            </label>
            <div className="flex w-full mb-6">
              <div className="flex items-center w-1/6">
                <input
                  id="type-1"
                  type="radio"
                  value="1"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  onChange={(e) => setType(e.target.value)}
                />
                <label
                  for="type-1"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Color
                </label>
              </div>
              <div className="flex items-center w-1/6">
                <input
                  checked
                  id="type-2"
                  type="radio"
                  value="2"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  onChange={(e) => setType(e.target.value)}
                />
                <label
                  for="type-2"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Style
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center items-center mb-20">
              <button
                className="px-8 py-2 rounded bg-green-400 text-white"
                onClick={createHandler}
              >
                {loadingCreate ? 'Loading...' : 'Create'}
              </button>
            </div>
          </div>
          <div
            class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
            id="modal"
          >
            <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-900 opacity-75" />
              </div>
              <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>
              <div
                class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-6 mr-4 w-1/2">
                    <label
                      for="base-input"
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
                      for="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="block px-4 py-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Write your description here..."
                      value={descriptionCate}
                      onChange={(e) => setDescriptionCate(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div class="bg-gray-200 px-4 py-3 text-right">
                  <button
                    type="button"
                    class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    onClick={toggleModal}
                  >
                    <i class="fas fa-times"></i> Cancel
                  </button>
                  <button
                    type="button"
                    class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                    onClick={handleCreateCate}
                  >
                    <i class="fas fa-plus"></i>{' '}
                    {loadingCreateCate ? ' Loading...' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
