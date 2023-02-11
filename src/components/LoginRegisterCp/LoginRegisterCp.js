import React from 'react';
import className from 'classnames/bind';
import styles from './LoginRegisterCp.module.css';
import { Link } from 'react-router-dom';
import { routers } from '../../routers';

const cx = className.bind(styles);

export default function LoginRegisterCp({ padding }) {
    return (
        <div className={`${cx('container')}`} style={{ padding: padding }}>
            <span>
                Bạn cần{' '}
                <Link to={routers.login} className='fwb warning'>
                    đăng nhập
                </Link>{' '}
                hoặc{' '}
                <Link to={routers.register} className='fwb warning'>
                    đăng ký
                </Link>{' '}
                để sử dụng tính năng này.
            </span>
        </div>
    );
}
