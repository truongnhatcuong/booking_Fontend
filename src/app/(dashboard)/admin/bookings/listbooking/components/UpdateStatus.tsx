"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { mutate } from "swr";
interface IUpdateStatus {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "CHECKED_IN" | "CHECKED_OUT";
}
const UpdateStatus = ({ id, status }: IUpdateStatus) => {
  const handleUpdateStatus = async () => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_URL_API}/api/booking/${id}`
    );

    if (res.data) {
      if (res.data.data.status === "CHECKED_IN") {
        toast.success("Đã nhận phòng");
      } else if (res.data.data.status === "CHECKED_OUT") {
        toast.success("Đã trả phòng");
      }
      mutate(`${process.env.NEXT_PUBLIC_URL_API}/api/booking`);
    }
  };
  // huy
  const handleCancelledStatus = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_URL_API}/api/booking/cancelled/${id}`
      );

      if (res.data) {
        mutate(`${process.env.NEXT_PUBLIC_URL_API}/api/booking`);
        toast.success("Phòng Đã Được Hủy");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <DropdownMenu>
        {" "}
        <DropdownMenuTrigger className="text-center ml-8">
          <MoreHorizontal className="w-5 h-5 cursor-pointer " />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {" "}
          <DropdownMenuLabel>Hành Động</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <button
                className="text-green-600 hover:text-green-800 mr-2 cursor-pointer"
                onClick={handleUpdateStatus}
                disabled={status === "CHECKED_OUT"}
              >
                {status === "PENDING"
                  ? "Nhận Phòng"
                  : status === "CHECKED_IN"
                  ? "Trả Phòng"
                  : "Hoàn Thành"}
              </button>
            </DropdownMenuItem>
            {status !== "CHECKED_OUT" && (
              <DropdownMenuItem>
                <button
                  className="text-yellow-600 hover:text-yellow-800"
                  onClick={handleCancelledStatus}
                >
                  Hủy Phòng
                </button>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <button className="text-red-600 hover:text-red-800">
                Xóa Phòng
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UpdateStatus;
