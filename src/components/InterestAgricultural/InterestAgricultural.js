import React from 'react';
import className from 'classnames/bind';
import styles from './InterestAgricultural.module.css';
import Image from '../Image/Image';
import IMAGE from '../../assets/images/quyphattriennongnghiep.png';

const cx = className.bind(styles);

export default function InterestAgricultural() {
    return (
        <div className={`${cx('conatiner')}`}>
            <Image
                src={IMAGE}
                alt='Quỹ phát triển nông nghiệp'
                className={`${cx('image')}`}
            />
        </div>
    );
}
