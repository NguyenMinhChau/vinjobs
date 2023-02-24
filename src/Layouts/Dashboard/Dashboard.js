/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import className from 'classnames/bind';
import 'react-loading-skeleton/dist/skeleton.css';
import { actions } from '../../app/';
import styles from './Dashboard.module.css';
import {
    Button,
    FormInput,
    Modal,
    Search,
    SearchDate,
    SelectValue,
    SnackbarCp,
    TableData,
} from '../../components';
import {
    DataUserBalance,
    dateUtils,
    handleUtils,
    numberUtils,
    refreshPage,
    requestRefreshToken,
    searchUtils,
    useAppContext,
} from '../../utils';
import { Link } from 'react-router-dom';
import routers from '../../routers/routers';
import { FirstUpc } from '../../utils/format/LetterFirstUpc';
import { dashboardServices } from '../../services/admin';
import periodDate from '../../utils/FakeData/PeriodDate';
import { dateVnFormat2 } from '../../utils/format/DateVN';

const cx = className.bind(styles);

function Dashboard() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        totalDeposit,
        totalWithdraw,
        totalBalance,
        totalCommission,
        dataUserBalance,
        message: { error },
        searchValues: { dateFrom, dateTo, userBalance },
        pagination: { page, show },
    } = state.set;
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
    let showPage = 10;
    const start = (page - 1) * showPage + 1;
    const end = start + showPage - 1;
    const [modalRate, setModalRate] = useState(false);
    const [isProcess, setIsProcess] = useState(false);
    const [rateUpdate, setRateUpdate] = useState(null);
    const [isModalDate, setIsModalDate] = React.useState(false);
    const [isPeriod, setIsPeriod] = React.useState(false);
    const [period, setPeriod] = React.useState(null);
    const [date, setDate] = React.useState({
        from: null,
        to: null,
    });
    const refRateUpdate = useRef();
    useEffect(() => {
        document.title = `Dashboard | ${process.env.REACT_APP_TITLE_WEB}`;
        dashboardServices({ state, dispatch });
    }, []);
    // console.log(totalBalance, totalDeposit, totalWithdraw);
    let dataUser = dataUserBalance || [];
    if (userBalance) {
        dataUser = dataUserBalance.filter((item) => {
            return (
                item.payment.username
                    .toLowerCase()
                    .includes(userBalance.toLowerCase()) ||
                item.payment.email
                    .toLowerCase()
                    .includes(userBalance.toLowerCase()) ||
                item.payment.rule
                    .toLowerCase()
                    .includes(userBalance.toLowerCase()) ||
                item.rank.toLowerCase().includes(userBalance.toLowerCase())
            );
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            actions.setData({
                ...state.set,
                searchValues: {
                    ...state.set.searchValues,
                    [name]: value,
                },
            })
        );
    };
    const handleChangeRate = (e) => {
        setRateUpdate(e.target.value);
    };
    const modalRateTrue = (e) => {
        e.stopPropagation();
        setModalRate(true);
    };
    const modalRateFalse = (e) => {
        e.stopPropagation();
        setRateUpdate('');
        setModalRate(false);
    };
    const openModalDate = (e) => {
        e.stopPropagation();
        setIsModalDate(true);
    };
    const closeModalDate = (e) => {
        e.stopPropagation();
        setIsModalDate(false);
        setPeriod(null);
        setDate({
            from: null,
            to: null,
        });
        dispatch(
            actions.setData({
                searchValues: {
                    dateFrom: null,
                    dateTo: null,
                },
            })
        );
    };
    const tooglePeriod = (e) => {
        e.stopPropagation();
        setIsPeriod(!isPeriod);
    };
    const handleChangePeriod = (item) => {
        const date = new Date();
        let toDate = new Date();
        let fromDate = new Date();
        switch (item?.toLowerCase()?.replace(/\s/g, '')) {
            case 'today':
                fromDate = new Date();
                break;
            case 'yesterday':
                fromDate = new Date(date.setDate(date.getDate() - 1));
                break;
            case 'thisweek':
                //lấy ngày thứ 2 của tuần week[1]
                fromDate = new Date(
                    date.setDate(date.getDate() - date.getDay() + 1)
                );
                break;
            case 'lastweek':
                fromDate = new Date(
                    date.setDate(date.getDate() - date.getDay() + 1 - 7)
                );
                toDate = new Date(
                    date.setDate(date.getDate() - date.getDay() + 7)
                );
                break;
            case 'thismonth':
                // lấy ngày đầu tiên của tháng
                fromDate = new Date(date.setDate(1));
                break;
            case 'lastmonth':
                fromDate = new Date(date.setMonth(date.getMonth() - 1, 1));
                toDate = new Date(date.setMonth(date.getMonth() + 1, 0));
                break;
            case 'thisyear':
                // lấy ngày đầu tiên của năm
                fromDate = new Date(date.setMonth(0, 1));
                break;
            case 'lastyear':
                fromDate = new Date(
                    date.setFullYear(date.getFullYear() - 1, 0, 1)
                );
                toDate = new Date(
                    date.setFullYear(date.getFullYear() + 1, 0, 0)
                );
                break;
            default:
                fromDate = new Date();
                break;
        }
        dispatch(
            actions.setData({
                searchValues: {
                    dateFrom: dateUtils.dateVnFormat2(fromDate),
                    dateTo: dateUtils.dateVnFormat2(toDate),
                },
            })
        );
        setPeriod(item);
        setIsPeriod(false);
    };
    const onSelectDate = (e) => {
        e.stopPropagation();
        setIsModalDate(false);
        setDate({
            from: dateFrom || dateUtils.dateVnFormat2(new Date()),
            to: dateTo || dateUtils.dateVnFormat2(new Date()),
        });
    };
    const handleChangeDate = (e) => {
        const { name, value } = e.target;
        dispatch(
            actions.setData({
                searchValues: { [name]: value },
            })
        );
    };
    const changeSearch = (e) => {
        return searchUtils.logicSearch(e, dispatch, state, actions);
    };
    const handleSend = async () => {
        try {
            await 1;
            setIsProcess(true);
            setTimeout(() => {
                setIsProcess(false);
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    };
    const handleUpdateRate = (data) => {};
    const updateRate = async () => {
        await 1;
        setSnackbar({
            open: true,
            type: 'success',
            message: 'Chức năng đang phát triển',
        });
        setModalRate(false);
        // setIsProcess(true);
        // requestRefreshToken(
        //     currentUser,
        //     handleUpdateRate,
        //     state,
        //     dispatch,
        //     actions
        // );
        // setRateUpdate(null);
        // setModalRate(false);
        // setIsProcess(false);
    };
    const ChartItem = ({ title, value, link, to }) => {
        return (
            <div className={`${cx('item')}`}>
                {link ? (
                    <Link to={to} className={`${cx('title-link')}`}>
                        {title}
                    </Link>
                ) : (
                    <div className={`${cx('title')}`}>{title}</div>
                )}
                <div className={`${cx('value')}`}>{value}</div>
            </div>
        );
    };
    function RenderBodyTableUser({ data }) {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index} style={{ fontSize: '14px' }}>
                            <td className='upc'>
                                {handleUtils.indexTable(page, show, index)}
                            </td>
                            <td className='item-w150'>
                                {item.payment.username}
                            </td>
                            <td className='item-w150 text-left'>
                                {item.payment.email}
                            </td>
                            <td className='text-left'>
                                {numberUtils.formatVND(item.Wallet.balance)}
                            </td>
                            <td className='text-left'>
                                <span
                                    className={`${
                                        item.payment.rule + 'bgc'
                                    } status`}
                                >
                                    {item.payment.rule}
                                </span>
                            </td>
                            <td className='text-left'>
                                <span
                                    className={`${
                                        item.rank.toLowerCase() + 'bgc'
                                    } status`}
                                >
                                    {FirstUpc(item.rank)}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    }
    return (
        <div className={`${cx('dashboard-container')}`}>
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <div className={`${cx('general-top')}`}>
                <div
                    className='flex-start mt8'
                    style={{ alignItems: 'flex-end', display: 'flex' }}
                >
                    {/* <Button
                        className={`${cx('general-button')} cancelbgc`}
                        onClick={openModalDate}
                    >
                        <Icons.SearchDateIcon />
                        <span className={`${cx('general-button-text')}`}>
                            Chọn ngày thống kê
                        </span>
                    </Button> */}
                    {/* <Button
                        className={`${cx('general-button')} completebgc`}
                        onClick={handleSend}
                        isProcess={isProcess}
                        disabled={isProcess}
                    >
                        <span className={`${cx('general-button-icon')}`}>
                            <i className='fa-regular fa-paper-plane'></i>
                        </span>
                        <span className={`${cx('general-button-text')}`}>
                            Xem kết quả
                        </span>
                    </Button> */}
                    <Button
                        className={`${cx('general-button')} vipbgc`}
                        onClick={modalRateTrue}
                    >
                        <span className={`${cx('general-button-icon')}`}>
                            <i class='fa-regular fa-pen-to-square'></i>
                        </span>
                        <span className={`${cx('general-button-text')}`}>
                            Đổi giá
                        </span>
                    </Button>
                    <Button
                        className={`${cx('general-button')} confirmbgc`}
                        onClick={refreshPage.refreshPage}
                    >
                        <div className='flex-center'>
                            <span className={`${cx('general-button-icon')}`}>
                                <i class='fa-solid fa-rotate'></i>
                            </span>
                            <span className={`${cx('general-button-text')}`}>
                                Tải lại trang
                            </span>
                        </div>
                    </Button>
                </div>
            </div>
            <div className={`${cx('chart-container')}`}>
                <div className={`${cx('chart-item-container')}`}>
                    <ChartItem
                        title='Tổng nạp'
                        value={numberUtils.formatVND(totalDeposit || 0)}
                        link
                        to={routers.deposits}
                    />
                    <ChartItem
                        title='Tổng rút'
                        value={numberUtils.formatVND(totalWithdraw || 0)}
                        link
                        to={routers.withdraw}
                    />
                    <ChartItem
                        title='Tổng tài sản'
                        value={totalBalance ? totalBalance : 0}
                    />
                    <ChartItem
                        title='Commission'
                        value={numberUtils.formatVND(totalCommission)}
                    />
                </div>
            </div>
            <div className={`${cx('general-table-container')}`}>
                <div className={`${cx('title-header')}`}>
                    Danh sách tài khoản còn tài sản
                </div>
                <Search
                    name='userBalance'
                    value={userBalance}
                    onChange={changeSearch}
                    className={`${cx('search-coin')}`}
                />
                <TableData
                    totalData={dataUser?.length}
                    headers={DataUserBalance().headers}
                    search={userBalance}
                    noActions
                    dataPagiCus={dataUser}
                    PaginationCus={true}
                    startPagiCus={start}
                    endPagiCus={end}
                >
                    <RenderBodyTableUser data={dataUser} />
                </TableData>
            </div>
            {modalRate && (
                <Modal
                    titleHeader={'Cập nhật giá'}
                    actionButtonText={'Cập nhật'}
                    closeModal={modalRateFalse}
                    openModal={modalRateTrue}
                    classNameButton='vipbgc'
                    errorMessage={error}
                    onClick={
                        rateUpdate
                            ? updateRate
                            : () => {
                                  refRateUpdate.current.focus();
                              }
                    }
                    isProcess={isProcess}
                    disabled={!rateUpdate}
                >
                    <FormInput
                        label='Giá'
                        type='text'
                        placeholder='Nhập giá (Ví dụ: 0.5 = 50%)'
                        name='rateDeposit'
                        value={rateUpdate}
                        onChange={handleChangeRate}
                        ref={refRateUpdate}
                        classNameField={`${cx('payment-form-field')}`}
                        classNameInput={`${cx('payment-form-input')}`}
                    />
                </Modal>
            )}
            {isModalDate && (
                <Modal
                    titleHeader='Chọn ngày báo cáo'
                    actionButtonText='Chọn'
                    openModal={openModalDate}
                    closeModal={closeModalDate}
                    classNameButton='vipbgc'
                    onClick={onSelectDate}
                >
                    <SelectValue
                        label='Lựa chọn'
                        toggleModal={tooglePeriod}
                        stateModal={isPeriod}
                        dataFlag={periodDate}
                        onClick={handleChangePeriod}
                        valueSelect={period ? period : 'Today'}
                    />
                    <div className={`${cx('search-container')}`}>
                        <div className={`${cx('search-title')}`}>Từ ngày</div>
                        <SearchDate
                            name='dateFrom'
                            value={
                                dateFrom ? dateFrom : dateVnFormat2(new Date())
                            }
                            onChange={handleChangeDate}
                            className={`${cx('search')}`}
                        />
                    </div>
                    <div className={`${cx('search-container')}`}>
                        <div className={`${cx('search-title')}`}>Đến ngày</div>
                        <SearchDate
                            name='dateTo'
                            value={dateTo ? dateTo : dateVnFormat2(new Date())}
                            onChange={handleChangeDate}
                            className={`${cx('search')}`}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Dashboard;
