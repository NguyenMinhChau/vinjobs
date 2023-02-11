/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './SendFunds.module.css';
import {
    Button,
    FormInput,
    LoginRegisterCp,
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
import { formatVND } from '../../utils/format/FormatMoney';
import { dateFormat } from '../../utils/format/DateVN';
import moment from 'moment';
import {
    autoFormatNumberInputChange,
    convertNumberMultiple,
} from '../../utils/format/NumberFormat';

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
    useEffect(() => {
        document.title = `Gửi quỹ | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
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
    const handleSendFund = async () => {
        await 1;
        if (currentUser) {
            if (!period || !deposits || !investmentFund) {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'Vui lòng nhập đầy đủ thông tin',
                });
            } else if (sendingTime) {
                const dateNow = moment(new Date());
                const dateSending = moment(sendingTime);
                if (dateNow.isAfter(dateSending)) {
                    setSnackbar({
                        open: true,
                        type: 'error',
                        message: 'Thời gian gửi không hợp lệ',
                    });
                } else {
                    setIsProcessSendFund(true);
                    setTimeout(() => {
                        setSnackbar({
                            open: true,
                            type: 'success',
                            message: 'Chức năng đang phát triển',
                        });
                        setIsProcessSendFund(false);
                        console.log(
                            investmentFund,
                            dateFormat(sendingTime, 'DD/MM/YYYY'),
                            sendingTime,
                            period,
                            deposits
                        );
                        dispatch(
                            setData({
                                sendingTime: '',
                                period: '',
                                deposits: '',
                                investmentFund: '',
                            })
                        );
                    }, 3000);
                }
            } else {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'Thời gian gửi không hợp lệ',
                });
            }
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
                                unit={deposits && 'USD'}
                            />
                            {deposits && (
                                <div
                                    className={`${cx('money_vnd')} success fwb`}
                                >
                                    Số tiền gửi (VND):{' '}
                                    {formatVND(
                                        convertNumberMultiple(deposits, 23000)
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`${cx('list_info_item')}`}>
                        <div className={`${cx('menu_conatiner')}`}>
                            <FormInput
                                label='Tổng tiền giải ngân'
                                // value='123'
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
                                onClick={handleSendFund}
                                isProcess={isProcessSendFund}
                                disabled={isProcessSendFund}
                            >
                                Gửi
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
        </div>
    );
}
