import axios from "axios";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import PN from "persian-number";

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
import AdminLayout from "../../components/AdminLayout";

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

  const analystic = [
    {
      value: summary.ordersPrice,
      text: "فروش",
      link: "/admin/orders",
      color: "bg-red-600",
    },
    {
      value: summary.ordersCount,
      text: "سفارش",
      link: "/admin/orders",
      color: "bg-blue-600",
    },
    {
      value: summary.productsCount,
      text: "محصول",
      link: "/admin/products",
      color: "bg-orange-600",
    },
    {
      value: summary.usersCount,
      text: "کاربر",
      link: "/admin/users",
      color: "bg-green-600",
    },
  ];
  return (
    <Layout title="داشبرد ادمین">
      <AdminLayout
        activeIndex={0}
        error={error}
        loading={loading}
        title="داشبرد ادمین"
      >
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {analystic.map((sum) => (
              <Link key={sum.text} href={sum.link} passHref>
                <div
                  className={`flex flex-col cursor-pointer items-center justify-center gap-5 rounded-lg py-10 ${sum.color}`}
                >
                  <p className="xl:text-3xl lg:text-2xl text-xl">
                    {PN.convertEnToPe(PN.sliceNumber(sum.value))}{" "}
                  </p>
                  <p className="lg:text-lg text-base">{sum.text}</p>
                </div>
              </Link>
            ))}
          </div>
          <h2 className="text-2xl mt-10">گزارش فروش</h2>
          <div className="w-full overflow-scroll">
          <Bar
            options={{
              legend: { display: true, position: "right" },
            }}
            data={data}
          />
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
