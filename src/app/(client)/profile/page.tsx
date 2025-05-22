"use client";
import { fetcher } from "@/lib/fetcher";
import React from "react";
import useSWR from "swr";
import ProfileUser from "./components/ProfileUser";

const page = () => {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/auth/user`,
    fetcher
  );

  if (isLoading) return <div>đang tải</div>;
  if (error) return <div>Đã xảy ra lỗi</div>;
  return (
    <div>
      <ProfileUser user={data || {}} />
    </div>
  );
};

export default page;
