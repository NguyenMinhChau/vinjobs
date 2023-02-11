import React from 'react';
import className from 'classnames/bind';
import styles from './TotalAssetsAndFund.module.css';
import { formatVND } from '../../utils/format/FormatMoney';

const cx = className.bind(styles);

export default function TotalItem({ title, isShow, price }) {
    return (
        <div className={`${cx('total_assets_item')}`}>
            <div className={`${cx('total_assets_item_title')}`}>{title}</div>
            <div className={`${cx('total_assets_item_money')}`}>
                {isShow ? formatVND(price) : '*****đ'}
            </div>
        </div>
    );
}
