/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './WithdrawsHistory.module.css';
import { useAppContext } from '../../utils';
import requestRefreshToken from '../../utils/axios/refreshToken';
import { setData } from '../../app/reducer';
import {
    CustomcareLine,
    FormInput,
    LoginRegisterCp,
    Modal,
    SnackbarCp,
} from '../../components';
import { indexTable } from '../../utils/tableIndex';
import { formatVND } from '../../utils/format/FormatMoney';
import moment from 'moment';
import { Skeleton } from '@mui/material';
import {
    userCancelWithdrawSV,
    userGetWithdrawByUserSV,
    userResendOtpWithdrawSV,
    userVerifyWithdrawSV,
} from '../../services/user';
import General from '../General/General';
import DataWithdrawsHistory from '../../utils/fakeData/withdrawsHistoryHeader';
import { adminGetUserByIdSV } from '../../services/admin';
import { dateFormat } from '../../utils/format/DateVN';
import dataFilterHistory from '../../utils/dataTableCusFilter/dataFilterHistory';

const cx = className.bind(styles);

export default function WithdrawsHistory() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        userById,
        otpCode,
        dataWithdrawsHistory,
        pagination: { page, show },
        searchValues: { withdraws_history },
    } = state.set;
    let showPage = 10;
    const start = (page - 1) * showPage + 1;
    const end = start + showPage - 1;
    const [isProcessModalWithdraw, setIsProcessModalWithdraw] = useState(false);
    const [isProcessResendOTP, setIsProcessResendOTP] = useState(false);
    const [modalVerifyWithdraw, setModalVerifyWithdraw] = useState(false);
    const [isProcessCancelWithdraw, setIsProcessCancelWithdraw] =
        useState(false);
    const [itemWithdraw, setItemWithdraw] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    let dataWithdrawsHistoryFlag =
        dataWithdrawsHistory.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ) || [];
    if (withdraws_history) {
        dataWithdrawsHistoryFlag = dataWithdrawsHistoryFlag.filter((item) => {
            return (
                item?.status
                    ?.toString()
                    ?.toLowerCase()
                    .includes(withdraws_history?.toLowerCase()) ||
                moment(item?.createdAt)
                    .format('DD/MM/YYYY HH:mm:ss')
                    ?.toString()
                    ?.toLowerCase()
                    .includes(withdraws_history?.toLowerCase()) ||
                formatVND(item?.amount)
                    ?.toString()
                    ?.toLowerCase()
                    .includes(withdraws_history?.toLowerCase()) ||
                item?.note
                    ?.toString()
                    ?.toLowerCase()
                    .includes(withdraws_history?.toLowerCase()) ||
                formatVND(item?.amount)
                    .replace(/\./g, '')
                    ?.toString()
                    ?.toLowerCase()
                    .includes(withdraws_history?.toLowerCase())
            );
        });
    }
    const handleSendWithdrawsHistory = (dataToken) => {
        userGetWithdrawByUserSV({
            id_user: currentUser?.id,
            dispatch,
            setSnackbar,
            token: dataToken?.token,
        });
    };
    const handleModalWithdrawTrue = (e, item) => {
        e.stopPropagation();
        setModalVerifyWithdraw(true);
        setItemWithdraw(item);
    };
    const handleModalWithdrawFalse = (e) => {
        e.stopPropagation();
        setModalVerifyWithdraw(false);
    };
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
        if (currentUser) {
            requestRefreshToken(
                currentUser,
                handleSendWithdrawsHistory,
                state,
                dispatch,
                setData,
                setSnackbar
            );
            adminGetUserByIdSV({
                id_user: currentUser?.id,
                dispatch,
                setSnackbar,
            });
        }
    }, []);
    const handleSendOTP = (dataToken) => {
        userVerifyWithdrawSV({
            id_user: currentUser?.id,
            dispatch,
            code: otpCode,
            token: dataToken?.token,
            setSnackbar,
            setIsProcessModalWithdraw,
            setModalVerifyWithdraw,
        });
    };
    const handleAuthenWithdraw = async (e) => {
        await 1;
        if (!otpCode) {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Bạn chưa nhập mã xác thực',
            });
        } else {
            setIsProcessModalWithdraw(true);
            requestRefreshToken(
                currentUser,
                handleSendOTP,
                state,
                dispatch,
                setData,
                setSnackbar
            );
            dispatch(
                setData({
                    amountWithdraw: '',
                    otpCode: '',
                })
            );
        }
    };
    const handleCancelWithdrawSV = (dataToken, id) => {
        userCancelWithdrawSV({
            id_user: currentUser?.id,
            dispatch,
            id_withdraw: id,
            token: dataToken?.token,
            setSnackbar,
            setIsProcessCancelWithdraw,
            setModalVerifyWithdraw,
        });
    };
    const handleCancelWithdraw = async (id) => {
        await 1;
        setIsProcessCancelWithdraw(true);
        requestRefreshToken(
            currentUser,
            handleCancelWithdrawSV,
            state,
            dispatch,
            setData,
            setSnackbar,
            id
        );
    };
    const resendOtpSV = (dataToken, id) => {
        userResendOtpWithdrawSV({
            id_user: currentUser.id,
            id_withdraw: id,
            dispatch,
            token: dataToken?.token,
            setSnackbar,
            setIsProcessResendOTP,
        });
    };
    const handleResendOTP = async (id) => {
        await 1;
        setIsProcessResendOTP(true);
        requestRefreshToken(
            currentUser,
            resendOtpSV,
            state,
            dispatch,
            setData,
            setSnackbar,
            id
        );
    };
    const bank =
        userById?.payment?.bank?.name +
        ' - ' +
        userById?.payment?.bank?.bankName +
        ' - ' +
        userById?.payment?.bank?.account;
    const colorStatus = (item) => {
        switch (item?.status) {
            case 'Completed':
                return 'success';
            case 'Pending':
            case 'Confirmed':
                return 'warning';
            case 'Canceled':
                return 'cancel';
            default:
                return 'info';
        }
    };
    function RenderBodyTable({ data }) {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr
                            key={index}
                            onClick={
                                item?.status === 'Pending'
                                    ? (e) => handleModalWithdrawTrue(e, item)
                                    : () => {}
                            }
                        >
                            <td>{indexTable(page, show, index)}</td>
                            <td className='item-w100'>
                                {formatVND(item?.amount || 0)}
                            </td>
                            <td className='item-w100'>
                                {moment(item.createdAt).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                )}
                            </td>
                            <td className='item-w100'>{bank}</td>
                            <td className='item-w150'>
                                {item?.note ? (
                                    item?.note
                                ) : (
                                    <Skeleton width={50} />
                                )}
                            </td>
                            <td className='item-w100'>
                                <span
                                    className={`status ${
                                        colorStatus(item) + 'bgc'
                                    }`}
                                >
                                    {item?.status}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    }
    return (
        <div className={`${cx('container')}`}>
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <General
                className={cx('deposits_history')}
                valueSearch={withdraws_history}
                nameSearch='withdraws_history'
                dataHeaders={DataWithdrawsHistory().headers}
                noActions
                noRefresh
                totalData={dataWithdrawsHistoryFlag?.length}
                PaginationCus={true}
                startPagiCus={start}
                endPagiCus={end}
                dataPagiCus={dataFilterHistory(
                    dataWithdrawsHistoryFlag,
                    withdraws_history,
                    start,
                    end
                )}
            >
                <RenderBodyTable data={dataWithdrawsHistoryFlag} />
            </General>
            {modalVerifyWithdraw && (
                <Modal
                    openModal={(e) => handleModalWithdrawTrue(e, itemWithdraw)}
                    closeModal={handleModalWithdrawFalse}
                    titleHeader='Xác thực rút tiền'
                    actionButtonText='Gửi'
                    classNameButton={`infobgc`}
                    isProcess={isProcessModalWithdraw}
                    isProcessCancel={isProcessCancelWithdraw}
                    onClick={handleAuthenWithdraw}
                    onClickCancel={() => handleCancelWithdraw(itemWithdraw?.id)}
                >
                    <CustomcareLine
                        nameIcon='fa-solid fa-rotate-right'
                        colorIcon='success'
                        title='Trạng thái:'
                        textLink={itemWithdraw?.status || '---'}
                        colorStatus={`status ${
                            colorStatus(itemWithdraw) + 'bgc'
                        }`}
                    />
                    <CustomcareLine
                        nameIcon='fa-regular fa-clock'
                        colorIcon='info'
                        title='Ngày rút:'
                        textLink={dateFormat(
                            itemWithdraw?.createdAt,
                            'DD/MM/YYYY HH:mm:ss'
                        )}
                    />
                    <CustomcareLine
                        nameIcon='fa-solid fa-money-bill'
                        colorIcon='warning'
                        title='Số tiền rút:'
                        textLink={formatVND(itemWithdraw?.amount || 0)}
                    />
                    <CustomcareLine
                        nameIcon='fa fa-bank'
                        colorIcon='cancel'
                        title='Ngân hàng thụ hưởng:'
                        bankMethod
                        bankName={userById?.payment?.bank?.bankName}
                        accountName={userById?.payment?.bank?.name}
                        accountNumber={userById?.payment?.bank?.account}
                    />
                    <FormInput
                        label='Mã xác thực'
                        placeholder='---'
                        value={otpCode}
                        name='otpCode'
                        onChange={(e) =>
                            dispatch(setData({ otpCode: e.target.value }))
                        }
                        classNameField={`mt8`}
                    />
                    <div
                        className={`${cx('text_resend')} fwb cancel`}
                        onClick={
                            isProcessResendOTP
                                ? () => {}
                                : () => handleResendOTP(itemWithdraw?.id)
                        }
                    >
                        {isProcessResendOTP ? 'Đang gửi mã...' : 'Gửi lại mã'}
                    </div>
                </Modal>
            )}
        </div>
    );
}
