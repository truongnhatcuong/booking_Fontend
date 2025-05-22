"use client";
import { fetcher } from "@/lib/fetcher";
import React from "react";
import useSWR from "swr";
import TableDiscount from "./components/TableDisCount";
import CreateDiscount from "./components/CreateDisCount";

export interface IDiscount {
  id: string;
  code: string;
  percentage: number;
  validFrom: string;
  validTo: string;
}
const page = () => {
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/discount/getAll`,
    fetcher
  );
  if (isLoading) {
    return <div>Dữ Liệu Đang Cập Nhật</div>;
  }
  return (
    <div>
      <div className="flex justify-end mb-4">
        {" "}
        <CreateDiscount />
      </div>
      <TableDiscount discounts={data?.allDisCode} />
    </div>
  );
};

export default page;
