import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import SecondaryButton from '../../components/common/SecondaryButton';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import {useRouter} from 'next/router'
import DangerButton from '../../components/common/DangerButton';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, users: action.payload, error: '' };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: action.payload };
          
          case 'DELETE_REQUEST':
            return { ...state, loadingDelete: true };
            case 'DELETE_SUCCESS':
              return { ...state, loadingDelete: false, successDelete: true };
              case 'DELETE_FAIL':
                return { ...state, loadingDelete: false };
                case 'DELETE_RESET':
                  return { ...state, loadingDelete: false, successDelete: false };
                  default:
                    return state;
                  }
                }
                
                function AdminUsersScreen() {
                  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: '',
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/admin/users`);
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
  
  const deleteHandler = async (userId) => {
    if (!window.confirm('آیا مطمئن هستید؟')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('User deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };
  const navlinks = [
    { text: "داشبرد", href: "/admin/dashboard", isActive: false },
    { text: "سفارش ها", href: "/admin/orders", isActive: false },
    { text: "محصولات", href: "/admin/products", isActive: false },
    { text: "کاربران", href: "/admin/users", isActive: true  },
  ];
  const router = useRouter();
  return (
    <Layout title="Users">
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
          <h1 className="mb-4 text-4xl text-stone-100 font-bold">کاربران</h1>
          {loadingDelete && <div>Deleting...</div>}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="mt-10">
                  <ul className='grid grid-cols-4 w-full border-b text-right border-b-stone-100 pb-6'>
                    <th className="">نام</th>
                    <th className="">ایمیل</th>
                    <th className="">ادمین</th>
                    <th className="">فرمان ها</th>
                  </ul>
                  {users.map((user) => (
                    <ul key={user._id} className="grid grid-cols-4 w-full border-b border-b-stone-100 py-6 items-center">
                      <li className=" ">{user.name}</li>
                      <li className=" ">{user.email}</li>
                      <li className=" ">{user.isAdmin ? 'YES' : 'NO'}</li>
                      <li className="flex flex-row gap-1">
                          <SecondaryButton sm handleClick={() => router.push(`/admin/user/${user._id}`)} text='ویرایش' />
                        &nbsp;
                        <DangerButton onClick={() => deleteHandler(user._id)} sm text='حذف' />
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

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
