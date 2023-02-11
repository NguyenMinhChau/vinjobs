import React from 'react';
import className from 'classnames/bind';
import styles from './TotalAssetsAndFund.module.css';

const cx = className.bind(styles);

export default function TotalAssetsAndFund({
    toogleIsShow,
    isShow,
    children,
    cols,
}) {
    return (
        <div className={`${cx('total_assets_container')}`}>
            <div className={`${cx('icon_eye')}`} onClick={toogleIsShow}>
                <i
                    className={`fa ${
                        isShow ? 'fa-eye' : 'fa-eye-slash'
                    } success`}
                ></i>
            </div>
            <div
                className={`${cx('total_assets_list')}`}
                style={{ '--cols': cols }}
            >
                {children}
            </div>
        </div>
    );
}
