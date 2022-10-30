import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="دسترسی غیر مجاز">
      <div className="py-48 w-full flex flex-col gap-10 items-center justify-center">
        <h1 className="text-6xl text-stone-200">دسترسی غیر مجاز</h1>
        {message && <div className="mb-4 text-red-400 text-2xl">{message}</div>}
      </div>
    </Layout>
  );
}
