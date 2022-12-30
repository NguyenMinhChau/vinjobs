import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './ResetPwd.module.css';

const cx = className.bind(styles);

export default function ResetPwd() {
    useEffect(() => {
        document.title = `Khôi phục tài khoản | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return <div className={`${cx('container')}`}></div>;
}
