import React from "react";
import PropTypes from "prop-types";
import styles from "./header-item.module.css";

// eslint-disable-next-line react/prop-types
function HeaderItem({ icon, title, extraClass }) {
  return (
    <a href="#" className={`${extraClass} ${styles["header-item"]}`}>
      <div className={styles["header-item__icon"]}>{icon}</div>
      <p className={`${styles["header-item__title"]} pl-2`}>{title}</p>
    </a>
  );
}

HeaderItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
};

export default HeaderItem;
