import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Customcare.module.css';
import {
    CustomcareLine,
    FundMenuAndSlider,
    SliderHeader,
} from '../../components';

const cx = className.bind(styles);

const IMAGE_SLIDERS = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3VzdG9tZXIlMjBzZXJ2aWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
    },
];

export default function Customcare() {
    useEffect(() => {
        document.title = `CSKH | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='CHĂM SÓC'
                title2='KHÁCH HÀNG'
                animateName='animate__fadeInTopRight'
            />
            <div className={`${cx('body')}`}>
                <FundMenuAndSlider
                    imageSliders={IMAGE_SLIDERS}
                    title='Quý khách có bất kỳ thắc mắc nào vui lòng liên hệ:'
                    nameIconTitle='bx bx-headphone'
                    paddingBottom={'55%'}
                >
                    <div className={`${cx('desc_body')}`}>
                        <CustomcareLine
                            nameIcon='bx bx-phone'
                            colorIcon='success'
                            title='Hotline:'
                            textLink='0345 335 422'
                            link='tel:0345335422'
                        />
                        <CustomcareLine
                            nameIcon='bx bx-message-rounded'
                            colorIcon='cancel'
                            title='Zalo:'
                            textLink='0345 335 422 (Thắm Đặng)'
                        />
                        <CustomcareLine
                            nameIcon='bx bxl-facebook'
                            colorIcon='info'
                            title='Facebook:'
                            textLink='Mỹ Thắm'
                            link='https://www.facebook.com/thamdanginvestments/'
                        />
                        <CustomcareLine
                            nameIcon='bx bxl-telegram'
                            colorIcon='warning'
                            title='Telegram:'
                            textLink='0345 335 422 (@luckymoon102)'
                        />
                        <div className={`${cx('text_thank')} cancel`}>
                            AIKING INVESTMENT chân thành cảm ơn quý nhà Đầu tư.
                        </div>
                    </div>
                </FundMenuAndSlider>
            </div>
        </div>
    );
}
