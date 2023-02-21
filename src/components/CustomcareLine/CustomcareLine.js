import React from 'react';
import className from 'classnames/bind';
import styles from './CustomcareLine.module.css';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

export default function CustomcareLine({
    nameIcon,
    colorIcon,
    colorStatus,
    link,
    textLink,
    title,
    price,
    noneBorderBottom,
    onClick,
    eye,
    showEye,
    handleShowEye,
    bankMethod,
    bankName,
    accountName,
    accountNumber,
    marginLeft,
}) {
    return (
        <div
            className={`${cx(
                'item_desc_container',
                noneBorderBottom && 'border-bottom-none'
            )}`}
        >
            <span>
                <span>
                    <i className={nameIcon + ' ' + colorIcon}></i>
                </span>
                <span
                    className={`${cx('item_desc_title')}`}
                    onClick={eye ? handleShowEye : () => {}}
                    style={{ marginLeft: marginLeft }}
                >
                    {title}{' '}
                    {eye && (
                        <i
                            className={`fa fa-${showEye ? 'eye' : 'eye-slash'}`}
                        ></i>
                    )}
                </span>
            </span>
            {bankMethod && (
                <span className={`${cx('bank_method_container')}`}>
                    <span className={`${cx('item_desc_text')}`}>
                        {accountName}
                    </span>
                    <span className={`${cx('item_desc_text')}`}>
                        {bankName}
                    </span>
                    <span className={`${cx('item_desc_text')}`}>
                        {accountNumber}
                    </span>
                </span>
            )}
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
                <span
                    className={`${cx('item_desc_text')} ${
                        colorStatus && colorStatus
                    }`}
                >
                    {price ? (showEye ? price : '*****đ') : textLink}
                </span>
            )}
        </div>
    );
}
