import React from 'react';
import className from 'classnames/bind';
import styles from './CustomcareLine.module.css';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

export default function CustomcareLine({
    nameIcon,
    colorIcon,
    link,
    textLink,
    title,
    price,
    noneBorderBottom,
    onClick,
    eye,
    showEye,
    handleShowEye,
}) {
    return (
        <div
            className={`${cx(
                'item_desc_container',
                noneBorderBottom && 'border-bottom-none'
            )}`}
        >
            <span>
                <i className={nameIcon + ' ' + colorIcon}></i>
            </span>
            <span
                className={`${cx('item_desc_title')}`}
                onClick={eye ? handleShowEye : () => {}}
            >
                {title}{' '}
                {eye && (
                    <i className={`fa fa-${showEye ? 'eye' : 'eye-slash'}`}></i>
                )}
            </span>
            {link ? (
                !onClick ? (
                    <a
                        href={link}
                        target={'_blank'}
                        rel='noreferrer'
                        className={`${cx('item_desc_text')}`}
                    >
                        {textLink}
                    </a>
                ) : (
                    <Link
                        onClick={onClick}
                        className={`${cx('item_desc_text')}`}
                    >
                        {textLink}
                    </Link>
                )
            ) : (
                <span className={`${cx('item_desc_text')}`}>
                    {price ? (showEye ? price : '*****đ') : textLink}
                </span>
            )}
        </div>
    );
}
