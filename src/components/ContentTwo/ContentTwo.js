import React from 'react';
import className from 'classnames/bind';
import styles from './ContentTwo.module.css';
import FormInput from '../FormInput/FormInput';
import ButtonCus from '../ButtonCus/ButtonCus';

const cx = className.bind(styles);

export default function ContentTwo({
    titleHeader,
    textVerticle,
    title1,
    title2,
    desc = [],
    urlImage,
    children,
    left,
    top,
}) {
    return (
        <div
            className={`${cx('content-container')} mt50`}
            data-aos='fade-right'
        >
            <div className={`${cx('content-left-container')}`}>
                <div className={`${cx('title-header')} mb12`}>
                    {titleHeader}
                </div>
                <div className={`${cx('content-left')}`}>
                    <div
                        className={`${cx('left')} cancel`}
                        style={{ left: left, top: top }}
                    >
                        {textVerticle}
                    </div>
                    <div className={`${cx('middle')}`}>
                        <div className={`${cx('middle_title')} mb12`}>
                            {title1}
                            <span className='cancel'>{title2}</span>
                        </div>
                        <div className={`${cx('middle_desc')}`}>
                            {desc.map((item, index) => (
                                <p
                                    className={`${cx('middle_desc_text')}`}
                                    key={index}
                                >
                                    {item}
                                </p>
                            ))}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {urlImage ? (
                <div className={`${cx('content-right')}`}>
                    <div
                        className={`${cx('right_img')}`}
                        style={{
                            backgroundImage: `url('${urlImage}')`,
                        }}
                    ></div>
                </div>
            ) : (
                <div className={`${cx('form')}`}>
                    <div className={`${cx('top')}`}>
                        <FormInput
                            placeholder='Your name'
                            type='text'
                            name='username'
                            classNameField={`${cx('input-cus')}`}
                        />
                        <FormInput
                            placeholder='Your phone'
                            type='text'
                            name='phone'
                            classNameField={`${cx('input-cus')}`}
                        />
                    </div>
                    <div className={`${cx('bottom')}`}>
                        <textarea
                            rows='6'
                            className={`${cx('textarea')}`}
                            placeholder='Say something...'
                        ></textarea>
                    </div>
                    <ButtonCus
                        btnText='Sumbit'
                        className={`${cx('btn-cus')} mt12`}
                    />
                </div>
            )}
        </div>
    );
}
