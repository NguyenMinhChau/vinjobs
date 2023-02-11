import React from 'react';
import className from 'classnames/bind';
import styles from './CreditCard.module.css';
import Image from '../Image/Image';
import LOGO_BANK from '../../assets/images/logo-company.png';
import CHIP from '../../assets/images/chip.png';
import NAPAS from '../../assets/images/napas.png';

const cx = className.bind(styles);

export default function CreditCard({ bankName, cardNumber, accountName }) {
    return (
        <div className={[styles.Credit_card_container]}>
            <div className={[styles.Credit_card_header]}>
                <div className={[styles.trademark_container]}>
                    <Image
                        className={`${cx('trademark_logo')}`}
                        src={LOGO_BANK}
                    />
                    <div className={`${cx('trademark_name_bank')}`}>
                        {bankName}
                    </div>
                </div>
                <i className='fa-solid fa-money-check'></i>
            </div>
            <div className={`${cx('Credit_card_middle')}`}>
                <div style={{ marginTop: '15px' }}>
                    <i className='fa-solid fa-caret-left'></i>
                </div>
                <div className={`${cx('card_info_footer')}`}>
                    <Image
                        className={`${cx('card_info_footer_logo')}`}
                        src={CHIP}
                    />
                    <div className={`${cx('number_card')}`}>{cardNumber}</div>
                </div>
            </div>
            <div className={`${cx('Credit_card_footer')}`}>
                <div className={`${cx('accountName_card_container')}`}>
                    <div className={`${cx('ext_card_container')}`}>
                        <span className={`${cx('ext_card_title')}`}>Ext:</span>
                        <span className={`${cx('ext_card_text')}`}>MM/YY</span>
                    </div>
                    <div className={`${cx('accountName_card_text')}`}>
                        {accountName}
                    </div>
                </div>
                <Image
                    className={`${cx('Credit_card_footer_logo')}`}
                    src={NAPAS}
                />
            </div>
        </div>
    );
}
