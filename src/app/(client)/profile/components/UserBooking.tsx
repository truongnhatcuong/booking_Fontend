"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Printer, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import RemoveBooking from "./RemoveBooking";

interface Amenity {
  amenity: {
    id: string;
    name: string;
  };
}

interface RoomType {
  id: string;
  name: string;
  amenities: Amenity[];
}

interface Room {
  roomNumber: string;
  floor: number;
  roomType: RoomType;
  images: {
    id: string;
    imageUrl: string;
  }[];
}

interface BookingItem {
  id: string;
  room: Room;
  pricePerNight: string;
}

interface Payment {
  id: string;
  paymentMethod: string;
  status: string;
  amount: string;
  paymentDate: string;
}

interface Booking {
  id: string;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  status: string;
  bookingSource: string;
  totalAmount: string;
  bookingItems: BookingItem[];
  payments: Payment[];
  discount: null | {
    code: string;
    percentage: number;
  };
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface BookingDetailsProps {
  booking: Booking;
}

const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const [expandedRoomIndex, setExpandedRoomIndex] = useState<number | null>(
    null
  );

  // Calculate nights stay
  const calculateNights = () => {
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    return Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  // Translate status to Vietnamese
  const translateStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "Đang chờ xác nhận",
      CONFIRMED: "Đã xác nhận",
      CHECKED_IN: "Đã nhận phòng",
      CHECKED_OUT: "Đã trả phòng",
      CANCELLED: "Đã hủy",
      NO_SHOW: "Không đến",
    };
    return statusMap[status] || status;
  };

  // Translate payment method
  const translatePaymentMethod = (method: string) => {
    const methodMap: Record<string, string> = {
      CASH: "Tiền mặt",
      CREDIT_CARD: "Thẻ tín dụng",
      DEBIT_CARD: "Thẻ ghi nợ",
      BANK_TRANSFER: "Chuyển khoản",
      PAYPAL: "PayPal",
      MOBILE_PAYMENT: "Ví điện tử",
    };
    return methodMap[method] || method;
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-medium">
                Đơn #{booking.id.slice(0, 8).toUpperCase()}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={
                    booking.status === "CANCELLED" ? "destructive" : "default"
                  }
                >
                  {translateStatus(booking.status)}
                </Badge>
                <span className="text-sm text-gray-500">
                  {formatDate(booking.bookingDate)}
                </span>
              </div>
            </div>
            {booking.status === "CHECKED_OUT" ? (
              <>
                {" "}
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  In hóa đơn
                </Button>
              </>
            ) : (
              <RemoveBooking bookingId={booking.id} />
            )}
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-4 space-y-4">
          {/* Stay Info */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Nhận phòng</p>
              <p className="font-medium">{formatDate(booking.checkInDate)}</p>
            </div>
            <div>
              <p className="text-gray-500">Trả phòng</p>
              <p className="font-medium">{formatDate(booking.checkOutDate)}</p>
            </div>
            <div>
              <p className="text-gray-500">Thời gian</p>
              <p className="font-medium">
                {calculateNights()} đêm • {booking.totalGuests} khách
              </p>
            </div>
          </div>

          {/* Rooms */}
          <div className="space-y-2">
            {booking.bookingItems.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center p-2 border rounded">
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        item.room.images[0]?.imageUrl || "/placeholder-room.jpg"
                      }
                      alt={item.room.roomNumber}
                      width={48}
                      height={48}
                      className="rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.room.roomType.name}</p>
                      <p className="text-sm text-gray-500">
                        Phòng {item.room.roomNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatPrice(Number(item.pricePerNight))}
                    </p>
                    <button
                      onClick={() =>
                        setExpandedRoomIndex(
                          expandedRoomIndex === index ? null : index
                        )
                      }
                      className="text-sm text-blue-600 flex items-center"
                    >
                      Xem tiện nghi
                      {expandedRoomIndex === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {expandedRoomIndex === index && (
                  <div className="p-2 bg-gray-50 rounded mt-2">
                    <p className="font-medium mb-2">Tiện nghi phòng:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.room.roomType.amenities.map((amenity, i) => (
                        <Badge key={i} variant="secondary">
                          {amenity.amenity.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Payment Details */}
          <div className="border-t pt-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Chi tiết thanh toán</h3>
              {booking.payments.map((payment, index) => (
                <div key={index} className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">
                    {translatePaymentMethod(payment.paymentMethod)} •{" "}
                    {formatDate(payment.paymentDate)}
                  </span>
                  <span>{formatPrice(Number(payment.amount))}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Tổng thanh toán</span>
              <span className="text-xl text-blue-600">
                {formatPrice(Number(booking.totalAmount))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
