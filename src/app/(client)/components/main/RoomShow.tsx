"use client";
import React from "react";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ListRoom, { RoomCustomer } from "./ListRoom";

const RoomShow = () => {
  const { data, error } = useSWR<RoomCustomer[]>(
    `${process.env.NEXT_PUBLIC_URL_API}/api/room/customer`,
    fetcher
  );

  if (error) return <div>Đã có lỗi xảy ra.</div>;
  if (!data) return <div>Đang tải dữ liệu...</div>;

  const singleRooms = data?.filter(
    (room) => room.roomType.name === "Phòng Đơn"
  );
  const doubleRooms = data?.filter(
    (room) => room.roomType.name === "Phòng Vip"
  );

  return (
    <div className="space-y-8 text-center pt-9">
      {/* Phòng Đơn */}
      <div>
        <h2 className="text-5xl  regular mb-4">Phòng Đơn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {singleRooms.slice(0, 4).map((room, index) => (
            <ListRoom roomtype={room} key={`single-${index}`} />
          ))}
        </div>
      </div>

      {/* Phòng Đôi */}
      <div>
        <h2 className="text-5xl regular mb-4">Phòng Vip</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {doubleRooms.slice(0, 4).map((room, index) => (
            <ListRoom roomtype={room} key={`double-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomShow;
