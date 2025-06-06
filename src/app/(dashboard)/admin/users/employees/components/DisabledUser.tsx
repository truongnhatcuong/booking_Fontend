import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import axiosInstance from "@/lib/axios";
import React from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

interface IDisabledUser {
  employee: {
    id: string;
    status: "ACTIVE" | "INACTIVE" | string;
  };
}
const DisabledUser = ({ employee }: IDisabledUser) => {
  const handleDisable = async () => {
    const nextStatus = employee.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      await axiosInstance.put(
        `/api/auth/employee/disabled/${employee.id}`,
        {
          action: nextStatus,
        },
        {
          withCredentials: true,
        }
      );
      mutate(`${process.env.NEXT_PUBLIC_URL_API}/api/auth/employee`);
      toast.success(
        `${employee.status === "ACTIVE" ? "đã vô hiệu hóa " : "Kích hoạt"}`
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <DropdownMenuItem className="text-destructive" onClick={handleDisable}>
        {employee.status === "ACTIVE" ? "Vô hiệu hóa" : "Kích hoạt"}
      </DropdownMenuItem>
    </>
  );
};

export default DisabledUser;
