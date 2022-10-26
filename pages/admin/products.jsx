import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/common/PraimaryButton';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
export default function AdminProdcutsScreen() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Product created successfully');
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Product deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  const navlinks = [
    { text: "داشبرد", href: "/admin/dashboard", isActive: false },
    { text: "سفارش ها", href: "/admin/orders", isActive: false },
    { text: "محصولات", href: "/admin/products", isActive: true },
    { text: "کاربران", href: "/admin/users", isActive: false  },
  ];
  return (
    <Layout title="Admin Products">
      <div className="grid max-w-7xl mx-auto bg-stone-800 overflow-hidden mt-5 rounded-xl text-stone-200 md:grid-cols-4 md:gap-5" dir='rtl'>
        <div className='bg-stone-900 p-3'>
        <ul className="flex flex-col gap-1">
            {navlinks.map((navlink) => (
              <li key={navlink.text}>
                <Link href={navlink.href}>
                  <a className={`font-bold text-xl text-stone-100 rounded-md flex flex-row items-center justify-center bg-white py-4 ${navlink.isActive ? 'bg-opacity-10' : 'bg-opacity-5'} hover:bg-opacity-10 transition`}>
                    {navlink.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3 p-10">
          <div className="flex justify-between">
            <h1 className="mb-4 text-4xl text-stone-100 font-bold">محصولات</h1>
            {loadingDelete && <div>Deleting item...</div>}
            <PrimaryButton disabled={loadingCreate} handleClick={createHandler} text={loadingCreate ? 'Loading' : 'Create'} />
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="mt-10">
                  <ul className='grid grid-cols-6 w-full border-b border-b-stone-100 pb-6'>
                  <li className="">نام</li>
                    <li className="">قیمت</li>
                    <li className="">دسته بندی</li>
                    <li className="">تعداد</li>
                    <li className="">امتیاز</li>
                    <li className="">فرمان ها</li>
                  </ul>
                  {products.map((product) => (
                    <ul key={product._id} className="grid grid-cols-6 w-full border-b border-b-stone-100 py-6 items-center">
                      <li className="">{product.name}</li>
                      <li className="">${product.price}</li>
                      <li className="">{product.category}</li>
                      <li className="">{product.countInStock}</li>
                      <li className="">{product.rating}</li>
                      <li className="">
                        <Link href={`/admin/product/${product._id}`}>
                          <a type="button" className="default-button">
                            Edit
                          </a>
                        </Link>
                        &nbsp;
                        <button
                          onClick={() => deleteHandler(product._id)}
                          className="default-button"
                          type="button"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProdcutsScreen.auth = { adminOnly: true };
