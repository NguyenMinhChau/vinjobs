import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Partner.module.css';
import { LoginRegisterCpTwo, SliderHeader } from '../../components';
import { useAppContext } from '../../utils';

const cx = className.bind(styles);

export default function Partner() {
    const { state } = useAppContext();
    const { currentUser } = state.set;
    useEffect(() => {
        document.title = `Đối tác | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='ĐỐI'
                title2='TÁC'
                animateName='animate__fadeInTopRight'
            />
            <div className={`${cx('body')}`}>
                {!currentUser && <LoginRegisterCpTwo />}
                <div className={`${cx('developer')}`}>
                    <span className={`${cx('text_desc')} success`}>
                        Giao diện đang phát triển, vui lòng quay lại sau. Xin
                        cảm ơn!
                    </span>
                </div>
            </div>
        </div>
    );
}
