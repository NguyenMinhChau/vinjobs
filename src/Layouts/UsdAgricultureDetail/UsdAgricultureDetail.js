/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useParams, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Icons, Image, SnackbarCp } from '../../components';
import moment from 'moment';
import {
    useAppContext,
    textUtils,
    refreshPage,
    numberUtils,
    requestRefreshToken,
} from '../../utils';
import styles from './UsdAgricultureDetail.module.css';
import { getDisbursementById, getUsdAgriById } from '../../services/admin';
import { actions } from '../../app/';

const cx = className.bind(styles);

function UsdAgricultureDetail() {
    const { idContractUsd, idContractAgri } = useParams();
    const { state, dispatch } = useAppContext();
    const location = useLocation();
    const [disbursement, setDisbursement] = useState(null);
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
    const {
        currentUser,
        edit,
        data: { dataUser },
    } = state.set;
    const handleSendDisbursement = (dataToken) => {
        getDisbursementById({
            setDisbursement,
            id_fund: idContractUsd ? idContractUsd : idContractAgri,
            setSnackbar,
            token: dataToken?.token,
        });
    };
    useEffect(() => {
        document.title = `Chi tiết | ${process.env.REACT_APP_TITLE_WEB}`;
        getUsdAgriById({
            idContractUsd,
            idContractAgri,
            dispatch,
            state,
        });
        requestRefreshToken(
            currentUser,
            handleSendDisbursement,
            state,
            dispatch,
            actions
        );
    }, []);
    function ItemRender({
        title,
        info,
        bankInfo,
        methodBank,
        nameAccount,
        numberAccount,
    }) {
        return (
            <div className='detail-item'>
                <div className='detail-title'>{title}</div>
                <div className={`${cx('detail-status')}`}>
                    {bankInfo ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}
                        >
                            <span className='info'>
                                {methodBank ? (
                                    methodBank
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </span>
                            <span className='info'>
                                {nameAccount ? (
                                    nameAccount
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </span>
                            <span className='info'>
                                {numberAccount ? (
                                    numberAccount
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </span>
                        </div>
                    ) : (
                        <span className='info'>
                            {info || info === 0 ? (
                                info
                            ) : (
                                <Skeleton width={30} />
                            )}
                        </span>
                    )}
                </div>
            </div>
        );
    }
    const x = edit?.itemData && edit?.itemData;
    const username = dataUser?.data?.find((t) => t?._id === x.userId)?.payment
        .username;
    const email = dataUser?.data?.find((t) => t?._id === x.userId)?.payment
        .email;
    const infoUser = {
        name: username,
        email: email,
    };
    return (
        <>
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <Button
                className='confirmbgc mb8'
                onClick={refreshPage.refreshPage}
            >
                <div className='flex-center'>
                    <Icons.RefreshIcon className='fz12 mr8' />
                    <span className={`${cx('general-button-text')}`}>
                        Tải lại trang
                    </span>
                </div>
            </Button>
            <div className={`${cx('info-container')}`}>
                <div className={`${cx('detail-container')}`}>
                    <div className='detail-item'>
                        <div className='detail-title'>Trạng thái</div>
                        <div className={`${cx('detail-status')}`}>
                            {x ? (
                                <>
                                    <span
                                        className={`status fwb ${
                                            x.status
                                                .toLowerCase()
                                                .replace(' ', '') + 'bgc'
                                        }`}
                                    >
                                        {textUtils.FirstUpc(x.status)}
                                    </span>
                                </>
                            ) : (
                                <Skeleton width={50} />
                            )}
                        </div>
                    </div>
                    <ItemRender title='Loại HD' info={x && x.type} />
                    <ItemRender
                        title='Kỳ hạn'
                        info={
                            x &&
                            x.cycle + `${idContractUsd ? ' tháng' : ' mùa'}`
                        }
                    />
                    <ItemRender title='Giá' info={x && x.rate} />
                    <ItemRender
                        title='Họ và tên'
                        info={infoUser?.name && infoUser?.name}
                    />
                    <ItemRender
                        title='Email'
                        info={infoUser?.email && infoUser?.email}
                    />
                    <ItemRender
                        title='Ngày tạo'
                        info={
                            x &&
                            moment(x.createdAt).format('DD/MM/YYYY HH:mm:ss')
                        }
                    />
                    <ItemRender
                        title='Thời gian gửi'
                        info={
                            x &&
                            moment(x.date_start).format('DD/MM/YYYY HH:mm:ss')
                        }
                    />
                    <ItemRender
                        title='Số tiền gửi'
                        info={x && numberUtils.formatVND(x.principal)}
                    />
                    <ItemRender
                        title='Tiền giải ngân'
                        info={
                            disbursement &&
                            numberUtils.formatVND(disbursement?.disbursement)
                        }
                    />
                    <ItemRender
                        title='Hóa đơn'
                        info={
                            x && (
                                <a
                                    href={`${process.env.REACT_APP_URL_SERVER}${x.statement}`}
                                    target='_blank'
                                >
                                    {x.statement ? (
                                        x.statement.replace('/images/', '')
                                    ) : (
                                        <Skeleton width='30px' />
                                    )}
                                </a>
                            )
                        }
                    />
                </div>
                <div className={`${cx('detail-container')}`}>
                    <div className={`${cx('document-review-container')}`}>
                        <div className={`${cx('document-review-title')}`}>
                            Xem hóa đơn
                        </div>
                        {x?.statement ? (
                            <div className={`${cx('document-container')}`}>
                                <Image
                                    src={`${process.env.REACT_APP_URL_SERVER}/${x?.statement}`}
                                    alt={x.statement.replace('/images/', '')}
                                    className={`${cx('document-review-image')}`}
                                />
                            </div>
                        ) : (
                            <Skeleton width='100%' height='200px' />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsdAgricultureDetail;
