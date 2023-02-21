/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Fund.module.css';
import {
    FundMenuAndSlider,
    SliderHeader,
    TotalAssetsAndFund,
    TotalItem,
    MenuItem as MenuItemFund,
    SnackbarCp,
    LoginRegisterCp,
    LoginRegisterCpTwo,
} from '../../components';
import { routers } from '../../routers';
import { useAppContext } from '../../utils';

const cx = className.bind(styles);
const IMAGE_SLIDERS = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8UHJvdmlkZW50JTIwRnVuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60',
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1532540859745-7b3954001b75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fFByb3ZpZGVudCUyMEZ1bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60',
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAwfHxQcm92aWRlbnQlMjBGdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
    },
];

export default function Fund() {
    const { state } = useAppContext();
    const { currentUser } = state.set;
    const [isShow, setIsShow] = React.useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
    useEffect(() => {
        document.title = `Quỹ | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const toogleIsShow = () => {
        setIsShow(!isShow);
    };
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1=''
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
                {currentUser && (
                    <TotalAssetsAndFund
                        isShow={isShow}
                        toogleIsShow={toogleIsShow}
                        cols={1}
                    >
                        <div className={`${cx('total_assets_list_custom')}`}>
                            <TotalItem
                                title='Tổng quỹ'
                                price={1000}
                                isShow={isShow}
                            />
                            <TotalItem
                                title='Quỹ đầu tư USD'
                                price={1000}
                                isShow={isShow}
                            />
                            <TotalItem
                                title='Quỹ phát triển nông nghiệp'
                                price={1000}
                                isShow={isShow}
                            />
                        </div>
                    </TotalAssetsAndFund>
                )}
                <FundMenuAndSlider
                    imageSliders={IMAGE_SLIDERS}
                    title='Menu'
                    nameIconTitle='bx bx-menu'
                >
                    <MenuItemFund
                        title='Bảng quỹ tham khảo'
                        nameIcon='bx bxs-bank'
                        to={`${routers.providentFund}/${routers.fund}/${routers.interestRateTable}`}
                    />
                    <MenuItemFund
                        title='Gửi quỹ'
                        nameIcon='bx bx-donate-heart'
                        to={`${routers.providentFund}/${routers.fund}/${routers.sendFunds}`}
                    />
                    <MenuItemFund
                        title='Quản lý quỹ'
                        nameIcon='fa-solid fa-users'
                        to={`${routers.providentFund}/${routers.fund}/${routers.managerFund}`}
                    />
                </FundMenuAndSlider>
            </div>
        </div>
    );
}
