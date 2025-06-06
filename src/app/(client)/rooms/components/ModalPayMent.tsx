import QrCodePayment from "@/app/(dashboard)/admin/bookings/addbooking/components/QrCodePayment";
import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

enum PaymentMethod {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  PAYPAL = "PayPal",
  QR_CODE = "QR_CODE",
}

interface ModalPaymentProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formData: {
    checkInDate: string;
    checkOutDate: string;
    totalGuests: number;
    specialRequests: string;
    totalAmount: number;
    discountId: number | null;
    pricePerNight: number;
    roomId: number;
  };
  onConfirmPayment?: (paymentMethod: PaymentMethod) => void;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      checkInDate: Date | null;
      checkOutDate: Date | null;
      totalGuests: number;
      specialRequests: string;
      totalAmount: number;
      discountId: number | null;
      pricePerNight: number;
      bookingSource: string;
      roomId: string;
    }>
  >;
}

const ModalPayment = ({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
}: ModalPaymentProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/api/booking`,
        formData,
        { withCredentials: true }
      );
      if (res.data) {
        router.push("/profile/bookings");
        toast.success("Đặt phòng thành công!");
        setIsOpen(false);
        const resPayment = await axios.post(
          `${process.env.NEXT_PUBLIC_URL_API}/api/payment`,
          {
            amount: formData.totalAmount,
            paymentMethod: selectedPaymentMethod,
            bookingId: res.data.data.id,
            status: "PENDING",
          }
        );

        if (resPayment.data) {
          console.log(resPayment.data, "resPayment");
          if (resPayment.data.status === "redirect") {
            const { url } = resPayment.data;
            window.location.href = url;
          }

          setIsOpen(false);
        } else {
          toast.error("Thanh toán thất bại, vui lòng thử lại!");
        }
      }
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  // Calculate number of nights
  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);

    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const nights = calculateNights();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => !isProcessing && setIsOpen(false)}
      contentLabel="Payment Confirmation"
      className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-6xl mx-auto mt-5 outline-none "
      overlayClassName="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-start z-50 overflow-auto"
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Xác Nhận Thanh Toán</h2>
          <button
            onClick={() => !isProcessing && setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            disabled={isProcessing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Booking Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Chi Tiết Booking</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Ngày Check In:</span>
                <span className="font-medium">
                  {formatDate(formData.checkInDate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Ngày Check Out:</span>
                <span className="font-medium">
                  {formatDate(formData.checkOutDate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Thời Gian:</span>
                <span className="font-medium">
                  {nights} {nights === 1 ? "Đêm" : "Đêm"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tổng Số Khách Hàng:</span>
                <span className="font-medium">{formData.totalGuests}</span>
              </div>

              {formData.specialRequests && (
                <div className="pt-2">
                  <span className="block mb-1">Special Requests:</span>
                  <p className="text-sm bg-white p-2 rounded border">
                    {formData.specialRequests}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between">
                <span>Giá Một Dêm:</span>
                <span className="font-medium">
                  {formatPrice(formData.pricePerNight)}
                </span>
              </div>

              <div className="flex justify-between font-bold text-xl mt-2">
                <span>Tổng Số Tiền:</span>
                <span className="text-blue-500">
                  {formatPrice(formData.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Chọn Phương Thức Thanh Toán
            </h3>

            <div className="space-y-3">
              {Object.values(PaymentMethod).map((method) => (
                <div
                  key={method}
                  onClick={() =>
                    !isProcessing && handlePaymentMethodSelect(method)
                  }
                  className={`p-4 border rounded-lg cursor-pointer flex items-center ${
                    selectedPaymentMethod === method
                      ? "border-blue-500 bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="mr-3">
                    {method === PaymentMethod.CASH && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {method === PaymentMethod.CREDIT_CARD && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    )}
                    {method === PaymentMethod.PAYPAL && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {method === PaymentMethod.QR_CODE && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{method}</h4>
                    <p className="text-sm text-gray-500">
                      {method === PaymentMethod.CASH &&
                        "Pay at reception during check-in"}
                      {method === PaymentMethod.CREDIT_CARD &&
                        "Secure payment with credit/debit card"}
                      {method === PaymentMethod.PAYPAL &&
                        "Pay using your PayPal account"}
                      {method === PaymentMethod.QR_CODE &&
                        "Scan QR code with your banking app"}
                    </p>
                  </div>
                  {selectedPaymentMethod === method && (
                    <div className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* {selectedPaymentMethod === PaymentMethod.QR_CODE && (
          <QrCodePayment Amount={formData.totalAmount} />
        )} */}

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => !isProcessing && setIsOpen(false)}
            className="px-4 py-2 text-gray-600 mr-3 hover:bg-gray-100 rounded disabled:opacity-50"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedPaymentMethod || isProcessing}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center cursor-pointer"
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Xác Nhận Thanh Toán"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalPayment;
