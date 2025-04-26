"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

const HeaderTop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/auth/user`,
    (url) => axios.get(url, { withCredentials: true }).then((res) => res.data)
  );

  useEffect(() => {
    if (data) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data]);

  return (
    <div className="h-8 bg-yellow-600 shadow-md">
      <div className="container mx-auto px-52">
        <div className="flex justify-center md:justify-between items-center h-full text-white pt-2">
          {/* Welcome message - hidden on mobile */}
          <div className="hidden md:block text-sm font-medium tracking-wide">
            Chào Mừng Bạn Đến Với Khách Sạn Của Chúng Tôi
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4 text-sm ">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4 w-screen justify-center md:w-full">
                <Link href={"/logOut"}>
                  <button
                    className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      mutate(
                        `${process.env.NEXT_PUBLIC_URL_API}/api/auth/user`,
                        null,
                        { revalidate: false }
                      );
                    }}
                  >
                    Đăng Xuất
                  </button>
                </Link>
                <div className="h-5 border-r-2 border-white" />
                <Link href={"#"}>
                  <div className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                    Tài Khoản
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4 w-screen justify-center md:w-full">
                <Link href={"/signIn"}>
                  <button className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                    Đăng Nhập
                  </button>
                </Link>
                <div className="h-4 border-r border-yellow-400" />
                <Link href={"/signUp"}>
                  <button className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                    Đăng Kí
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
