import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './ProvidentFund.module.css';
import { SliderHeader } from '../../../components';

const cx = className.bind(styles);

export default function ProvidentFund() {
    useEffect(() => {
        document.title = `Quỹ tiết kiệm | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='QUỸ'
                title2='TIẾT KIỆM'
                animateName='animate__fadeInTopRight'
            />
        </div>
    );
}
