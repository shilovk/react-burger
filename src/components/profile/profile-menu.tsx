import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../services/types";
import { logout } from "../../services/actions/profile";

export const ProfileMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="w-1/4 text-left text_type_main-medium">
      <div className={`mb-5 ${pathname === "/profile" ? "text-white" : "text-grayText"} hover:text-white`}>
        <Link to="/profile">Профиль</Link>
      </div>
      <div
        className={`mb-5 ${pathname.startsWith("/profile/orders") ? "text-white" : "text-grayText"} hover:text-white`}
      >
        <Link to="/profile/orders">История заказов</Link>
      </div>
      <div className="text-grayText cursor-pointer hover:text-white" onClick={() => dispatch(logout())}>
        Выход
      </div>
      <div className="mt-20 text_type_main-default text-grayText">
        В этом разделе вы можете изменить свои персональные данные
      </div>
    </div>
  );
};
