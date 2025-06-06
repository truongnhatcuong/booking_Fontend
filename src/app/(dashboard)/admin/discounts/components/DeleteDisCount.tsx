"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { mutate } from "swr";

interface DeleteDiscountProps {
  id: string;
}

const DeleteDisCount = ({ id }: DeleteDiscountProps) => {
  const MySwal = withReactContent(Swal);
  const handleDelete = async () => {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "Bạn sẽ không thể hoàn nguyên điều này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_URL_API}/api/discount/${id}`
        );
        if (res.data) {
          mutate(`${process.env.NEXT_PUBLIC_URL_API}/api/discount/getAll`);
          toast.success("Xóa Thành Công Mã Giảm Giá");
        }
      }
    } catch (error: any) {
      toast.success(error.response.data.message);
    }
  };

  return (
    <Button variant="ghost" onClick={handleDelete} className="cursor-pointer">
      <Trash className="h-20 w-20 text-red-500 hover:text-red-600  " />
    </Button>
  );
};

export default DeleteDisCount;
