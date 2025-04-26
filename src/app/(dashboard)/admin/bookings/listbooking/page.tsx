"use client";
import React, { useState, useEffect } from "react";
import { formatPrice } from "@/lib/formatPrice";
import { Calendar, User, DollarSign, Filter } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useSWR, { mutate } from "swr";
import toast from "react-hot-toast";
import { fetcher } from "@/lib/fetcher";

interface BookedRange {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
}

interface Booking {
  id: string;
  checkInDate: string; // ISO string
  checkOutDate: string; // ISO string
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  totalAmount: string; // String to match API
  totalGuests: number;
  customer: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
  payments: {
    id: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    paymentMethod: string;
  }[];
}

const API_URL = process.env.NEXT_PUBLIC_URL_API || "http://localhost:3000/api";

const BookingManagementForm: React.FC = () => {
  const [filters, setFilters] = useState<{
    status: string;
    checkInDate: Date | null;
    checkOutDate: Date | null;
    customerSearch: string;
  }>({
    status: "",
    checkInDate: null,
    checkOutDate: null,
    customerSearch: "",
  });

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  // Construct query string for filters
  const queryParams = new URLSearchParams({
    ...(filters.status && { status: filters.status }),
    ...(filters.checkInDate && {
      checkInDate: filters.checkInDate.toISOString(),
    }),
    ...(filters.checkOutDate && {
      checkOutDate: filters.checkOutDate.toISOString(),
    }),
    ...(filters.customerSearch && { customer: filters.customerSearch }),
    take: "10",
  }).toString();

  // Fetch bookings
  const { data, error } = useSWR<{ bookings: Booking[]; message: string }>(
    `${API_URL}/api/booking?${queryParams}`,
    fetcher
  );

  // Fetch booked dates for a specific room (if editing)
  const { data: bookedRanges } = useSWR<BookedRange[]>(
    selectedRoomId ? `${API_URL}/room/${selectedRoomId}/booked-dates` : null,
    fetcher
  );

  useEffect(() => {
    if (bookedRanges) {
      setBookedDates(getBookedDates(bookedRanges));
    }
  }, [bookedRanges]);

  function getBookedDates(ranges: BookedRange[]): Date[] {
    const bookedDates: Date[] = [];
    ranges.forEach((range) => {
      const startDate = new Date(range.start);
      const endDate = new Date(range.end);
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        bookedDates.push(new Date(d));
      }
    });
    return bookedDates;
  }

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateFilterChange = (
    date: Date | null,
    field: "checkInDate" | "checkOutDate"
  ) => {
    setFilters((prev) => ({ ...prev, [field]: date }));
  };

  const handleUpdateStatus = async (
    bookingId: string,
    newStatus: Booking["status"]
  ) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        toast.success(`Cập nhật trạng thái thành ${newStatus}`);
        mutate(`${API_URL}/bookings?${queryParams}`);
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái");
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (confirm("Bạn có chắc muốn hủy đặt phòng này?")) {
      await handleUpdateStatus(bookingId, "CANCELLED");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Quản lý đặt phòng
      </h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Filter size={20} className="mr-2 text-blue-600" />
          Bộ lọc
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              <option value="PENDING">Đang chờ</option>
              <option value="CONFIRMED">Đã xác nhận</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày nhận phòng
            </label>
            <DatePicker
              selected={filters.checkInDate}
              onChange={(date) => handleDateFilterChange(date, "checkInDate")}
              placeholderText="Chọn ngày"
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày trả phòng
            </label>
            <DatePicker
              selected={filters.checkOutDate}
              onChange={(date) => handleDateFilterChange(date, "checkOutDate")}
              placeholderText="Chọn ngày"
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm khách hàng
            </label>
            <input
              type="text"
              name="customerSearch"
              value={filters.customerSearch}
              onChange={handleFilterChange}
              placeholder="Nhập tên hoặc ID khách hàng"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã đặt phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày nhận phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày trả phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số khách
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thanh toán
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.bookings?.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.id.slice(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.customer.user.firstName}{" "}
                  {booking.customer.user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(booking.checkInDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(booking.checkOutDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.totalGuests}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatPrice(Number(booking.totalAmount))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.payments[0]?.status === "SUCCESS"
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
                  <button
                    onClick={() => alert(JSON.stringify(booking, null, 2))}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Chi tiết
                  </button>
                  {booking.status !== "CANCELLED" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(booking.id, "CONFIRMED")
                        }
                        className="text-green-600 hover:text-green-800 mr-2"
                        disabled={booking.status === "CONFIRMED"}
                      >
                        Xác nhận
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Hủy
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && (
          <p className="text-red-600 p-4">Lỗi khi tải danh sách đặt phòng</p>
        )}
        {!data?.bookings?.length && !error && (
          <p className="text-gray-600 p-4">
            Không có đặt phòng nào khớp với bộ lọc
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingManagementForm;
