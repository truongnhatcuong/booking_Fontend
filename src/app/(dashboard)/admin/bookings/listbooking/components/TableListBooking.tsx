import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/formatPrice";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";
import UpdateStatus from "./UpdateStatus";

export interface IBooking {
  id: string;
  checkInDate: string; // ISO string
  checkOutDate: string; // ISO string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "CHECKED_IN" | "CHECKED_OUT";
  totalAmount: string; // String to match API
  totalGuests: number;
  bookingItems: {
    room: { roomNumber: number; roomType: { name: string; photoUrls: string } };
  }[];
  customer: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
  payments: {
    id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    paymentMethod: string;
  }[];
}
interface BookingProps {
  booking: IBooking[];
  error: boolean;
}

const TableListBooking = ({ booking, error }: BookingProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hình Ảnh
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Khách hàng
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loại Phòng
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày nhận phòng
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày trả phòng
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số khách
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tổng tiền
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thanh toán
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {booking?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.bookingItems.map((item, index) => (
                  <div key={index} className="relative">
                    <p className="absolute text-gray-700 bg-white bottom-0 right-8 rounded-b-md ">
                      P{item.room.roomNumber}{" "}
                    </p>
                    <Image
                      alt="lỗi ảnh"
                      src={item.room.roomType.photoUrls || "/available.png"}
                      width={300}
                      height={300}
                      className=" w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                ))}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.customer.user.firstName}{" "}
                {booking.customer.user.lastName}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.bookingItems.map((item, index) => (
                  <span key={index}>{item.room.roomType.name}</span>
                ))}
              </TableCell>

              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(booking.checkInDate).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(booking.checkOutDate).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.totalGuests} Khách
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatPrice(Number(booking.totalAmount))}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.status === "CHECKED_OUT"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "CHECKED_IN"
                      ? "bg-blue-100 text-blue-800"
                      : booking.status === "CANCELLED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.status}
                </span>
              </TableCell>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.payments[0]?.status === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : booking.payments[0]?.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.payments[0]?.status || "N/A"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {booking.status !== "CANCELLED" && (
                  <>
                    <UpdateStatus id={booking.id} status={booking.status} />
                  </>
                )}
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && (
        <p className="text-red-600 p-4">Lỗi khi tải danh sách đặt phòng</p>
      )}
      {!booking?.length && !error && (
        <p className="text-gray-600 p-4">
          Không có đặt phòng nào khớp với bộ lọc
        </p>
      )}
    </div>
  );
};

export default TableListBooking;
