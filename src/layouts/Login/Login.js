import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Login.module.css';

const cx = className.bind(styles);

export default function Login() {
    useEffect(() => {
        document.title = `Đăng nhập | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return <div className={`${cx('container')}`}></div>;
}
