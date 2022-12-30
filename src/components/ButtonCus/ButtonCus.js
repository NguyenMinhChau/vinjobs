import React from 'react';
import className from 'classnames/bind';
import styles from './ButtonCus.module.css';

const cx = className.bind(styles);

export default function ButtonCus({
    urlBtn,
    btnText,
    children,
    className,
    classNameWrapper,
}) {
    const classed = cx('btn', className);
    const classedWrapper = cx('btn-container', classNameWrapper);
    return (
        <div className={classedWrapper}>
            <a
                href={urlBtn}
                className={classed}
                target='_blank'
                rel='noreferrer'
            >
                {btnText || children}
            </a>
        </div>
    );
}
