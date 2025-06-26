import React from "react";

import BeanHotel from "./components/header/BeanHotel";
import Banner from "./components/main/Banner";
import RoomShow from "./components/main/RoomShow";
import HotelShow from "./components/main/HotelShow";
import ShearchRoomPage from "./components/main/SearchRoom";

const page = () => {
  return (
    <div className="">
      {" "}
      <Banner />
      <ShearchRoomPage />
      <BeanHotel />
      <RoomShow />
      <HotelShow />
    </div>
  );
};

export default page;
