import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import styles from './Home.module.css';
import {
    ButtonCus,
    ContentOne,
    ContentTwo,
    OwnerItem,
    SliderHome,
} from '../../components';
import { routers } from '../../routers';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

export default function Home() {
    useEffect(() => {
        document.title = `Trang chủ | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return (
        <div className={`${cx('container')}`}>
            <SliderHome
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='AIKING'
                title2='INVESMENT'
                desc='Block A, Tòa nhà RiverGate, 151-155 Bến Vân Đồn, Phường
                        6, Quận 4,TP.HCM'
                btnText='Xem trên Map'
                urlBtn='https://goo.gl/maps/AXDCkXAcn9nvQp226'
            />
            <div className={`${cx('wrapper-content')}`}>
                <ContentOne
                    textVerticle='Who we are'
                    title1='AIKING'
                    title2='MASKS'
                    desc={[
                        'Immortal Masks is the leader in Silicone Masks and Custom Creatures created by REAL Hollywood FX Artists! Our Hyper Realistic Silicone Masks are created with our amazing FLEX FUSION SYSTEM to ensure the most durable silicone masks in the industry.',
                        'From Silicone Masks, Custom Props, Full Character Creations, Creature Suits, Full Hair Punching or a completely Custom Project, Immortal is your only choice for quality & professional products!',
                    ]}
                    btnText='Về chúng tôi'
                    urlBtn={routers.introduce}
                    urlImage='https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000'
                />
                <ContentTwo
                    titleHeader='NOW LAUNCHED!'
                    textVerticle='NEW THREADS'
                    title1='AIKING'
                    title2='THREADS'
                    desc={[
                        'Our new Immortal Threads product line has launched! The highest possible quality costumes to go along with your Immortal Mask!',
                    ]}
                    urlImage='https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000'
                >
                    <Link to='/' className={`${cx('link')}`}>
                        Take a look!
                    </Link>
                </ContentTwo>
                <div
                    className={`${cx('list-owner-container')} mt50`}
                    data-aos='flip-right'
                >
                    <div className={`${cx('title-header')}`}>
                        MEET <span className='cancel'>OUR</span> OWNERS
                    </div>
                    <div className={`${cx('list-container')}`}>
                        <OwnerItem
                            urlImage='https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000'
                            urlBtn='/'
                            nameOwner='ANDREW FREEMAN'
                            positionOwner='CO-OWNER/FOUNDER'
                        />
                        <OwnerItem
                            urlImage='https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000'
                            urlBtn='/'
                            nameOwner='ANDREW FREEMAN'
                            positionOwner='CO-OWNER/FOUNDER'
                        />
                        <OwnerItem
                            urlImage='https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000'
                            urlBtn='/'
                            nameOwner='ANDREW FREEMAN'
                            positionOwner='CO-OWNER/FOUNDER'
                        />
                    </div>
                </div>
                <div
                    className={`${cx('get-around-container')} mt50`}
                    data-aos='flip-down'
                >
                    <div className={`${cx('title-header')}`}>
                        <span className='cancel'>AIKING</span> GETS AROUND
                    </div>
                    <div className={`${cx('list-get-around-container')}`}>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={10}
                            // centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            // navigation={true}
                            modules={[Autoplay]}
                            className={`${cx('mySwiper')}`}
                        >
                            <SwiperSlide>
                                <div className={`${cx('item-get-around')}`}>
                                    <div
                                        className={`${cx('image-get-around')}`}
                                        style={{
                                            backgroundImage: `url('https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000')`,
                                        }}
                                    ></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${cx('item-get-around')}`}>
                                    <div
                                        className={`${cx('image-get-around')}`}
                                        style={{
                                            backgroundImage: `url('https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000')`,
                                        }}
                                    ></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${cx('item-get-around')}`}>
                                    <div
                                        className={`${cx('image-get-around')}`}
                                        style={{
                                            backgroundImage: `url('https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000')`,
                                        }}
                                    ></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${cx('item-get-around')}`}>
                                    <div
                                        className={`${cx('image-get-around')}`}
                                        style={{
                                            backgroundImage: `url('https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000')`,
                                        }}
                                    ></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${cx('item-get-around')}`}>
                                    <div
                                        className={`${cx('image-get-around')}`}
                                        style={{
                                            backgroundImage: `url('https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000')`,
                                        }}
                                    ></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${cx('item-get-around')}`}>
                                    <div
                                        className={`${cx('image-get-around')}`}
                                        style={{
                                            backgroundImage: `url('https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000')`,
                                        }}
                                    ></div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <ContentTwo
                    titleHeader='NOW LAUNCHED!'
                    textVerticle='AIKING'
                    title1='AIKING'
                    title2='THREADS'
                    left='-30px'
                    top='30px'
                >
                    <div className={`${cx('line')}`}>
                        <span className='fwb fz14 font-Grind-Demolished'>
                            Physical:
                        </span>{' '}
                        BLOCK A, TÒA NHÀ RIVERGATE, 151-155 BẾN VÂN ĐỒN, PHƯỜNG
                        6, QUẬN 4,TP.HCM *Company open 9-5 Mon thru Friday. No
                        Drop ins, Appointment only.
                    </div>
                    <div className={`${cx('line')}`}>
                        <span className='fwb fz14 font-Grind-Demolished'>
                            Phone:
                        </span>{' '}
                        <a href='tel:0927819273'>0927819273</a>
                    </div>
                    <div className={`${cx('line')}`}>
                        <span className='fwb fz14 font-Grind-Demolished'>
                            Email:
                        </span>{' '}
                        <a href='mailto:info@aiking.com'>info@aiking.com</a>
                    </div>
                    <div className='flex-center mt30'>
                        <ButtonCus
                            urlBtn='mailto:info@aiking.com'
                            btnText='Email us'
                            className={`${cx('btn-cus')}`}
                        />
                    </div>
                </ContentTwo>
            </div>
        </div>
    );
}
