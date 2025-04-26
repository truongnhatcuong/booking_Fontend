"use client";
import React from "react";
import CardRoom from "../components/CardRoom";
import useSWR from "swr";

import { use } from "react";
import { fetcher } from "@/lib/fetcher";
const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/room/roomtype/${id}`,
    fetcher
  );
  console.log("Data", data);

  if (!data) {
    return <div>Loading...</div>;
  }
  return <div>{<CardRoom room={data ? data.room : {}} />}</div>;
};

export default Page;
