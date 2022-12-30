import React from 'react';
import className from 'classnames/bind';
import { Footer, Header } from '../';
import styles from './DefaultLayouts.module.css';

const cx = className.bind(styles);

export default function DefaultLayouts({ children }) {
    return (
        <div className={`${cx('container')}`}>
            <Header />
            <div className={`${cx('content')}`}>{children}</div>
            <Footer />
        </div>
    );
}
