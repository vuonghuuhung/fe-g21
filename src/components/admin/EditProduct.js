import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createCategory,
  createColor,
  createStyle,
  deleteColor,
  deleteStyle,
  getCategoryList,
  getProduct,
  saveImage,
  updateProduct,
} from '../../services/apis/authProduct';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBox from '../LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        product: action.payload.data,
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
        loadingCreateCate: false,
        errorUpload: action.payload,
      };
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
    case 'CREATEST_REQUEST':
      return { ...state, loadingCreateStyle: true, errorUpload: '' };
    case 'CREATEST_SUCCESS':
      return {
        ...state,
        loadingCreateStyle: false,
        errorUpload: '',
      };
    case 'CREATEST_FAIL':
      return {
        ...state,
        loadingCreateStyle: false,
        errorUpload: action.payload,
      };
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

export default function EditProduct({ isAdmin }) {
  const [loadData, setLoadData] = useState(true);
  const [categorise, setCategorise] = useState([]);
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState(null);
  const [categoryId, setCategoryId] = useState(1);
  const [description, setDescription] = useState(null);
  const [descriptionCate, setDescriptionCate] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [styleName, setStyleName] = useState(null);
  const [standardPrice, setStandardPrice] = useState(0);
  const [fixedPrice, setFixedPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [styleImage, setStyleImage] = useState(null);
  const [code, setCode] = useState(null);
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      loadingUpdate,
      loadingUpload,
      loadingCreateCate,
      loadingCreateStyle,
      loadingDelete,
      product,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  });
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProduct(id);
        const cate = await getCategoryList();
        dispatch({ type: 'FETCH_SUCCESS', payload: res });
        setProductName(res.data.product_name);
        setCategoryId(res.data.category_id);
        setDescription(res.data.description);
        setImage(res.data.image);
        setCategorise(cate.data);
        setLoadData(false);
      } catch (err) { }
    };
    fetchData();
  }, [id, loadingCreateCate, loadingCreateStyle, loadingDelete]);

  const toggleModal = () => {
    document.getElementById('modal').classList.toggle('hidden');
  };

  const toggleModalAdd = () => {
    document.getElementById('modal-add').classList.toggle('hidden');
  };

  const uploadFileHandler = async (e) => {
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

  const uploadFileHandlerAdd = async (e) => {
    const image_product = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image_product', image_product);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await saveImage(bodyFormData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      toast.success('Image uploaded successfully');
      setStyleImage(data.secure_url);
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'UPLOAD_FAIL', payload: 'ERROR' });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await updateProduct(id, {
        product_name: productName,
        category_id: categoryId,
        description,
        image,
      });
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'UPDATE_FAIL' });
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
      toast.success('Category created successfully');
      setCategoryName(null);
      setDescription(null);
      toggleModal();
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'CREATECATE_FAIL' });
    }
  };

  const handleCreateStyle = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATEST_REQUEST' });
      if (product.option_type === 1) {
        await createColor({
          product_id: id,
          color_name: styleName,
          code,
          standard_price: standardPrice,
          fixed_price: fixedPrice,
          stock,
          image: styleImage,
        });
      } else {
        await createStyle({
          product_id: id,
          style_name: styleName,
          standard_price: standardPrice,
          fixed_price: fixedPrice,
          stock,
          image: styleImage,
        });
      }

      dispatch({
        type: 'CREATEST_SUCCESS',
      });
      toast.success('Category style successfully');
      setStyleName(null);
      setCode(null);
      setStandardPrice(0);
      setFixedPrice(0);
      setStock(0);
      setStyleImage(null);
      toggleModalAdd();
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'CREATEST_FAIL' });
    }
  };

  const deleteHandler = async (style) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        const status = 0;
        if (product.option_type === 1) {
          await deleteColor(style.id, status);
          toast.success('Product color deleted successfully');
        } else {
          await deleteStyle(style.id, status);
          toast.success('Product style deleted successfully');
        }
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
    <>
      <ToastContainer />
      {loadData || loading ? (
        <LoadingBox />
      ) : (
        <div className="w-full h-full justify-center items-center flex">
          <div className="w-2/3">
            <div className=" font-bold text-xl text-center my-6">
              Edit product #{product.id}
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
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  disabled="true"
                  checked={product.option_type === 1 ?? 'true'}
                />
                <label
                  for="default-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Color
                </label>
              </div>
              <div className="flex items-center w-1/6">
                <input
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  disabled="true"
                  checked={product.option_type === 2 ?? 'true'}
                />
                <label
                  for="default-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Style
                </label>
              </div>
            </div>
            <div>
              <label
                for="base-input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                List style
              </label>
              <div className="flex">
                {product.type.map((st) => (
                  <div className="w-1/3 bg-gray-100 shadow rounded p-4 m-1">
                    <div className="flex justify-between">
                      {product.option_type === 1
                        ? st.color_name
                        : st.style_name}
                      <div>
                        <button
                          className="px-2 py-2 mr-2 font-semibold text-white bg-yellow-300 rounded-md"
                          onClick={() =>
                            product.option_type === 1
                              ? navigate(
                                `/admin/product-color/edit/${product.id}/${st.id}`
                              )
                              : navigate(
                                `/admin/product-style/edit/${product.id}/${st.id}`
                              )
                          }
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
                          className="px-2 py-2 font-semibold text-white bg-red-400 rounded-md"
                          onClick={() => deleteHandler(st)}
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
                      </div>
                    </div>
                    <div className="mt-1 w-40">
                      <img src={st.image} alt="" />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="px-8 py-2 rounded bg-green-600 text-white mt-4"
                onClick={toggleModalAdd}
                type="button"
              >
                + Add
              </button>
            </div>
            <div className="w-full flex justify-center items-center mb-20">
              <button
                className="px-8 py-2 rounded bg-green-400 text-white mt-4"
                onClick={handleSubmit}
                type="button"
              >
                {loadingUpdate ? 'Loading...' : 'Update'}
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

          <div
            class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
            id="modal-add"
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
                  <div className="w-full flex">
                    <div className="mb-6 mr-4 w-1/2">
                      <label
                        for="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        {product.option_type === 1
                          ? 'Color Name'
                          : 'Style Name'}
                      </label>
                      <input
                        type="text"
                        id="product_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 outline-none"
                        value={styleName}
                        onChange={(e) => setStyleName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-6 ml-4 w-1/3">
                      <label
                        for="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Stock
                      </label>
                      <input
                        type="number"
                        id="product_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 outline-none"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                    </div>
                    {product.option_type === 1 && (
                      <div className="mb-6 w-1/6 space-x-2">
                        <label
                          for="base-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Color Hex
                        </label>
                        <input
                          type="color"
                          id="product_name"
                          className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-1 outline-none"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="w-full flex">
                    <div className="mb-6 mr-4 w-1/2">
                      <label
                        for="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Standard Price
                      </label>
                      <input
                        type="text"
                        id="product_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 outline-none"
                        value={standardPrice}
                        onChange={(e) => setStandardPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-6 ml-4 w-1/2">
                      <label
                        for="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Fixed Price
                      </label>
                      <input
                        type="number"
                        id="product_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 outline-none"
                        value={fixedPrice}
                        onChange={(e) => setFixedPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <label
                    for="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Product Color Image
                  </label>
                  <div className="w-full flex mb-1">
                    <div className="flex items-center justify-center w-1/2">
                      <label
                        for="dropzone-file-add"
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
                                <span className="font-semibold">
                                  Click to upload
                                </span>{' '}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                          )}
                        </div>
                        <input
                          id="dropzone-file-add"
                          type="file"
                          className="hidden"
                          onChange={uploadFileHandlerAdd}
                        />
                      </label>
                    </div>
                    <div className="w-1/2 justify-center items-center flex">
                      <div>
                        {' '}
                        <div className="px-8 mb-4">Preview:</div>
                        <img className="w-full px-8" src={styleImage} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-200 px-4 py-3 text-right">
                  <button
                    type="button"
                    class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    onClick={toggleModalAdd}
                  >
                    <i class="fas fa-times"></i> Cancel
                  </button>
                  <button
                    type="button"
                    class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                    onClick={handleCreateStyle}
                  >
                    <i class="fas fa-plus"></i>{' '}
                    {loadingCreateStyle ? ' Loading...' : 'Create'}
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
