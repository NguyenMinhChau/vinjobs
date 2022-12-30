import React from 'react';
import className from 'classnames/bind';
import styles from './LinkHref.module.css';

const cx = className.bind(styles);

export default function LinkHref({ children, url, className }) {
    const classed = cx('linkHref', className);
    return (
        <a className={classed} href={url} target='_blank' rel='noreferrer'>
            {children}
        </a>
    );
}
