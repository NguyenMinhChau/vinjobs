import React from 'react';
import className from 'classnames/bind';
import styles from './SliderHome.module.css';
import ButtonCus from '../ButtonCus/ButtonCus';

const cx = className.bind(styles);

export default function SliderHome({
    urlImage,
    title1,
    title2,
    desc,
    btnText,
    urlBtn,
}) {
    return (
        <div className={`${cx('slider-home')}`}>
            <div
                className={`${cx('slider-image')}`}
                style={{
                    backgroundImage: `url('${urlImage}')`,
                }}
            ></div>
            <div className={`${cx('slider-text-container')}`}>
                <div
                    className={`${cx(
                        'slider-title'
                    )} mb8 animate__animated animate__backInDown`}
                >
                    {title1} <span className='cancel'>{title2}</span>
                </div>
                <div
                    className={`${cx(
                        'slider-desc'
                    )} animate__animated animate__backInUp`}
                >
                    {desc}
                </div>
                <ButtonCus urlBtn={urlBtn} btnText={btnText} />
            </div>
        </div>
    );
}
