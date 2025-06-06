import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { mutate } from "swr";

interface AccountUserProps {
  userType: string | null;
  lastName: string | null;
}
const AccountUser = ({ userType, lastName }: AccountUserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        Tài Khoản của {lastName ? lastName : "Bạn"}{" "}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Thông Tin Tài Khoản</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userType === "EMPLOYEE" || userType === "ADMIN" ? (
          <DropdownMenuItem>
            <Link
              href="/admin"
              className="hover:text-yellow-600 transition-colors duration-100 cursor-pointer"
            >
              Quản Lý
            </Link>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem>
              <Link
                href="/profile"
                className="hover:text-yellow-600 transition-colors duration-100 cursor-pointer"
              >
                Thông Tin
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/profile/bookings"
                className="hover:text-yellow-600 transition-colors duration-100 cursor-pointer"
              >
                Đơn Đặt Phòng
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem>
          <Link
            href="/logOut"
            className="hover:text-yellow-600 transition-colors duration-100 cursor-pointer"
            onClick={() => {
              mutate(`${process.env.NEXT_PUBLIC_URL_API}/api/auth/user`, null, {
                revalidate: false,
              });
            }}
          >
            Đăng Xuất
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountUser;
