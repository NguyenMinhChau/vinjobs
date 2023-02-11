import React from 'react';
import className from 'classnames/bind';
import styles from './FundMenuAndSlider.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';

const cx = className.bind(styles);

export default function FundMenuAndSlider({
    imageSliders,
    imageSlidersProduct,
    title,
    nameIconTitle,
    children,
    paddingBottom = '50%',
}) {
    const LIST_IMAGE_SLIDER = imageSliders ? imageSliders : imageSlidersProduct;
    return (
        <div className={`${cx('body_item')}`}>
            <div className={`${cx('item_one')}`}>
                <div className={`${cx('item_text')}`}>
                    <i className={nameIconTitle}></i>
                    <span>{title}</span>
                </div>
                <div className={`${cx('menu_conatiner')}`}>{children}</div>
            </div>
            <div className={`${cx('item_two')}`}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className={`${cx('mySwiper')}`}
                >
                    {LIST_IMAGE_SLIDER.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                {imageSliders ? (
                                    <div
                                        className={`${cx('item-swiper')}`}
                                        style={{ paddingBottom: paddingBottom }}
                                    >
                                        <div
                                            className={`${cx('image-swiper')}`}
                                            style={{
                                                backgroundImage: `url(${item?.url})`,
                                            }}
                                        ></div>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className={`${cx('item-swiper')}`}
                                            style={{
                                                paddingBottom: paddingBottom,
                                            }}
                                            key={index}
                                        >
                                            <div
                                                className={`${cx(
                                                    'product_list_item'
                                                )}`}
                                                style={{
                                                    backgroundImage: `url(${item.urlImage})`,
                                                }}
                                            >
                                                <div
                                                    className={`${cx(
                                                        'product_desc_container'
                                                    )}`}
                                                >
                                                    <div
                                                        className={`${cx(
                                                            'product_desc_header'
                                                        )}`}
                                                    >
                                                        <div
                                                            className={`${cx(
                                                                'product_desc_header_title'
                                                            )}`}
                                                        >
                                                            {item?.title}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${cx(
                                                            'product_desc_body'
                                                        )}`}
                                                    >
                                                        <div
                                                            className={`${cx(
                                                                'product_desc_body_number'
                                                            )}`}
                                                        >
                                                            {item?.time} tháng
                                                        </div>
                                                        <div
                                                            className={`${cx(
                                                                'product_desc_body_desc'
                                                            )}`}
                                                        >
                                                            Hạn mức{' '}
                                                            {item?.limit}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${cx(
                                                            'product_desc_footer'
                                                        )}`}
                                                    >
                                                        <div
                                                            className={`${cx(
                                                                'product_desc_footer_number'
                                                            )}`}
                                                        >
                                                            <span>
                                                                {item?.profit}
                                                            </span>
                                                            %/năm
                                                        </div>
                                                        <div
                                                            className={`${cx(
                                                                'product_desc_footer_desc'
                                                            )}`}
                                                        >
                                                            Lợi nhuận mục tiêu
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}
