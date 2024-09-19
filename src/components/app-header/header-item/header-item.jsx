import React from 'react';
import styles from './header-item.module.css';

function HeaderItem({ icon, title, extraClass }) {
    return (
        <p className={`${extraClass} ${styles.headerItem}`}>
            {icon}
            <p className="pl-2">{title}</p>
        </p>
    );
}

export default HeaderItem;