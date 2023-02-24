/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import moment from 'moment';
import {
    useAppContext,
    DataWithdraws,
    deleteUtils,
    handleUtils,
    requestRefreshToken,
    localStoreUtils,
    numberUtils,
    useDebounce,
} from '../../utils';
import routers from '../../routers/routers';
import {
    Icons,
    ActionsTable,
    Modal,
    SelectStatus,
    SnackbarCp,
} from '../../components';
import { actions } from '../../app/';
import { General } from '../';
import {
    TrObjectIcon,
    TrObjectNoIcon,
    TrStatus,
} from '../../components/TableData/TableData';
import styles from './Withdraw.module.css';
import Skeleton from 'react-loading-skeleton';
import {
    adminGetAllWithdrawsSV,
    deleteWithdrawsSV,
    updateWithdrawsSV,
} from '../../services/admin';
import { getStore } from '../../utils/localStore/localStore';

const cx = className.bind(styles);

function Withdraw() {
    const { state, dispatch } = useAppContext();
    const {
        edit,
        currentUser,
        statusCurrent,
        statusUpdate,
        data: { dataWithdraw, dataUser },
        searchValues: { withdraw },
        pagination: { page, show },
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
    const useDebounceWithdraw = useDebounce(withdraw, 3000);
    useEffect(() => {
        document.title = `Rút tiền | ${process.env.REACT_APP_TITLE_WEB}`;
        adminGetAllWithdrawsSV({
            dispatch,
            setSnackbar,
            page,
            show,
            search: useDebounceWithdraw,
        });
    }, [useDebounceWithdraw]);
    let dataWithdrawFlag = dataWithdraw?.withdraws || [];
    if (withdraw) {
        dataWithdrawFlag = dataWithdrawFlag.filter((item) => {
            return (
                numberUtils
                    .formatVND(item?.amount)
                    .replace(/\./g, '')
                    .toLowerCase()
                    .includes(withdraw?.toLowerCase()) ||
                moment(item.createdAt)
                    .format('DD/MM/YYYY HH:mm:ss')
                    .toLowerCase()
                    .includes(withdraw?.toLowerCase()) ||
                item?.note.toLowerCase().includes(withdraw?.toLowerCase()) ||
                item?.status.toLowerCase().includes(withdraw?.toLowerCase())
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
    // Edit + Delete Withdraw
    const handleSendDel = (dataToken, id) => {
        deleteWithdrawsSV({
            id_withdraw: id,
            token: dataToken?.token,
            setSnackbar,
            setIsProcess,
            dispatch,
            state,
        });
    };
    const deleteWithdraw = async (id) => {
        await 1;
        setIsProcess(true);
        requestRefreshToken(
            currentUser,
            handleSendDel,
            state,
            dispatch,
            actions,
            id
        );
    };
    const handleEditStatus = async (dataToken, id) => {
        updateWithdrawsSV({
            id_withdraw: id,
            setIsProcess,
            token: dataToken?.token,
            dispatch,
            statusCurrent,
            statusUpdate,
            setSnackbar,
            state,
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
    const handleViewWithdraw = (item) => {
        dispatch(
            actions.setData({
                ...state.set,
                edit: { ...state.set.edit, id: item.id, itemData: item },
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
                            <td>{numberUtils.formatVND(item?.amount)}</td>
                            <td className='item-w150'>
                                {infoUser?.name ? (
                                    <TrObjectNoIcon item={infoUser} />
                                ) : (
                                    <Skeleton width='50px' />
                                )}
                            </td>
                            <td className='item-w100'>
                                {moment(item.createdAt).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                )}
                            </td>
                            <td className='item-w150'>
                                {item.note || <Skeleton width='50px' />}
                            </td>
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
                                    linkView={`${routers.withdraw}/${item.id}`}
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
                                    onClickView={() => handleViewWithdraw(item)}
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
                className={cx('withdraw')}
                valueSearch={withdraw}
                nameSearch='withdraw'
                dataHeaders={DataWithdraws(Icons).headers}
                dataFlag={dataWithdrawFlag}
                totalData={
                    dataWithdraw?.total || dataWithdraw?.data?.total
                        ? dataWithdraw.total || dataWithdraw?.data?.total
                        : dataWithdrawFlag?.length
                }
                dataPagiCus={dataWithdrawFlag}
                PaginationCus={
                    !(dataWithdraw?.total || dataWithdraw?.data?.total)
                }
                startPagiCus={start}
                endPagiCus={end}
            >
                <RenderBodyTable data={dataWithdrawFlag} />
            </General>
            {modalStatus && (
                <Modal
                    titleHeader='Thay đổi trạng thái'
                    actionButtonText='Gửi'
                    openModal={toggleEditTrue}
                    closeModal={toggleEditFalse}
                    classNameButton='vipbgc'
                    onClick={() => editStatus(currentUser?.idUpdate)}
                    isProcess={isProcess}
                >
                    <p className='modal-delete-desc'>
                        Bạn có chắc muốn thay đổi trạng thái [
                        {currentUser?.idUpdate}]?
                    </p>
                    <SelectStatus />
                </Modal>
            )}
            {modalDelete && (
                <Modal
                    titleHeader='Xác nhận xóa'
                    actionButtonText='Gửi'
                    openModal={modalDeleteTrue}
                    closeModal={modalDeleteFalse}
                    classNameButton='cancelbgc'
                    onClick={() => deleteWithdraw(currentUser?.idUpdate)}
                    isProcess={isProcess}
                >
                    <p className='modal-delete-desc'>
                        Bạn có chắc muốn xóa [{currentUser?.idUpdate}]?
                    </p>
                </Modal>
            )}
        </>
    );
}

export default Withdraw;
