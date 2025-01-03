import React from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import HeaderItem from "./header-item/header-item";

function AppHeader() {
  return (
    <header
      className={`${styles["app-header"]} text text_type_main-default pl-10 pr-10`}
    >
      <nav className={styles["app-header__nav"]}>
        <div className={styles["app-header__left-section"]}>
          <HeaderItem
            extraClass={"pr-10"}
            icon={<BurgerIcon type="primary" />}
            title="Конструктор"
          />
          <HeaderItem
            icon={<ListIcon type="secondary" />}
            title="Лента заказов"
          />
        </div>
        <div className={styles["app-header__logo"]}>
          <Logo />
        </div>
        <div className={styles["app-header__right-section"]}>
          <HeaderItem
            extraClass={"pr-15"}
            icon={<ProfileIcon type="secondary" />}
            title="Личный кабинет"
          />
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
