import React from 'react';
import className from 'classnames/bind';
import styles from './Sidebar.module.css';

const cx = className.bind(styles);

export default function Sidebar() {
    return <div className={`${cx('container')}`}></div>;
}
