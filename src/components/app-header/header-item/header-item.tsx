import React from "react";
import styles from "./header-item.module.css";
import { HeaderItemProps } from "./header-item.types";
import { Link, useLocation } from "react-router-dom";

const HeaderItem = ({ icon, title, route, extraClass }: HeaderItemProps) => {
  const location = useLocation();
  const isActive =
    location.pathname === route ||
    (route === "/" && location.pathname.startsWith("/ingredients/"));
  const activeIcon = React.cloneElement(icon, {
    type: isActive ? "primary" : "secondary",
  });

  return (
    <Link
      to={route}
      className={`${extraClass || ""} ${styles["header-item"]} ${
        isActive ? styles["header-item_active"] : styles["header-item__default"]
      }`}
    >
      <div>{activeIcon}</div>
      <div>{title}</div>
    </Link>
  );
};

export default HeaderItem;
