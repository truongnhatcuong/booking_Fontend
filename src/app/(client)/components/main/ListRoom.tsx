import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

export interface RoomCustomer {
  id: string;
  roomNumber: string;
  roomTypeId: string;
  images: {
    id: string;
    imageUrl: string;
  }[];
  roomType: {
    name: string;
    maxOccupancy: number;
    basePrice: number;
    amenities: {
      amenity: {
        name: string;
      };
    }[];
  };
}

interface RoomType {
  roomtype: RoomCustomer;
}

const ListRoom = ({ roomtype }: RoomType) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center py-8 ">
      <Head>
        <title>{roomtype.roomType.name}</title>
      </Head>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md pb-8">
        <Image
          alt={roomtype.roomType.name}
          src={roomtype.images[0]?.imageUrl}
          width={500}
          height={300}
          className="object-cover w-full h-52 rounded-t-lg transform transition duration-300 ease-in-out hover:scale-105 hover:rotate-1 hover:shadow-2xl"
        />

        {/* Tên phòng */}
        <h1 className="text-2xl text-center my-4 uppercase roboto">
          {roomtype.roomNumber} - {roomtype.roomType.name}
        </h1>

        {/* Thông tin khách và diện tích */}
        <div className="text-center mb-4">
          <p className="roboto">Tiện Nghi:</p>
          <div className="flex justify-center gap-3 mt-2">
            {roomtype.roomType.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <span className="text-sm text-gray-600 font-mono">
                  {amenity.amenity.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-base text-gray-600 font-mono mt-2">
            {roomtype.roomType.maxOccupancy} Khách/phòng
          </p>
        </div>

        <div className="flex justify-between items-center mt-4 mx-6">
          <p className="text-red-600 roboto">
            {formatPrice(roomtype.roomType.basePrice)}/Đêm
          </p>
          <Button
            type="button"
            variant="default"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
            onClick={() =>
              router.push(`/rooms/${roomtype.roomTypeId}/${roomtype.id}`)
            }
          >
            Đặt Phòng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListRoom;
