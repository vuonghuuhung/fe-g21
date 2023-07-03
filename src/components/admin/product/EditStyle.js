import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getStyle,
  saveImage,
  updateStyle,
} from '../../../services/apis/authProduct';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBox from '../../LoadingBox';

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
        loadingUpdate: false,
        errorUpload: action.payload,
      };
    default:
      return state;
  }
};

export default function EditStyle() {
  const [loadData, setLoadData] = useState(true);
  const [image, setImage] = useState(null);
  const [styleName, setStyleName] = useState(null);
  const [standardPrice, setStandardPrice] = useState(0);
  const [fixedPrice, setFixedPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  const [{ loading, error, loadingUpdate, loadingUpload, product }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const { id, style } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStyle(style);
        dispatch({ type: 'FETCH_SUCCESS', payload: res });
        setStyleName(res.data.style_name);
        setStandardPrice(res.data.standard_price);
        setFixedPrice(res.data.fixed_price);
        setStock(res.data.stock);
        setImage(res.data.image);
        setLoadData(false);
        console.log(res.data);
      } catch (err) { }
    };
    fetchData();
  }, [style]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await updateStyle(style, {
        style_name: styleName,
        standard_price: standardPrice,
        fixed_price: fixedPrice,
        stock,
        image,
      });
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product style updated successfully', { autoClose: 1000});
      navigate(`/admin/product/edit/${id}`);
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const uploadFileHandler = async (e) => {
    const image_product = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image_product', image_product);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await saveImage(bodyFormData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      toast.success('Image uploaded successfully', { autoClose: 1000});
      setImage(data.secure_url);
    } catch (err) {
      toast.error('ERROR');
      dispatch({ type: 'UPLOAD_FAIL', payload: 'ERROR' });
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
              Edit product Color #{product.id}
            </div>
            <div className="w-full flex">
              <div className="mb-6 mr-4 w-1/2">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Style Name
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
              <div className="mb-6 ml-4 w-1/2">
                <label
                  htmlFor="base-input"
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
            </div>
            <div className="w-full flex">
              <div className="mb-6 mr-4 w-1/2">
                <label
                  htmlFor="base-input"
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
                  htmlFor="base-input"
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
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Color Image
            </label>
            <div className="w-full flex mb-6">
              <div className="flex items-center justify-center w-1/2">
                <label
                  htmlFor="dropzone-file"
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
        </div>
      )}
    </>
  );
}
