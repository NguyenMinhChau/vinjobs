/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ProvidentFundHome.module.css';
import {
    FundMenuAndSlider,
    LoginRegisterCp,
    MenuItem as MenuItemFund,
    SliderHeader,
    SnackbarCp,
    TotalAssetsAndFund,
    TotalItem,
} from '../../../components';
import { routers } from '../../../routers';
import { useAppContext } from '../../../utils';

const cx = className.bind(styles);
// const IMAGE_SLIDERS = [
//     {
//         id: 1,
//         url: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8UHJvdmlkZW50JTIwRnVuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60',
//     },
//     {
//         id: 2,
//         url: 'https://images.unsplash.com/photo-1532540859745-7b3954001b75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fFByb3ZpZGVudCUyMEZ1bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60',
//     },
//     {
//         id: 3,
//         url: 'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAwfHxQcm92aWRlbnQlMjBGdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
//     },
// ];
const PRODUCT_LISTS = [
    {
        id: 1,
        urlImage:
            'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8UHJvdmlkZW50JTIwRnVuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60',
        title: 'Lợi nhuận tốt nhất',
        time: 18,
        limit: '10 tỷ đồng',
        profit: 8.5,
    },
    {
        id: 2,
        urlImage:
            'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8UHJvdmlkZW50JTIwRnVuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60',
        title: 'Khuyên dùng',
        time: 12,
        limit: '8 tỷ đồng',
        profit: 7.5,
    },
    {
        id: 3,
        urlImage:
            'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8UHJvdmlkZW50JTIwRnVuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60',
        title: 'Lợi nhuận tốt nhất',
        time: 6,
        limit: '6 tỷ đồng',
        profit: 6.5,
    },
];

export default function ProvidentFundHome() {
    const { state } = useAppContext();
    const { currentUser } = state.set;
    const [isShow, setIShow] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    useEffect(() => {
        document.title = `Quỹ tiết kiệm | ${process.env.REACT_APP_TITLE_WEB}`;
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
            setIShow(!isShow);
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
                title1='QUỸ'
                title2='TIẾT KIỆM'
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
                <FundMenuAndSlider
                    imageSlidersProduct={PRODUCT_LISTS}
                    title='Menu'
                    nameIconTitle='bx bx-menu'
                >
                    <MenuItemFund
                        title='Quỹ'
                        nameIcon='bx bxs-bank'
                        to={`${routers.providentFund}/${routers.fund}`}
                    />
                    <MenuItemFund
                        title='Đầu tư'
                        nameIcon='bx bx-donate-heart'
                        to={`${routers.providentFund}/${routers.investment}`}
                    />
                    <MenuItemFund
                        title='Đối tác'
                        nameIcon='fa-solid fa-users'
                        to={`${routers.providentFund}/${routers.partner}`}
                    />
                    <MenuItemFund
                        title='CSKH'
                        nameIcon='bx bx-phone'
                        to={`${routers.providentFund}/${routers.customcare}`}
                    />
                </FundMenuAndSlider>
                {/* <FundProductList product_list={PRODUCT_LISTS} /> */}
            </div>
        </div>
    );
}
