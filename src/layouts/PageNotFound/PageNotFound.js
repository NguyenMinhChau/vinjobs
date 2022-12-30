import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './PageNotFound.module.css';
import { Image } from '../../components';
import logoCompany from '../../assets/images/logo-company.png';
import { Link } from 'react-router-dom';
import { routers } from '../../routers';

const cx = className.bind(styles);

export default function PageNotFound() {
    useEffect(() => {
        document.title = `404 | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return (
        <div className={`${cx('container')}`}>
            <Image src={logoCompany} alt='' className={`${cx('image')}`} />
            <div className={`${cx('desc')}`}>
                Trang không tồn tại. Quay về{' '}
                <Link className={`${cx('link')}`} to={routers.home}>
                    trang chủ
                </Link>
            </div>
        </div>
    );
}
