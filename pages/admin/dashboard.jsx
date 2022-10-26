import axios from "axios";
import Link from "next/link";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  const navlinks = [
    { text: "داشبرد", href: "/admin/dashboard", isActive: true },
    { text: "سفارش ها", href: "/admin/orders", isActive: false },
    { text: "محصولات", href: "/admin/products", isActive: false },
    { text: "کاربران", href: "/admin/users", isActive: false  },
  ];

  const analystic = [
    { value: summary.ordersPrice, text: "فروش", link: "/admin/orders", color: 'bg-red-600' },
    { value: summary.ordersCount, text: "سفارش ها", link: "/admin/orders", color: 'bg-blue-600' },
    { value: summary.productsCount, text: "محصولات", link: "/admin/products", color: 'bg-orange-600' },
    { value: summary.usersCount, text: "کاربران", link: "/admin/users", color: 'bg-green-600' },
  ];
  return (
    <Layout title="داشبرد ادمین">
      <div
        className="grid max-w-7xl mx-auto bg-stone-800 overflow-hidden mt-5 rounded-xl text-stone-200 md:grid-cols-4 md:gap-5"
        dir="rtl"
      >
        <div className="bg-stone-900 p-3">
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
          <h1 className="mb-4 text-4xl text-stone-100 font-bold">
            ادمین داشبرد
          </h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {analystic.map((sum) => (
                  <Link key={sum.text} href={sum.link} passHref>
                    <div className={`flex flex-col items-center justify-center gap-5 rounded-lg py-10 ${sum.color}`}>
                      <p className="text-3xl">{sum.value} </p>
                      <p>{sum.text}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <h2 className="text-2xl mt-10">گزارش فروش</h2>
              <Bar
                options={{
                  legend: { display: true, position: "right" },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
