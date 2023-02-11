import React from 'react';
import className from 'classnames/bind';
import styles from './ManagerFundUSDCp.module.css';

const cx = className.bind(styles);

export default function ManagerFundUSDCp() {
    return (
        <div className={`${cx('container')}`}>
            <div className={`${cx('developer')}`}>
                <span className={`${cx('text_desc')} success`}>
                    Giao diện quỹ đầu tư USD đang phát triển, vui lòng quay lại
                    sau. Xin cảm ơn!
                </span>
            </div>
        </div>
    );
}
