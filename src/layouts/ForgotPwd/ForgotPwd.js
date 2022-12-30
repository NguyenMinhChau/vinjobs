import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './ForgotPwd.module.css';

const cx = className.bind(styles);

export default function ForgotPwd() {
    useEffect(() => {
        document.title = `Quên mật khẩu | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return <div className={`${cx('container')}`}></div>;
}
