/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ManagerFunds.module.css';
import {
    LoginRegisterCp,
    ManagerFundInterestCp,
    ManagerFundUSDCp,
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
        component: ManagerFundUSDCp,
    },
    {
        id: 2,
        title: 'Quỹ phát triển nông nghiệp',
        component: ManagerFundInterestCp,
    },
];

export default function ManagerFunds() {
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
        document.title = `Quản lý quỹ | ${process.env.REACT_APP_TITLE_WEB}`;
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
        if (currentUser) {
            setIsShow(!isShow);
        } else {
            setSnackbar({
                open: true,
                type: 'error',
                message: <LoginRegisterCp />,
            });
        }
    };
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='QUẢN LÝ'
                title2='QUỸ'
                animateName='animate__fadeInTopRight'
            />
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <div className={`${cx('body')}`}>
                <TotalAssetsAndFund isShow={isShow} toogleIsShow={toogleIsShow}>
                    <TotalItem
                        title='Tổng tài sản'
                        price={1000}
                        isShow={isShow}
                    />
                    <TotalItem title='Ví quỹ' price={1000} isShow={isShow} />
                    <TotalItem title='Ví đầu tư' price={1000} isShow={isShow} />
                    <TotalItem title='Số dư' price={1000} isShow={isShow} />
                </TotalAssetsAndFund>
                <div className={`${cx('table_manager_container')}`}>
                    <div className={`${cx('table_manager_list')}`}>
                        {LIST_TABS.map((item, index) => (
                            <div
                                className={`${cx(
                                    'table_manager_item',
                                    idTab === item?.id ? 'active' : ''
                                )}`}
                                key={index}
                                onClick={() => setIdTab(item?.id)}
                            >
                                <div
                                    className={`${cx(
                                        'table_manager_item_title'
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
