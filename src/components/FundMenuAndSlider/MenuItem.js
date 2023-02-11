import React from 'react';
import className from 'classnames/bind';
import styles from './FundMenuAndSlider.module.css';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

export default function MenuItem({ title, nameIcon, to, onClick }) {
    return (
        <Link to={to} onClick={onClick} className={`${cx('menu_item')}`}>
            <div className={`${cx('menu_item_logo')}`}>
                <i class={nameIcon}></i>
            </div>
            <div className={`${cx('menu_item_text')}`}>{title}</div>
        </Link>
    );
}
