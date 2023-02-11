import React from 'react';
import className from 'classnames/bind';
import styles from './ManagerFundInterestCp.module.css';

const cx = className.bind(styles);

export default function ManagerFundInterestCp() {
    return (
        <div className={`${cx('container')}`}>
            <div className={`${cx('developer')}`}>
                <span className={`${cx('text_desc')} success`}>
                    Giao diện quỹ phát triển nông nghiệp đang phát triển, vui
                    lòng quay lại sau. Xin cảm ơn!
                </span>
            </div>
        </div>
    );
}
