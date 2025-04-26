/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

// Định nghĩa kiểu dữ liệu cho tab
type TabType = "hotel" | "meeting" | "beautiful";

const HotelShow = () => {
  const [hotel, setHotel] = React.useState<TabType>("hotel");

  // Dữ liệu cho từng tab
  const tabData: Record<
    TabType,
    { title: string; description: string; image: string; image1?: string }
  > = {
    hotel: {
      title: "KHÁCH SẠN",
      description:
        "Chúng tôi mang lại không gian thư giản và tiện nghi đáp ứng mọi nhu cầu cho bạn.Là khách sạn 5 sao đẳng cấp quốc tế, tọa lạc tại giao điểm của bốn quận chính, nơi được xem như trái tim và trung tâm của TP. Hồ Chí Minh. Với hệ thống phòng tiêu chuẩn và phòng hạng sang thiết kế đẹp mắt và trang nhã được chú trọng tới từng chi tiết sẽ đem lại sự tiện nghi và thoải mái tối đa cho quý khách dù là thời gian nghỉ ngơi thư giãn hay trong chuyến công tác...",
      image:
        "https://bizweb.dktcdn.net/100/472/947/themes/888072/assets/banner1_tab1.jpg?1732756636207",
      image1:
        "https://bizweb.dktcdn.net/100/472/947/themes/888072/assets/banner2_tab1.jpg?1732756636207",
    },
    meeting: {
      title: "PHÒNG HỌP",
      description:
        "Chúng tôi mang lại không gian thư giản và tiện nghi đáp ứng mọi nhu cầu cho bạn.Là khách sạn 5 sao đẳng cấp quốc tế, tọa lạc tại giao điểm của bốn quận chính, nơi được xem như trái tim và trung tâm của TP. Hồ Chí Minh. Với hệ thống phòng tiêu chuẩn và phòng hạng sang thiết kế đẹp mắt và trang nhã được chú trọng tới từng chi tiết sẽ đem lại sự tiện nghi và thoải mái tối đa cho quý khách dù là thời gian nghỉ ngơi thư giãn hay trong chuyến công tác...",
      image:
        "https://bizweb.dktcdn.net/100/472/947/themes/888072/assets/banner1_tab2.jpg?1732756636207",
      image1:
        "https://bizweb.dktcdn.net/100/472/947/themes/888072/assets/banner2_tab2.jpg?1732756636207",
    },
    beautiful: {
      title: "LÀM ĐẸP",
      description:
        "Chúng tôi mang lại không gian thư giản và tiện nghi đáp ứng mọi nhu cầu cho bạn.Là khách sạn 5 sao đẳng cấp quốc tế, tọa lạc tại giao điểm của bốn quận chính, nơi được xem như trái tim và trung tâm của TP. Hồ Chí Minh. Với hệ thống phòng tiêu chuẩn và phòng hạng sang thiết kế đẹp mắt và trang nhã được chú trọng tới từng chi tiết sẽ đem lại sự tiện nghi và thoải mái tối đa cho quý khách dù là thời gian nghỉ ngơi thư giãn hay trong chuyến công tác...",
      image:
        "https://bizweb.dktcdn.net/100/472/947/themes/888072/assets/banner1_tab3.jpg?1732756636207",
      image1:
        "https://bizweb.dktcdn.net/100/472/947/themes/888072/assets/banner2_tab3.jpg?1732756636207",
    },
  };

  const currentTab = tabData[hotel];

  return (
    <div className="min-h-screen bg-gray-100  p-6">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 mb-5 max-w-7xl mx-auto">
        <button
          onClick={() => setHotel("hotel")}
          className={`px-6 py-3 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 underline cursor-pointer  ${
            hotel === "hotel"
              ? "bg-yellow-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-yellow-500 hover:text-white hover:shadow-md"
          } border border-gray-200`}
        >
          Khách Sạn
        </button>
        <button
          onClick={() => setHotel("meeting")}
          className={`px-6 py-3 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 underline cursor-pointer  ${
            hotel === "meeting"
              ? "bg-yellow-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-yellow-500 hover:text-white hover:shadow-md"
          } border border-gray-200`}
        >
          Phòng Họp
        </button>
        <button
          onClick={() => setHotel("beautiful")}
          className={`px-6 py-3 underline rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 cursor-pointer ${
            hotel === "beautiful"
              ? "bg-yellow-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-yellow-500 hover:text-white hover:shadow-md"
          } border border-gray-200`}
        >
          Làm Đẹp
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-[#f8e1df] py-20 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 animate-fade-in px-9 ">
          {/* Hình ảnh */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-yellow-600 mb-6 uppercase tracking-tight">
              Tiện Nghi Sang Trọng
            </h1>
            <img
              src={currentTab.image}
              alt={currentTab.title}
              className="w-full h-full object-cover rounded-xl shadow-xl transition-opacity duration-300"
            />
          </div>
          {/* Thông tin */}
          <div className="flex-1 border p-3 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-sans text-gray-700 text-center  mb-4">
              {currentTab.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 roboto">
              {currentTab.description}
            </p>
          </div>
          <div className="flex-1">
            <img
              src={currentTab.image1}
              alt={currentTab.title}
              className="w-full h-full object-cover rounded-xl shadow-xl transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelShow;
