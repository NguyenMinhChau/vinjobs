import React from 'react';
import className from 'classnames/bind';
import styles from './Footer.module.css';
import { Image } from '../../components';
import logoCheckout from '../../assets/images/footer_image.png';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

export default function Footer() {
    return (
        <div className={`${cx('container')}`}>
            <div className={`${cx('top')} mb8`}>
                <div className={`${cx('top-text')}`}>
                    Copyright © {new Date().getFullYear()}{' '}
                    <Link to='/' className={`${cx('link')}`}>
                        AIKING INVESMENT
                    </Link>{' '}
                    All Rights Reserved.
                </div>
                <div className={`${cx('top-image')}`}>
                    <Image
                        src={logoCheckout}
                        alt=''
                        className={`${cx('logo')}`}
                    />
                </div>
            </div>
            <div className={`${cx('bottom')}`}>
                <div className={`${cx('bottom-text')}`}>
                    Web Development by:{' '}
                    <Link to='/' className={`${cx('link')}`}>
                        AIKING GROUP
                    </Link>
                </div>
            </div>
        </div>
    );
}
