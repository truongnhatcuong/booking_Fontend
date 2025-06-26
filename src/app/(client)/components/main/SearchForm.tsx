"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import useSWR from "swr";
import { URL_API } from "@/lib/fetcher";

interface IRoomType {
  id: string;
  name: string;
  maxOccupancy: number;
}

interface ISeearchForm {
  setSearchParams: (value: any) => void;
  searchParams: any;
  onSubmit: (e: React.FormEvent) => void;
}
const SearchForm = ({
  searchParams,
  setSearchParams,
  onSubmit,
}: ISeearchForm) => {
  const { data: roomType } = useSWR(`${URL_API}/api/roomtype`);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev: any) => ({
      ...prev,
      [name]: name === "customer" ? Number(value) : value,
    }));
  };

  const selectedRoom = roomType?.find(
    (r: IRoomType) => r.id === searchParams.roomType
  );

  const maxOccupancy =
    selectedRoom?.maxOccupancy ||
    Math.max(...(roomType?.map((r: IRoomType) => r.maxOccupancy) || [1]));

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col">
          <label
            htmlFor="checkInDate"
            className="mb-2 font-medium text-gray-700"
          >
            Ngày nhận phòng
          </label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={searchParams.checkInDate}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split("T")[0]}
          />
          {/* <DatePicker
            id="checkInDate"
            name="checkInDate"
            value={searchParams.checkInDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          /> */}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="checkOutDate"
            className="mb-2 font-medium text-gray-700"
          >
            Ngày trả phòng
          </label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={searchParams.checkOutDate}
            onChange={handleChange}
            disabled={!searchParams.checkInDate}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="customer" className="mb-2 font-medium text-gray-700">
            Số Khách
          </label>
          <select
            id="customer"
            name="customer"
            value={searchParams.customer}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[...Array(maxOccupancy)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} khách
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="roomType" className="mb-2 font-medium text-gray-700">
            Loại phòng
          </label>
          <select
            id="roomType"
            name="roomType"
            value={searchParams.roomType}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả</option>
            {roomType?.map((item: IRoomType) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 lg:col-span-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
        >
          Tìm phòng trống
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
