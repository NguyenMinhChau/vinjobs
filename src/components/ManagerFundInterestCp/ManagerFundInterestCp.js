/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ManagerFundInterestCp.module.css';
import { useAppContext } from '../../utils';
import { indexTable } from '../../utils/tableIndex';
import SnackbarCp from '../SnackbarCp/SnackbarCp';
import { General } from '../../layouts';
import DataManagerFundAgricultureHeader from '../../utils/fakeData/dataManagerFundAgricultureHeader';
import {
    userCancelContractSV,
    userGetDisbursementByIdContractSV,
} from '../../services/user';
import CustomcareLine from '../CustomcareLine/CustomcareLine';
import { formatVND, formatVNDCurrency } from '../../utils/format/FormatMoney';
import { dateFormat } from '../../utils/format/DateVN';
import Modal from '../Modal/Modal';
import dataFilterManagerFund from '../../utils/dataTableCusFilter/dataFilterManagerFund';
import requestRefreshToken from '../../utils/axios/refreshToken';
import { setData } from '../../app/reducer';

const cx = className.bind(styles);

export default function ManagerFundInterestCp({ data }) {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        dataManagerFundAgriculture,
        pagination: { page, show },
        searchValues: { manager_fund_agriculture },
    } = state.set;
    let showPage = 10;
    const start = (page - 1) * showPage + 1;
    const end = start + showPage - 1;
    const [disbursement, setDisbursement] = useState([]);
    const [itemFundAgriculture, setItemFundAgriculture] = useState(null);
    const [isModalDetailAgriculture, setIsModalDetailAgriculture] =
        useState(false);
    const [isProcessModal, setIsProcessModal] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const handleModalDetailAgricultureTrue = (e) => {
        e.stopPropagation();
        setIsModalDetailAgriculture(true);
    };
    const handleModalDetailAgricultureFalse = (e) => {
        e.stopPropagation();
        setIsModalDetailAgriculture(false);
    };
    let dataManagerFundAgricultureFlag =
        data?.agriculture?.sort((a, b) => b?.id - a?.id) || [];
    if (manager_fund_agriculture) {
        dataManagerFundAgricultureFlag = dataManagerFundAgricultureFlag.filter(
            (item) => {
                return (
                    item?.id
                        ?.toString()
                        ?.toLowerCase()
                        .includes(manager_fund_agriculture?.toLowerCase()) ||
                    item?.cycle
                        ?.toString()
                        ?.toLowerCase()
                        .includes(manager_fund_agriculture?.toLowerCase()) ||
                    item?.status
                        ?.toString()
                        ?.toLowerCase()
                        .includes(manager_fund_agriculture?.toLowerCase()) ||
                    item?.principal
                        ?.toString()
                        ?.toLowerCase()
                        .includes(manager_fund_agriculture?.toLowerCase()) ||
                    item?.disbursement
                        ?.toString()
                        ?.toLowerCase()
                        .includes(manager_fund_agriculture?.toLowerCase()) ||
                    dateFormat(item?.date_start, 'DD/MM/YYYY')
                        ?.toString()
                        ?.toLowerCase()
                        .includes(manager_fund_agriculture?.toLowerCase())
                );
            }
        );
    }
    useEffect(() => {
        dataManagerFundAgricultureFlag?.map((item) => {
            userGetDisbursementByIdContractSV({
                id_contract: item?.id,
                setSnackbar,
                setDisbursement,
            });
        });
    }, []);
    if (disbursement?.length <= dataManagerFundAgricultureFlag?.length) {
        dataManagerFundAgricultureFlag?.map((item) => {
            userGetDisbursementByIdContractSV({
                id_contract: item?.id,
                setSnackbar,
                setDisbursement,
            });
        });
    }
    const uniqueDisbursement = disbursement.filter(
        (v, i, a) => a.findIndex((t) => t.disbursement === v.disbursement) === i
    );
    for (let i = 0; i < dataManagerFundAgricultureFlag?.length; i++) {
        for (let j = 0; j < uniqueDisbursement?.length; j++) {
            if (
                dataManagerFundAgricultureFlag[i].principal ===
                uniqueDisbursement[j].principal
            ) {
                dataManagerFundAgricultureFlag[i].disbursement =
                    uniqueDisbursement[j].disbursement;
            }
        }
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
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
                            onClick={() => {
                                setItemFundAgriculture(item);
                                setIsModalDetailAgriculture(true);
                            }}
                        >
                            <td>{indexTable(page, show, index)}</td>
                            <td className='item-w200'>
                                {item?.id}/{dateFormat(item?.createdAt, 'YYYY')}
                                /HDPTNN-
                                {dateFormat(item?.date_start, 'DD/MM/YYYY')}
                            </td>
                            <td className='item-w100'>{item?.cycle} mùa</td>
                            <td className='item-w100'>
                                {formatVND(item?.principal)}
                            </td>
                            <td className='item-w150'>
                                {item?.disbursement
                                    ? formatVNDCurrency(item?.disbursement)
                                    : 'Đang tải'}
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
    const handleCancelContractSV = (dataToken, id) => {
        userCancelContractSV({
            id_contract: id,
            id_user: currentUser?.id,
            setSnackbar,
            token: dataToken?.token,
            setIsProcessModal,
            setIsModalDetailAgriculture,
            dispatch,
        });
    };
    const handleCancelContract = async (id) => {
        await 1;
        setIsProcessModal(true);
        requestRefreshToken(
            currentUser,
            handleCancelContractSV,
            state,
            dispatch,
            setData,
            setSnackbar,
            id
        );
    };
    return (
        <div className={`${cx('container')}`}>
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <General
                className={cx('manager_fund_agriculture')}
                valueSearch={manager_fund_agriculture}
                nameSearch='manager_fund_agriculture'
                dataHeaders={DataManagerFundAgricultureHeader().headers}
                noActions
                noRefresh
                totalData={dataManagerFundAgricultureFlag?.length}
                PaginationCus={true}
                startPagiCus={start}
                endPagiCus={end}
                dataPagiCus={dataFilterManagerFund(
                    dataManagerFundAgricultureFlag,
                    manager_fund_agriculture,
                    start,
                    end
                )}
            >
                <RenderBodyTable data={dataManagerFundAgricultureFlag} />
            </General>
            {isModalDetailAgriculture && (
                <Modal
                    openModal={handleModalDetailAgricultureTrue}
                    closeModal={handleModalDetailAgricultureFalse}
                    titleHeader='Chi tiết hợp đồng'
                    actionButtonText='Hủy hợp đồng'
                    classNameButton={`cancelbgcbold`}
                    onClick={() =>
                        handleCancelContract(itemFundAgriculture?.id)
                    }
                    isProcess={isProcessModal}
                >
                    <CustomcareLine
                        title='Mã HD:'
                        textLink={`${itemFundAgriculture?.id}/${dateFormat(
                            itemFundAgriculture?.createdAt,
                            'YYYY'
                        )}/HDPTNN`}
                        marginLeft={0}
                        colorStatus={`status cancelbgcbold`}
                    />
                    <CustomcareLine
                        title='Tên:'
                        textLink={currentUser?.username}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='Gói:'
                        textLink='QUỸ PHÁT TRIỂN NÔNG NGHIỆP'
                        marginLeft={0}
                        colorStatus={`warning`}
                    />
                    <CustomcareLine
                        title='Thời gian gửi:'
                        textLink={dateFormat(
                            itemFundAgriculture?.date_start,
                            'DD/MM/YYYY'
                        )}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='Kỳ hạn:'
                        textLink={itemFundAgriculture?.cycle + ' mùa'}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='Vốn:'
                        textLink={formatVND(itemFundAgriculture?.principal)}
                        marginLeft={0}
                        colorStatus={`info`}
                    />
                    <CustomcareLine
                        title='Giải ngân:'
                        textLink={formatVNDCurrency(
                            itemFundAgriculture?.disbursement
                        )}
                        marginLeft={0}
                        noneBorderBottom
                        colorStatus={`success`}
                    />
                </Modal>
            )}
        </div>
    );
}
