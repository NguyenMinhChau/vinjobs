/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './InterestRateTable.module.css';
import {
    InterestAgricultural,
    InterestUSDCp,
    SliderHeader,
    SnackbarCp,
    TotalAssetsAndFund,
    TotalItem,
} from '../../components';
import { useAppContext } from '../../utils';

const cx = className.bind(styles);

const LIST_TABS = [
    {
        id: 1,
        title: 'Quỹ đầu tư USD',
        component: InterestUSDCp,
    },
    {
        id: 2,
        title: 'Quỹ phát triển nông nghiệp',
        component: InterestAgricultural,
    },
];

export default function InterestRateTable() {
    const { state } = useAppContext();
    const { currentUser } = state.set;
    const [isShow, setIsShow] = useState(false);
    const [idTab, setIdTab] = useState(1);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    useEffect(() => {
        document.title = `Bảng lãi suất | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
    const toogleIsShow = () => {
        setIsShow(!isShow);
    };
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='BẢNG'
                title2='LÃI SUẤT'
                animateName='animate__fadeInTopRight'
            />
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <div className={`${cx('body')}`}>
                {currentUser && (
                    <TotalAssetsAndFund
                        isShow={isShow}
                        toogleIsShow={toogleIsShow}
                    >
                        <TotalItem
                            title='Tổng tài sản'
                            price={1000}
                            isShow={isShow}
                        />
                        <TotalItem
                            title='Ví quỹ'
                            price={1000}
                            isShow={isShow}
                        />
                        <TotalItem
                            title='Ví đầu tư'
                            price={1000}
                            isShow={isShow}
                        />
                        <TotalItem title='Số dư' price={1000} isShow={isShow} />
                    </TotalAssetsAndFund>
                )}
                <div className={`${cx('table_interest_container')}`}>
                    <div className={`${cx('table_interest_list')}`}>
                        {LIST_TABS.map((item, index) => (
                            <div
                                className={`${cx(
                                    'table_interest_item',
                                    idTab === item?.id ? 'active' : ''
                                )}`}
                                key={index}
                                onClick={() => setIdTab(item?.id)}
                            >
                                <div
                                    className={`${cx(
                                        'table_interest_item_title'
                                    )}`}
                                >
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={`${cx('body_components')}`}>
                        {LIST_TABS.map((item, index) => {
                            if (item?.id === idTab) {
                                const Component = item?.component;
                                return <Component key={index} />;
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
