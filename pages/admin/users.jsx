import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import SecondaryButton from "../../components/common/SecondaryButton";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import DangerButton from "../../components/common/DangerButton";
import Table from "../../components/common/Table/Table";
import TableRow from "../../components/common/Table/TableRow";
import RowField from "../../components/common/Table/RowField";
import AdminLayout from "../../components/AdminLayout";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
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
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/users`);
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

  const deleteHandler = async (userId) => {
    if (!window.confirm("آیا مطمئن هستید؟")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("کاربر مورد نظر با موفقیت حذف شد");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

  const tableHeaderItems = ["نام", "ایمیل", "سمت", "فرمان ها"];
  const router = useRouter();
  return (
    <Layout title="لیست کاربران">
      <AdminLayout
        activeIndex={3}
        error={error}
        loading={loading}
        altLoading={loadingDelete}
        title="لیست کاربران"
      >
        <Table headerItems={tableHeaderItems} cols={4}>
          {users.map((user, index) => (
            <TableRow key={index} cols={4}>
              <RowField>{user.name}</RowField>
              <RowField>{user.email}</RowField>
              <RowField>{user.isAdmin ? "ادمین" : "کاربر"}</RowField>
              <RowField>
                <SecondaryButton
                  sm
                  handleClick={() => router.push(`/admin/user/${user._id}`)}
                  text="ویرایش"
                />
                &nbsp;
                <DangerButton
                  onClick={() => deleteHandler(user._id)}
                  sm
                  text="حذف"
                />
              </RowField>
            </TableRow>
          ))}
        </Table>
      </AdminLayout>
    </Layout>
  );
}

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
