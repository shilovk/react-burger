import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import HeaderItem from "./header-item/header-item";

function AppHeader() {
    return (
        <header className={`${styles.header} text text_type_main-default pl-10 pr-10`}>
            <p className={styles.leftSection}>
                <HeaderItem extraClass={"pr-10"} icon={<BurgerIcon type="primary" />} title="Конструктор" />
                <HeaderItem icon={<ListIcon type="secondary" />} title="Лента заказов" />
            </p>
            <Logo className={styles.logoContainer} />
            <HeaderItem extraClass={`${styles.rightSection} pr-15`} icon={<ProfileIcon type="secondary" />} title="Личный кабинет" />
        </header>
    );
}

export default AppHeader;