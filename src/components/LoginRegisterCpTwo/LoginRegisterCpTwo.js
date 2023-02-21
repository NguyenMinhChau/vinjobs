import React from 'react';
import className from 'classnames/bind';
import styles from './LoginRegisterCpTwo.module.css';
import { Link } from 'react-router-dom';
import { routers } from '../../routers';

const cx = className.bind(styles);

export default function LoginRegisterCpTwo({
    marginBottom,
    marginTop,
    padding,
}) {
    return (
        <div
            className={`${cx('btn_container')}`}
            style={{
                marginBottom: marginBottom,
                marginTop: marginTop,
                padding: padding,
            }}
        >
            <Link className={`${cx('btn')} infobgcbold mr8`} to={routers.login}>
                Đăng nhập
            </Link>
            <Link
                className={`${cx('btn')} cancelbgcbold ml8`}
                to={routers.register}
            >
                Đăng ký
            </Link>
        </div>
    );
}
