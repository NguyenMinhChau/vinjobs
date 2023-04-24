/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Transactions.module.css';
import { LoginRegisterCp, LoginRegisterCpTwo, SliderHeader, SnackbarCp } from '../../components';
import { useAppContext } from '../../utils';
import DepositsHistory from '../DepositsHistory/DepositsHistory';
import WithdrawsHistory from '../WithdrawsHistory/WithdrawsHistory';

const cx = className.bind(styles);

const LIST_TABS = [
    {
        id: 1,
        title: 'Nạp tiền',
        component: DepositsHistory,
    },
    {
        id: 2,
        title: 'Rút tiền',
        component: WithdrawsHistory,
    },
];

export default function Transactions() {
    const { state } = useAppContext();
    const { currentUser } = state.set;
    const [idTab, setIdTab] = useState(1);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    useEffect(() => {
        document.title = `Giao dịch | ${process.env.REACT_APP_TITLE_WEB}`;
        if (!currentUser) {
            setSnackbar({
                open: true,
                type: 'error',
                message: <LoginRegisterCp />,
            });
        }
    }, [currentUser]);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='GIAO'
                title2='DỊCH'
                animateName='animate__fadeInTopRight'
            />
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <div className={`${cx('body')}`}>
                {/* <div className={`${cx('developer')}`}>
                    <span className={`${cx('text_desc')} success`}>
                        Giao diện đang phát triển, vui lòng quay lại sau. Xin cảm ơn!
                    </span>
                </div> */}
                <div className={`${cx('history_container')}`}>
                    <div className={`${cx('history_list')}`}>
                        {LIST_TABS.map((item, index) => (
                            <div
                                className={`${cx(
                                    'history_item',
                                    idTab === item?.id ? 'active' : ''
                                )}`}
                                key={index}
                                onClick={() => setIdTab(item?.id)}>
                                <div className={`${cx('history_item_title')}`}>{item.title}</div>
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
