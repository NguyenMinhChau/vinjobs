/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './SendFunds.module.css';
import {
    Button,
    CustomcareLine,
    FormInput,
    LoginRegisterCp,
    LoginRegisterCpTwo,
    Modal,
    SelectDateCp,
    SelectValueCp,
    SliderHeader,
    SnackbarCp,
    TotalAssetsAndFund,
    TotalItem,
} from '../../components';
import { useAppContext } from '../../utils';
import { setData } from '../../app/reducer';
import { formatVND, formatVNDCurrency } from '../../utils/format/FormatMoney';
import { dateFormat } from '../../utils/format/DateVN';
import moment from 'moment';
import { autoFormatNumberInputChange } from '../../utils/format/NumberFormat';
import useDebounce from '../../utils/hooks/useDebounce';
import {
    userAddContractSV,
    userGetContractSV,
    userGetTotalMoneySV,
} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import { useNavigate } from 'react-router-dom';

const cx = className.bind(styles);
const DATA_INVESTMENT = [
    {
        id: 1,
        name: 'Quỹ đầu tư USD',
    },
    {
        id: 2,
        name: 'Quỹ phát triển nông nghiệp',
    },
];

export default function SendFunds() {
    const { state, dispatch } = useAppContext();
    const { sendingTime, period, deposits, investmentFund, currentUser } =
        state.set;
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const [isShow, setIsShow] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [isProcessSendFund, setIsProcessSendFund] = useState(false);
    const [isModalContract, setIsModalContract] = useState(false);
    const [isModalSubmit, setIsModalSubmit] = useState(false);
    const [isProcessSubmit, setIsProcessSubmit] = useState(false);
    const [disbursement, setDisbursement] = useState(null);
    const [dataContract, setDataContract] = useState(null);
    const history = useNavigate();
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
    const handleModalContractTrue = (e) => {
        e.stopPropagation();
        setIsModalContract(true);
    };
    const handleModalContractFalse = (e) => {
        e.stopPropagation();
        setIsModalContract(false);
    };
    const handleModalSubmitTrue = (e) => {
        e.stopPropagation();
        setIsModalSubmit(true);
    };
    const handleModalSubmitFalse = (e) => {
        e.stopPropagation();
        setIsModalSubmit(false);
    };
    const useDebouncePeriod = useDebounce(period, 3000);
    const useDebounceDeposits = useDebounce(deposits, 3000);
    const handleSendContract = (dataToken) => {
        userGetContractSV({
            id_user: currentUser?.id,
            setSnackbar,
            setDataContract,
            token: dataToken?.token,
        });
    };
    const handleGetMoneySV = (dataToken) => {
        userGetTotalMoneySV({
            setSnackbar,
            typeContract:
                investmentFund?.id === 1
                    ? 'USD'
                    : investmentFund?.id === 2
                    ? 'AGRICULTURE'
                    : '',
            cycleContract: useDebouncePeriod,
            principalContract: useDebounceDeposits.replace(/\./g, ''),
            setDisbursement,
            token: dataToken?.token,
        });
    };
    useEffect(() => {
        setDisbursement(null);
        if (investmentFund && useDebouncePeriod && useDebounceDeposits) {
            requestRefreshToken(
                currentUser,
                handleGetMoneySV,
                state,
                dispatch,
                setData,
                setSnackbar
            );
        }
        requestRefreshToken(
            currentUser,
            handleSendContract,
            state,
            dispatch,
            setData,
            setSnackbar
        );
    }, [investmentFund, useDebouncePeriod, useDebounceDeposits]);
    useEffect(() => {
        document.title = `Gửi quỹ | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const DATA_MERGE =
        dataContract &&
        [...dataContract?.usd, ...dataContract?.agriculture]?.sort((a, b) => {
            return a?.id - b?.id;
        });
    const ID_FINAL = DATA_MERGE && DATA_MERGE[DATA_MERGE.length - 1]?.id;
    const toogleIsShow = () => {
        setIsShow(!isShow);
    };
    const handleSendFund = (dataToken) => {
        userAddContractSV({
            id_user: currentUser?.id,
            cycle: period,
            principal: deposits.replace(/\./g, ''),
            type:
                investmentFund?.id === 1
                    ? 'USD'
                    : investmentFund?.id === 2
                    ? 'AGRICULTURE'
                    : '',
            timeSend: moment(sendingTime).format('YYYY-MM-DD HH:mm:ss'),
            setSnackbar,
            dispatch,
            setIsModalSubmit,
            setIsProcessSubmit,
            token: dataToken?.token,
            history,
        });
    };
    const handleContinue = async () => {
        await 1;
        if (currentUser) {
            if (!period || !deposits || !investmentFund) {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'Vui lòng nhập đầy đủ thông tin',
                });
            } else if (moment(sendingTime).isBefore(new Date())) {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'Thời gian gửi không hợp lệ',
                });
            } else if (investmentFund?.id === 2 && parseInt(period) === 1) {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message:
                        'Quỹ phát triển nông nghiệp phải gửi từ 2 mùa trở lên.',
                });
            } else if (!disbursement) {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'Vui lòng chờ tính toán tổng giải ngân.',
                });
            } else {
                setIsModalSubmit(true);
            }
        } else {
            setSnackbar({
                open: true,
                type: 'error',
                message: <LoginRegisterCp />,
            });
        }
    };
    const handleSubmit = async () => {
        await 1;
        setIsProcessSubmit(true);
        requestRefreshToken(
            currentUser,
            handleSendFund,
            state,
            dispatch,
            setData,
            setSnackbar
        );
        alert(
            'Thông tin này đã được gửi về bộ phận quản lý quỹ, bộ phận sẽ sớm liên hệ quý khách để tiến hành làm hợp đồng!'
        );
    };
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='GỬI'
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
                    >
                        <TotalItem
                            title='Tổng tài sản'
                            price={1000}
                            isShow={isShow}
                        />
                        <TotalItem
                            title='Ví quỹ'
                            price={1000}
                            isShow={isShow}
                        />
                        <TotalItem
                            title='Ví đầu tư'
                            price={1000}
                            isShow={isShow}
                        />
                        <TotalItem title='Số dư' price={1000} isShow={isShow} />
                    </TotalAssetsAndFund>
                )}
                <div className={`${cx('list_info_container')}`}>
                    <div className={`${cx('list_info_item')}`}>
                        <div className={`${cx('item_text')}`}>
                            <i class='fa-regular fa-paper-plane'></i>
                            <span>Thông tin gửi quỹ</span>
                        </div>
                        <div className={`${cx('menu_conatiner')}`}>
                            <SelectValueCp
                                label='Chọn quỹ đầu tư'
                                value={investmentFund?.name}
                                placeholder='---'
                                data={DATA_INVESTMENT}
                                nameSet='investmentFund'
                                stateSelect={showSelect}
                                setStateSelect={setShowSelect}
                            />
                            <SelectDateCp
                                label='Thời gian gửi'
                                value={sendingTime}
                                nameSet='sendingTime'
                            />
                            <FormInput
                                label='Kỳ hạn'
                                placeholder='---'
                                value={period}
                                name='period'
                                onChange={(e) =>
                                    dispatch(
                                        setData({ period: e.target.value })
                                    )
                                }
                                classNameField={`mt8`}
                                unit={
                                    investmentFund?.id === 1
                                        ? 'Tháng'
                                        : investmentFund?.id === 2
                                        ? 'Mùa'
                                        : ''
                                }
                            />
                            <FormInput
                                label='Số tiền gửi'
                                placeholder='---'
                                type='text'
                                value={deposits}
                                name='deposits'
                                onChange={(e) => {
                                    dispatch(
                                        setData({
                                            deposits:
                                                autoFormatNumberInputChange(
                                                    e.target.value
                                                ),
                                        })
                                    );
                                }}
                                unit={deposits && 'VND'}
                            />
                        </div>
                    </div>
                    <div className={`${cx('list_info_item')}`}>
                        <div className={`${cx('menu_conatiner')}`}>
                            <FormInput
                                label='Tổng tiền giải ngân'
                                value={formatVNDCurrency(
                                    disbursement?.disbursement || 0
                                )}
                                readOnly
                            />
                            <div
                                className={`${cx('text_desc')} cancel fwb`}
                                onClick={handleModalContractTrue}
                            >
                                *Các quy định về hợp đồng
                            </div>
                            <Button
                                className={`${cx('btn_submit')} infobgcbold`}
                                onClick={handleContinue}
                                isProcess={isProcessSendFund}
                                disabled={isProcessSendFund}
                            >
                                Tiếp tục
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalContract && (
                <Modal
                    openModal={handleModalContractTrue}
                    closeModal={handleModalContractFalse}
                    titleHeader='Quy định về hợp đồng'
                    hideButton={true}
                >
                    <div className={`${cx('contract_container')}`}>
                        <div className={`${cx('text_contract_desc')} info`}>
                            Đang cập nhật...
                        </div>
                    </div>
                </Modal>
            )}
            {isModalSubmit && (
                <Modal
                    openModal={handleModalSubmitTrue}
                    closeModal={handleModalSubmitFalse}
                    titleHeader='Xác nhận hợp đồng'
                    actionButtonText='Xác nhận'
                    classNameButton={`infobgcbold`}
                    onClick={handleSubmit}
                    isProcess={isProcessSubmit}
                >
                    <CustomcareLine
                        title='Mã HD:'
                        textLink={`${
                            ID_FINAL ? ID_FINAL + 1 : 1
                        }/${new Date().getFullYear()}/${
                            investmentFund?.id === 1 ? 'HDQDTUSD' : 'HDPTNN'
                        }`}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='Tên:'
                        textLink={currentUser?.username}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='Gói:'
                        textLink={`${
                            investmentFund?.id === 1
                                ? 'QUỸ ĐẦU TƯ USD'
                                : 'QUỸ PHÁT TRIỂN NÔNG NGHIỆP'
                        }`}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='Thời gian gửi:'
                        textLink={dateFormat(sendingTime, 'DD/MM/YYYY')}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='Kỳ hạn:'
                        textLink={`${period} ${
                            investmentFund?.id === 1 ? 'tháng' : 'mùa'
                        }`}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='Vốn:'
                        textLink={formatVND(deposits || 0)}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='Giải ngân:'
                        textLink={formatVNDCurrency(
                            disbursement?.disbursement || 0
                        )}
                        marginLeft={0}
                        noneBorderBottom
                    />
                </Modal>
            )}
        </div>
    );
}
