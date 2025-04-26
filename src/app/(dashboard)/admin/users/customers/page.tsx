"use client";
import React from "react";
import TableCustomer from "../components/TableCustomer";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const Page = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/auth/customer`,
    fetcher
  );

  if (error) {
    return <div>Đã xảy ra lỗi: {error.message}</div>;
  }

  // Kiểm tra trạng thái loading và hiển thị thông báo
  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }
  return (
    <div className="bg-white p-6 rounded-xl">
      {<TableCustomer customers={data.customer} />}
    </div>
  );
};

export default Page;
