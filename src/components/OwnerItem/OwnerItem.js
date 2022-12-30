import React from 'react';
import className from 'classnames/bind';
import styles from './OwnerItem.module.css';
import ButtonCus from '../ButtonCus/ButtonCus';

const cx = className.bind(styles);

export default function OwnerItem({
    urlImage,
    nameOwner,
    positionOwner,
    children,
    urlBtn,
}) {
    return (
        <div className={`${cx('list-item')}`}>
            <div className={`${cx('image-owner')}`}>
                <div
                    className={`${cx('image-view')}`}
                    style={{
                        backgroundImage: `url('${urlImage}')`,
                    }}
                ></div>
            </div>
            <ButtonCus
                urlBtn={urlBtn}
                className={`${cx('btn-cus')}`}
                classNameWrapper='flex-center'
            >
                <div className={`${cx('name-owner')}`}>{nameOwner}</div>
                <div className={`${cx('position-owner')}`}>{positionOwner}</div>
                {children}
            </ButtonCus>
        </div>
    );
}
