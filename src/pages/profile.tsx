import React from "react";
import { Outlet } from "react-router-dom";
import { ProfileMenu } from "../components/profile/profile-menu";

export const Profile: React.FC = () => {
  return (
    <div className="mt-20 flex items-start">
      <ProfileMenu />

      <div className="w-1/2">
        <Outlet />
      </div>
    </div>
  );
};
