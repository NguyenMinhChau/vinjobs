import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './FinancialReport.module.css';
import { SliderHeader } from '../../../components';

const cx = className.bind(styles);

export default function FinancialReport() {
    useEffect(() => {
        document.title = `Báo cáo tài chính | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='BÁO CÁO'
                title2='TÀI CHÍNH'
                animateName='animate__backInRight'
            />
        </div>
    );
}
