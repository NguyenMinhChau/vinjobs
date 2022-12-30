import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Introduce.module.css';
import { SliderHeader } from '../../../components';

const cx = className.bind(styles);

export default function Introduce() {
    useEffect(() => {
        document.title = `Giới thiệu | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='GIỚI'
                title2='THIỆU'
                animateName='animate__fadeInLeft'
            />
        </div>
    );
}
