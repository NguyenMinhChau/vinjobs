/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import moment from 'moment';
import {
    useAppContext,
    deleteUtils,
    handleUtils,
    localStoreUtils,
    numberUtils,
    requestRefreshToken,
} from '../../utils';
import {
    Icons,
    ActionsTable,
    Modal,
    SelectStatus,
    SnackbarCp,
} from '../../components';
import { actions } from '../../app/';
import routers from '../../routers/routers';
import { General } from '../';
import { TrObjectNoIcon, TrStatus } from '../../components/TableData/TableData';
import styles from './FundUSD.module.css';
import Skeleton from 'react-loading-skeleton';
import { getStore } from '../../utils/localStore/localStore';
import DataFundUsdHeader from '../../utils/FakeData/FundUSDHeader';
import {
    deleteFundUSDsSV,
    getContractUSDSV,
    updateFundUsdSV,
} from '../../services/admin';
import { dateFormat } from '../../utils/format/DateVN';

const cx = className.bind(styles);

function FundUSD() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        statusUpdate,
        statusCurrent,
        searchValues: { fundUsd },
        pagination: { page, show },
        data: { dataFundUsd, dataUser },
    } = state.set;
    let showPage = 10;
    const start = (page - 1) * showPage + 1;
    const end = start + showPage - 1;
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
    const { modalStatus, modalDelete } = state.toggle;
    const [isProcess, setIsProcess] = useState(false);
    useEffect(() => {
        document.title = `Quỹ đầu tư USD | ${process.env.REACT_APP_TITLE_WEB}`;
        getContractUSDSV({
            dispatch,
            state,
            setSnackbar,
        });
    }, []);
    let dataFundUsdFlag = dataFundUsd || [];
    if (fundUsd) {
        dataFundUsdFlag = dataFundUsdFlag.filter((item) => {
            return (
                dateFormat(item?.date_start, 'DD/MM/YYYY')
                    ?.toLowerCase()
                    .includes(fundUsd?.toLowerCase()) ||
                numberUtils
                    .formatVND(item?.principal)
                    .replace(/\./g, '')
                    ?.toLowerCase()
                    .includes(fundUsd?.toLowerCase()) ||
                item.status?.toLowerCase().includes(fundUsd?.toLowerCase()) ||
                item.cycle?.toLowerCase().includes(fundUsd?.toLowerCase()) ||
                item?.id
                    ?.toString()
                    ?.toLowerCase()
                    .includes(fundUsd?.toLowerCase())
            );
        });
    }
    // Modal
    const toggleEditTrue = async (e, status, id) => {
        deleteUtils.statusTrue(e, status, id, dispatch, state, actions);
    };
    const toggleEditFalse = (e) => {
        return deleteUtils.statusFalse(e, dispatch, state, actions);
    };
    const modalDeleteTrue = (e, id) => {
        return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
    };
    const modalDeleteFalse = (e) => {
        return deleteUtils.deleteFalse(e, dispatch, state, actions);
    };
    // Edit + Delete Deposits
    const handleSendContract = (dataToken, id) => {
        deleteFundUSDsSV({
            id_fund: id,
            token: dataToken?.token,
            setSnackbar,
            dispatch,
            setIsProcess,
            state,
        });
    };
    const deleteContracts = async (id) => {
        await 1;
        setIsProcess(true);
        requestRefreshToken(
            currentUser,
            handleSendContract,
            state,
            dispatch,
            actions,
            id
        );
    };
    const handleEditStatus = async (dataToken, id) => {
        updateFundUsdSV({
            id_fund: id,
            setIsProcess,
            state,
            token: dataToken?.token,
            dispatch,
            statusCurrent,
            statusUpdate,
            setSnackbar,
        });
    };
    const editStatus = async (id) => {
        await 1;
        setIsProcess(true);
        requestRefreshToken(
            currentUser,
            handleEditStatus,
            state,
            dispatch,
            actions,
            id
        );
    };
    const handleViewDeposits = (item) => {
        dispatch(
            actions.setData({
                ...state.set,
                edit: {
                    ...state.set.edit,
                    id: item._id || item.id,
                    itemData: item,
                },
            })
        );
    };
    function RenderBodyTable({ data }) {
        return (
            <>
                {data.map((item, index) => {
                    const username = (dataUser?.data || dataUser)?.find(
                        (x) => x?._id === item.userId
                    )?.payment.username;
                    const email = (dataUser?.data || dataUser)?.find(
                        (x) => x?._id === item.userId
                    )?.payment.email;
                    const infoUser = {
                        name: username,
                        email: email,
                        path: `@${username?.replace(' ', '-')}`,
                    };
                    return (
                        <tr key={index}>
                            <td>{handleUtils.indexTable(page, show, index)}</td>
                            <td>
                                {infoUser?.name ? (
                                    <TrObjectNoIcon item={infoUser} />
                                ) : (
                                    <Skeleton width='50px' />
                                )}
                            </td>
                            <td>
                                {item?.id}/{dateFormat(item?.createdAt, 'YYYY')}
                                /HDQDTUSD-
                                {dateFormat(item?.date_start, 'DD/MM/YYYY')}
                            </td>
                            <td>{item?.cycle} tháng</td>
                            <td>{numberUtils.formatVND(item?.principal)}</td>
                            <td>
                                <TrStatus
                                    item={item.status}
                                    onClick={async (e) => {
                                        toggleEditTrue(e, item.status, item.id);
                                        await localStoreUtils.setStore({
                                            ...currentUser,
                                            idUpdate: item?.id,
                                        });
                                        await dispatch(
                                            actions.setData({
                                                currentUser: getStore(),
                                            })
                                        );
                                    }}
                                />
                            </td>
                            <td>
                                <ActionsTable
                                    view
                                    linkView={`${routers.contractUsd}/${item.id}`}
                                    onClickDel={async (e) => {
                                        modalDeleteTrue(e, item.id);
                                        await localStoreUtils.setStore({
                                            ...currentUser,
                                            idUpdate: item?.id,
                                        });
                                        await dispatch(
                                            actions.setData({
                                                currentUser: getStore(),
                                            })
                                        );
                                    }}
                                    onClickView={() => handleViewDeposits(item)}
                                ></ActionsTable>
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    }
    return (
        <>
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <General
                className={cx('fundUsd')}
                valueSearch={fundUsd}
                nameSearch='fundUsd'
                dataHeaders={DataFundUsdHeader(Icons).headers}
                // dataFlag={dataFundUsdFlag}
                // totalData={dataFundUsd?.total || dataFundUsd?.data?.total}
                totalData={dataFundUsdFlag?.length}
                dataPagiCus={dataFundUsdFlag}
                PaginationCus={true}
                startPagiCus={start}
                endPagiCus={end}
            >
                <RenderBodyTable data={dataFundUsdFlag} />
            </General>
            {modalStatus && (
                <Modal
                    titleHeader='Thay đổi trạng thái HDQDTUSD'
                    actionButtonText='Thay đổi'
                    openModal={toggleEditTrue}
                    closeModal={toggleEditFalse}
                    classNameButton='vipbgc'
                    onClick={() => editStatus(currentUser?.idUpdate)}
                    isProcess={isProcess}
                >
                    <p className='modal-delete-desc'>
                        Bạn có chắc muốn thay đổi trạng thái HDQDTUSD này [
                        {currentUser?.idUpdate}]?
                    </p>
                    <SelectStatus />
                </Modal>
            )}
            {modalDelete && (
                <Modal
                    titleHeader='Xác nhận xóa HDQDTUSD'
                    actionButtonText='Xóa'
                    openModal={modalDeleteTrue}
                    closeModal={modalDeleteFalse}
                    classNameButton='cancelbgc'
                    onClick={() => deleteContracts(currentUser?.idUpdate)}
                    isProcess={isProcess}
                >
                    <p className='modal-delete-desc'>
                        Bạn có chắc muốn xóa HDQDTUSD này [
                        {currentUser?.idUpdate}]?
                    </p>
                </Modal>
            )}
        </>
    );
}

export default FundUSD;
