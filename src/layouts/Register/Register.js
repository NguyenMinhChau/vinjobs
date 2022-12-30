import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Register.module.css';

const cx = className.bind(styles);

export default function Register() {
    useEffect(() => {
        document.title = `Đăng ký | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return <div className={`${cx('container')}`}></div>;
}
