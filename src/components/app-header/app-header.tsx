import React from "react";
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import HeaderItem from "./header-item/header-item";
import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <header className={`${styles["app-header"]} text text_type_main-default pl-10 pr-10`}>
      <nav className={styles["app-header__nav"]}>
        <div className={styles["app-header__left-section"]}>
          <HeaderItem extraClass={"pr-10"} icon={<BurgerIcon type="primary" />} title="Конструктор" route="/" />
          <HeaderItem icon={<ListIcon type="secondary" />} title="Лента заказов" route="/feed" />
        </div>
        <div className={styles["app-header__logo"]}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles["app-header__right-section"]}>
          <HeaderItem
            extraClass={"pr-15"}
            icon={<ProfileIcon type="secondary" />}
            title="Личный кабинет"
            route="/profile"
          />
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
