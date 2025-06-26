/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import UpdateRoom from "./UpdateRoom";
import DeleteRoom from "./DeleteRoom";
import CheckDateInOut from "./CheckDateInOut";
import CreateMaintenanceForm from "../../maintenance/components/CreateMaintenanceForm";

interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
  images: { id: string; imageUrl: string }[];
  notes: string;
  roomTypeId: string;
  bookingItems: { booking: { checkInDate: string; checkOutDate: string } }[];
  roomType: {
    name: string;
    maxOccupancy: number;
  };
}

interface TableRoomProps {
  rooms: Room[];
  data: any[];
}

function translateStatus(status: string) {
  switch (status) {
    case "AVAILABLE":
      return "Có Sẵn";
    case "OCCUPIED":
      return "Đã Nhận Phòng";
    case "MAINTENANCE":
      return "Bảo Trì";
  }
}

const TableRoom = ({ rooms, data }: TableRoomProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hình Ảnh</TableHead>
            <TableHead>Số phòng</TableHead>
            <TableHead>Tầng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày Nhận && Ngày Trả</TableHead>
            <TableHead>Loại phòng</TableHead>
            <TableHead>Hành Động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms !== null && rooms.length > 0 ? (
            rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>
                  <Image
                    src={room.images[0].imageUrl}
                    alt={room.roomType.name}
                    height={100}
                    width={100}
                    className="h-16 w-16 rounded-full "
                  />
                </TableCell>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell> Tầng {room.floor}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      room.status === "AVAILABLE"
                        ? "bg-green-100 text-green-800"
                        : room.status === "OCCUPIED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {translateStatus(room.status)}
                  </span>
                </TableCell>
                <TableCell>
                  <CheckDateInOut room={room} />
                </TableCell>
                <TableCell>{room.roomType.name}</TableCell>
                <TableCell className="flex items-center mt-2 gap-3">
                  <UpdateRoom data={data} rooms={room} />
                  <DeleteRoom roomTypeId={room.id} />
                  <CreateMaintenanceForm
                    RoomNumber={room.roomNumber}
                    roomId={room.id}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Không có dữ liệu phòng nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableRoom;
