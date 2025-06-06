import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";
import React from "react";
import Modal from "react-modal";

interface Room {
  bookingItems: { booking: { checkInDate: string; checkOutDate: string } }[];
}
interface CheckDateInOutProps {
  room: Room;
}

const CheckDateInOut = ({ room }: CheckDateInOutProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button className="cursor-pointer ml-7" onClick={() => setIsOpen(true)}>
        Kiểm Tra
      </Button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="danh sách lịch phòng"
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-4xl mx-auto mt-40 outline-none "
        overlayClassName="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto"
      >
        {room.bookingItems.length > 0 ? (
          <div className="flex flex-col gap-4">
            {room.bookingItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-around items-center border-b py-2"
              >
                {index + 1}
                <span>
                  Nhận phòng: {formatDate(item.booking.checkInDate)} - Trả
                  phòng: {formatDate(item.booking.checkOutDate)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>Không có lịch đặt phòng nào</p>
        )}
      </Modal>
    </>
  );
};

export default CheckDateInOut;
