/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Deposits.module.css';
import {
    Button,
    CustomcareLine,
    FileUploadSingle,
    FormInput,
    FundMenuAndSlider,
    Image,
    LoginRegisterCp,
    Modal,
    SelectValueCp,
    SliderHeader,
    SnackbarCp,
} from '../../components';
import { useAppContext } from '../../utils';
import { setData } from '../../app/reducer';
import { dataBank } from '../../utils/dataBank';
import { formatUSD, formatVND } from '../../utils/format/FormatMoney';
import { dateFormat } from '../../utils/format/DateVN';
import {
    autoFormatNumberInputChange,
    convertNumberMultiple,
} from '../../utils/format/NumberFormat';

const cx = className.bind(styles);
const IMAGE_SLIDERS = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3VzdG9tZXIlMjBzZXJ2aWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
    },
];

export default function Deposits() {
    const { state, dispatch } = useAppContext();
    const { amountDeposits, bankDeposits, file, currentUser } = state.set;
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const [showSelect, setShowSelect] = useState(false);
    const [isProcessModalDeposits, setIsProcessModalDeposits] = useState(false);
    const [isProcessUploadDeposits, setIsProcessUploadDeposits] =
        useState(false);
    const [isModalUploadDeposits, setisModalUploadDeposits] = useState(false);
    const handleModalDepositsTrue = (e) => {
        e.stopPropagation();
        setisModalUploadDeposits(true);
    };
    const handleModalDepositsFalse = (e) => {
        e.stopPropagation();
        setisModalUploadDeposits(false);
        dispatch(
            setData({
                file: [],
                amountDeposits: '',
                bankDeposits: '',
            })
        );
    };
    useEffect(() => {
        document.title = `Nạp tiền | ${process.env.REACT_APP_TITLE_WEB}`;
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
    const handleSendDeposits = async () => {
        await 1;
        if (currentUser) {
            if (!amountDeposits || !bankDeposits) {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'Bạn chưa nhập đủ thông tin',
                });
            } else {
                setIsProcessModalDeposits(true);
                setTimeout(() => {
                    setIsProcessModalDeposits(false);
                    setisModalUploadDeposits(true);
                    console.log(amountDeposits, bankDeposits);
                }, 3000);
            }
        } else {
            setSnackbar({
                open: true,
                type: 'error',
                message: <LoginRegisterCp />,
            });
        }
    };
    const handleUploadBillDeposits = async () => {
        await 1;
        if (file.length === 0) {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Bạn chưa chọn file',
            });
        } else {
            setIsProcessUploadDeposits(true);
            setTimeout(() => {
                setIsProcessUploadDeposits(false);
                setisModalUploadDeposits(false);
                setSnackbar({
                    open: true,
                    type: 'success',
                    message: 'Chức năng đang phát triển!',
                });
                dispatch(
                    setData({
                        amountDeposits: '',
                        bankDeposits: '',
                        file: [],
                    })
                );
            }, 3000);
        }
    };
    const urlImageFile = file.length > 0 && URL.createObjectURL(file[0]);
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='NẠP'
                title2='TIỀN'
                animateName='animate__fadeInTopRight'
            />
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <div className={`${cx('body')}`}>
                <FundMenuAndSlider
                    imageSliders={IMAGE_SLIDERS}
                    title='Thông tin nạp'
                    nameIconTitle='fa-solid fa-hand-holding-dollar'
                    paddingBottom={'55%'}
                >
                    <div className={`${cx('desc_body')}`}>
                        <SelectValueCp
                            label='Tên ngân hàng thụ hưởng'
                            value={bankDeposits?.name}
                            placeholder='---'
                            data={dataBank}
                            nameSet='bankDeposits'
                            stateSelect={showSelect}
                            setStateSelect={setShowSelect}
                        />
                        <FormInput
                            label='Số tiền nạp'
                            placeholder='---'
                            value={amountDeposits}
                            name='amountDeposits'
                            onChange={(e) => {
                                dispatch(
                                    setData({
                                        amountDeposits:
                                            autoFormatNumberInputChange(
                                                e.target.value
                                            ),
                                    })
                                );
                            }}
                            unit={amountDeposits && 'VND'} // ₫
                        />
                        {/* {amountDeposits && bankDeposits && (
                            <div className={`${cx('money_vnd')} success fwb`}>
                                Số tiền nạp (VND):{' '}
                                {formatVND(
                                    convertNumberMultiple(amountDeposits, 23000)
                                )}
                            </div>
                        )} */}
                        <Button
                            className={`${cx('btn_submit')} successbgcbold`}
                            onClick={handleSendDeposits}
                            isProcess={isProcessModalDeposits}
                            disabled={isProcessModalDeposits}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </FundMenuAndSlider>
            </div>
            {isModalUploadDeposits && (
                <Modal
                    openModal={handleModalDepositsTrue}
                    closeModal={handleModalDepositsFalse}
                    titleHeader='Tải hóa đơn nạp tiền'
                    actionButtonText='Gửi'
                    classNameButton={`infobgc`}
                    isProcess={isProcessUploadDeposits}
                    onClick={handleUploadBillDeposits}
                >
                    <CustomcareLine
                        nameIcon='fa-solid fa-rotate-right'
                        colorIcon='success'
                        title='Trạng thái:'
                        textLink='Pending'
                    />
                    <CustomcareLine
                        nameIcon='fa-regular fa-clock'
                        colorIcon='info'
                        title='Ngày rút:'
                        textLink={dateFormat(new Date(), 'DD/MM/YYYY HH:mm:ss')}
                    />
                    {/* <CustomcareLine
                        nameIcon='fa-solid fa-money-check-dollar'
                        colorIcon='warning'
                        title='Số tiền rút (USD):'
                        textLink={formatUSD(amountDeposits)}
                    /> */}
                    <CustomcareLine
                        nameIcon='fa-solid fa-money-bill'
                        colorIcon='warning'
                        title='Số tiền rút:'
                        textLink={formatVND(amountDeposits)}
                    />
                    <CustomcareLine
                        nameIcon='fa fa-bank'
                        colorIcon='cancel'
                        title='Ngân hàng thụ hưởng:'
                        textLink='Vietcombank'
                    />
                    <FileUploadSingle label='Tải hình ảnh' />
                    {urlImageFile && (
                        <div className={`${cx('view_image')}`}>
                            <Image
                                src={urlImageFile}
                                alt='image_upload'
                                className={`${cx('image')}`}
                            />
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
}
