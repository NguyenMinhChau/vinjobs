import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SiderFund.module.css';
import useAppContext from '../../utils/hooks/useAppContext';
import { setData } from '../../app/reducer';
import { routers } from '../../routers';

const cx = classNames.bind(styles);

function SiderFund({ item }) {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();
    const handleSetItem = (item) => {
        dispatch(
            setData({
                item: item,
            })
        );
        navigate(`${routers.providentFund}/${routers.fund}/${routers.sendFunds}`);
    };
    return (
        <div
            className={`${cx('product_list_item')}`}
            style={{
                backgroundImage: `url(${item.urlImage})`,
            }}>
            <div className={`${cx('product_desc_container')}`}>
                <div className={`${cx('product_desc_header')}`} onClick={() => handleSetItem(item)}>
                    <div className={`${cx('product_desc_header_title')}`}>{item?.desc}</div>
                </div>
                <div className={`${cx('product_desc_body')}`}>
                    <div className={`${cx('product_desc_body_number')}`}>
                        {item?.period}{' '}
                        {item.type === process.env.REACT_APP_TYPE_USD ? 'tháng' : 'mùa'}
                    </div>
                    <div className={`${cx('product_desc_body_desc')}`}>
                        {item.type === process.env.REACT_APP_TYPE_USD ? 'Vốn' : 'Hạn mức'}{' '}
                        {item?.capital?.toString().replace('M', '')} triệu đồng
                    </div>
                </div>
                <div className={`${cx('product_desc_footer')}`}>
                    <div className={`${cx('product_desc_footer_number')}`}>
                        <span>
                            {item.type === process.env.REACT_APP_TYPE_AGRICUTURAL
                                ? 'Giải ngân '
                                : 'Lãi suất '}
                        </span>
                        <span>{item?.interestRate}</span>
                        {item.type === process.env.REACT_APP_TYPE_AGRICUTURAL
                            ? ' triệu'
                            : '%/kỳ hạn'}
                    </div>
                    <div className={`${cx('product_desc_footer_desc')}`}>Lợi nhuận mục tiêu</div>
                </div>
            </div>
        </div>
    );
}

export default SiderFund;
