import React from 'react';
import className from 'classnames/bind';
import styles from './InterestUSDCp.module.css';
import Image from '../Image/Image';
import IMAGE from '../../assets/images/quydautuusa.png';

const cx = className.bind(styles);

export default function InterestUSDCp() {
    return (
        <div className={`${cx('conatiner')}`}>
            <Image
                src={IMAGE}
                alt='Quỹ đầu tư USD'
                className={`${cx('image')}`}
            />
        </div>
    );
}
