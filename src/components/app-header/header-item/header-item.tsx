import React from "react";
import styles from "./header-item.module.css";
import { HeaderItemProps } from "./header-item.types";

const HeaderItem = ({ icon, title, extraClass }: HeaderItemProps) => {
  return (
    <a href="#" className={`${extraClass || ""} ${styles["header-item"]}`}>
      <div className={styles["header-item__icon"]}>{icon}</div>
      <p className={`${styles["header-item__title"]} pl-2`}>{title}</p>
    </a>
  );
};

export default HeaderItem;
