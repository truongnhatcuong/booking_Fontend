"use client";
import React from "react";
import TableMaintenance from "./components/TableMaitenance";
import useSWR from "swr";

const page = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_URL_API}/api/maintenance`);
  return (
    <div>
      <TableMaintenance maintenance={data || []} />
    </div>
  );
};

export default page;
