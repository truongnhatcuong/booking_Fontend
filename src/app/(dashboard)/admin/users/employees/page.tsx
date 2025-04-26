"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import EmployeeTable from "./components/TableEmployee";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const Page = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/auth/employee`,
    fetcher
  );

  return (
    <div className="bg-white p-6 rounded-xl">
      {<EmployeeTable employee={data?.employee || []} />}
    </div>
  );
};

export default Page;
