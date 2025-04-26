"use client";
import React from "react";
import TableRoom from "./components/TableRoom";
import CreateRoom from "./components/CreateRoom";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const Page = () => {
  const { data: dataRoom } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/room`,
    fetcher
  );
  const { data: DataTypeRoom } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/roomtype`,
    fetcher
  );

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex justify-end ">
        <CreateRoom data={DataTypeRoom ?? []} />
      </div>
      <TableRoom rooms={dataRoom?.room ?? []} data={DataTypeRoom} />
    </div>
  );
};

export default Page;
