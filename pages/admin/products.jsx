import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../../components/AdminLayout";
import DangerButton from "../../components/common/DangerButton";
import SecondaryButton from "../../components/common/SecondaryButton";
import RowField from "../../components/common/Table/RowField";
import Table from "../../components/common/Table/Table";
import TableRow from "../../components/common/Table/TableRow";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
export default function AdminProdcutsScreen() {
  const router = useRouter();

  const [{ loading, error, products, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      products: [],
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm("آیا مطمئن هستید؟")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("کالای شما با موفقیت حذف شد");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

  const tableHeaderItems = [
    "نام",
    "قیمت",
    "دسته بندی",
    "تعداد",
    "امتیاز",
    "فرمان ها",
  ];
  return (
    <Layout title="لیست محصولات">
      <AdminLayout
        activeIndex={2}
        error={error}
        loading={loading}
        altLoading={loadingDelete}
        title="لیست محصولات"
      >
        <Table headerItems={tableHeaderItems} cols={6}>
          {products.map((product, index) => (
            <TableRow key={index} cols={6}>
              <RowField>{product.name}</RowField>
              <RowField>${product.price}</RowField>
              <RowField>{product.category}</RowField>
              <RowField>{product.countInStock}</RowField>
              <RowField>{product.rating}</RowField>
              <RowField>
                <SecondaryButton
                  className={"w-1/2 text-xs"}
                  text={"ویرایش"}
                  sm
                  handleClick={() =>
                    router.push(`/admin/product/${product._id}`)
                  }
                />
                &nbsp;
                <DangerButton
                  className={`w-1/2 text-xs`}
                  text={"حذف"}
                  sm
                  handleClick={() => deleteHandler(product._id)}
                />
              </RowField>
            </TableRow>
          ))}
        </Table>
      </AdminLayout>
    </Layout>
  );
}

AdminProdcutsScreen.auth = { adminOnly: true };
