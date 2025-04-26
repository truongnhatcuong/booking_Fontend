import React from "react";

import BeanHotel from "./components/header/BeanHotel";
import Banner from "./components/main/Banner";
import RoomShow from "./components/main/RoomShow";
import HotelShow from "./components/main/HotelShow";

const page = () => {
  console.log(process.env.NEXT_PUBLIC_URL_API);

  return (
    <div className="">
      {" "}
      <Banner />
      <BeanHotel />
      <RoomShow />
      <HotelShow />
    </div>
  );
};

export default page;
