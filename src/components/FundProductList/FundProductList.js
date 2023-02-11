import React from 'react';
import className from 'classnames/bind';
import styles from './FundProductList.module.css';

const cx = className.bind(styles);

export default function FundProductList({ product_list }) {
    return (
        <div className={`${cx('product_list_container')}`}>
            <div className={`${cx('product_list')}`}>
                {product_list.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`${cx('product_list_item')}`}
                            style={{
                                backgroundImage: `url(${item.urlImage})`,
                            }}
                        >
                            <div className={`${cx('product_desc_container')}`}>
                                <div className={`${cx('product_desc_header')}`}>
                                    <div
                                        className={`${cx(
                                            'product_desc_header_title'
                                        )}`}
                                    >
                                        {item?.title}
                                    </div>
                                </div>
                                <div className={`${cx('product_desc_body')}`}>
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
                                        Hạn mức {item?.limit}
                                    </div>
                                </div>
                                <div className={`${cx('product_desc_footer')}`}>
                                    <div
                                        className={`${cx(
                                            'product_desc_footer_number'
                                        )}`}
                                    >
                                        <span>{item?.profit}</span>%/năm
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
                    );
                })}
            </div>
        </div>
    );
}
