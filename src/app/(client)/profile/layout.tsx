import React from "react";
import ProfileItems from "./components/ProfileItems";

const layoutProfile = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:mt-10 mt-0 h-[100vh]  grid grid-cols-[15%_85%] md:grid-cols-[20%_80%] mx-auto  container">
      <div>
        <ProfileItems />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layoutProfile;
