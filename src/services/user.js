import { setData } from '../app/reducer';
import { routers } from '../routers';
import {
    userDelete,
    userGet,
    userPost,
    userPut,
} from '../utils/axios/axiosInstance';

// ADD PAYMENT USER
export const userAddPaymentSV = async (props = {}) => {
    const {
        id_user,
        account,
        bankName,
        name,
        setSnackbar,
        setisProcessModalReciving,
        setModalRecivingAccount,
        history,
        token,
    } = props;
    const resPut = await userPut(`addPayment/${id_user}`, {
        account,
        bankName,
        name,
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('userAddPaymentSV: ', resPut);
    switch (resPut.code) {
        case 0:
            setisProcessModalReciving(false);
            setModalRecivingAccount(false);
            setSnackbar({
                open: true,
                type: 'success',
                message:
                    resPut?.message || 'Thêm phương thức thanh toán thành công',
            });
            history(`${routers.providentFund}/${routers.profile}`);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setisProcessModalReciving(false);
            setModalRecivingAccount(false);
            setSnackbar({
                open: true,
                type: 'error',
                message:
                    resPut?.message || 'Thêm phương thức thanh toán thất bại',
            });
            break;
        default:
            break;
    }
};
// FORGOT PASSWORD USER
export const userForgotPwdSV = async (props = {}) => {
    const { email_user, setIsProcess, history, setSnackbar } = props;
    const resPost = await userPost(`forgotPassword/${email_user}`, {});
    // console.log('userForgotPwdSV: ', resPost);
    switch (resPost.code) {
        case 0:
            setIsProcess(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Gửi mã thành công, vui lòng kiểm tra email!',
            });
            history(routers.resetPwd);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            setSnackbar({
                open: true,
                type: 'error',
                message:
                    resPost?.message || 'Gửi mã thất bại, vui lòng thử lại!',
            });
            break;
        default:
            break;
    }
};
// OTP FORGOT PASSWORD USER
export const userOTPForgotPwdSV = async (props = {}) => {
    const { code, setSnackbar, setIsProcess, history } = props;
    const resGet = await userGet(`otpForGot/${code}`, {});
    console.log('userOTPForgotPwdSV: ', resGet);
    switch (resGet.code) {
        case 0:
            setIsProcess(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Xác thực thành công!',
            });
            history(routers.login);
            // toastShow(toast, resGet?.message || 'Xác thực thành công');
            // navigation.navigate(routersMain.Login);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            setSnackbar({
                open: true,
                type: 'error',
                message:
                    resGet?.message || 'Xác thực thất bại, vui lòng thử lại!',
            });
            break;
        default:
            break;
    }
};
// CREATE DEPOSITS
export const userCreateDepositsSV = async (props = {}) => {
    const {
        id_user,
        email_user,
        idPayment,
        amountVND,
        token,
        setIsProcessModalDeposits,
        setisModalUploadDeposits,
        setSnackbar,
        setDataReturn,
    } = props;
    const resPost = await userPost(`deposit/${id_user}`, {
        idPayment,
        status: 'Pending',
        amount: amountVND,
        note: `pc_${email_user}`,
        token: token,
    });
    // console.log('userCreateDepositsSV: ', resPost);
    switch (resPost.code) {
        case 0:
            setIsProcessModalDeposits(false);
            setisModalUploadDeposits(true);
            setDataReturn(resPost?.data);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Vui lòng tải lên hóa đơn thanh toán!',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessModalDeposits(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: resPost?.message || 'Tạo yêu cầu nạp tiền thất bại!',
            });
            break;
        default:
            break;
    }
};
// UPLOAD BILLS DEPOSITS
export const userUploadBillsDepositsSV = async (props = {}) => {
    const {
        id_deposits,
        image,
        token,
        setSnackbar,
        setIsProcessUploadDeposits,
        setisModalUploadDeposits,
        id_user,
        dispatch,
    } = props;
    const object = {
        statement: image[0],
    };
    const resPut = await userPut(
        `additionImageDeposit/${id_deposits}`,
        {
            ...object,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: token,
            },
        }
    );
    // console.log('userUploadBillsDepositsSV: ', resPut);
    switch (resPut.code) {
        case 0:
            const resGet = await userGet(`deposits/${id_user}`, {
                headers: {
                    token: token,
                },
            });
            dispatch(
                setData({
                    dataDepositsHistory: resGet?.data,
                })
            );
            setIsProcessUploadDeposits(false);
            setisModalUploadDeposits(false);
            setSnackbar({
                open: true,
                type: 'success',
                message:
                    'Tải hóa đơn nạp tiền thành công, vui lòng chờ người quản trị xác nhận!',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessUploadDeposits(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: resPut?.message || 'Tải hóa đơn nạp tiền thất bại!',
            });
            break;
        default:
            break;
    }
};
// GET ALL DEPOSITS BY USER
export const userGetDepositsByUserSV = async (props = {}) => {
    const { id_user, setSnackbar, token, dispatch } = props;
    const resGet = await userGet(`deposits/${id_user}`, {
        headers: {
            token: token,
        },
    });
    // console.log('userGetDepositsByUserSV: ', resGet);
    switch (resGet.code) {
        case 0:
            dispatch(
                setData({
                    dataDepositsHistory: resGet?.data,
                })
            );
            // setSnackbar({
            //     open: true,
            //     type: 'success',
            //     message: 'Tải dữ liệu thành công',
            // });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setSnackbar({
                open: true,
                type: 'error',
                message: resGet?.message || 'Tải dữ liệu thất bại',
            });
            break;
        default:
            break;
    }
};
// CREATE WITHDRAW
export const userCreateWithdrawSV = async (props = {}) => {
    const {
        id_user,
        email_user,
        amountVND,
        idPayment,
        setSnackbar,
        setIsProcessModalWithdraw,
        setModalVerifyWithdraw,
        token,
        setItemWithdraw,
    } = props;
    const resPost = await userPost(`withdraw/${id_user}`, {
        idPayment,
        status: 'Pending',
        amount: amountVND,
        note: `pc_${email_user}`,
        token: token,
    });
    // console.log('userCreateWithdrawSV: ', resPost);
    switch (resPost.code) {
        case 0:
            setItemWithdraw(resPost?.data);
            setIsProcessModalWithdraw(false);
            setModalVerifyWithdraw(true);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Vui lòng nhập mã xác thức rút tiền.',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessModalWithdraw(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: resPost?.message || 'Tạo yêu cầu rút tiền thất bại!',
            });
            break;
        default:
            break;
    }
};
// RESEND OTP WITHDRAW
export const userResendOtpWithdrawSV = async (props = {}) => {
    const { id_withdraw, setSnackbar, token, setIsProcessResendOTP } = props;
    const resPost = await userPost(`withdraw/otp/resend/${id_withdraw}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    console.log('userResendOtpWithdrawSV: ', resPost);
    switch (resPost.code) {
        case 0:
            setIsProcessResendOTP(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Gửi lại mã OTP thành công, vui lòng kiểm tra email!',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessResendOTP(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: resPost?.message || 'Gửi mã OTP thất bại!',
            });
            break;
        default:
            break;
    }
};
// CANCEL WITHDRAW
export const userCancelWithdrawSV = async (props = {}) => {
    const {
        id_withdraw,
        setSnackbar,
        token,
        setIsProcessCancelWithdraw,
        setModalVerifyWithdraw,
        id_user,
        dispatch,
    } = props;
    const resDel = await userDelete(`withdraw/cancel/${id_withdraw}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    console.log('userCancelWithdrawSV: ', resDel);
    switch (resDel.code) {
        case 0:
            const resGet = await userGet(`withdraws/${id_user}`, {
                headers: {
                    token: token,
                },
            });
            dispatch(
                setData({
                    dataWithdrawsHistory: resGet?.data,
                })
            );
            setIsProcessCancelWithdraw(false);
            setModalVerifyWithdraw(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Hủy yêu cầu rút tiền thành công!',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessCancelWithdraw(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: resDel?.message || 'Hủy yêu cầu rút tiền thất bại!',
            });
            break;
        default:
            break;
    }
};
// VERIFY WITHDRAW OTP
export const userVerifyWithdrawSV = async (props = {}) => {
    const {
        code,
        setSnackbar,
        token,
        setIsProcessModalWithdraw,
        setModalVerifyWithdraw,
        id_user,
        dispatch,
    } = props;
    const resGet = await userGet(`enterOtpWithdraw/${code}`, {
        headers: {
            token: token,
        },
    });
    // console.log('userVerifyWithdrawSV: ', resGet);
    switch (resGet.code) {
        case 0:
            const resGet = await userGet(`withdraws/${id_user}`, {
                headers: {
                    token: token,
                },
            });
            dispatch(
                setData({
                    dataWithdrawsHistory: resGet?.data,
                })
            );
            setIsProcessModalWithdraw(false);
            setModalVerifyWithdraw(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Xác thực rút tiền thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessModalWithdraw(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Xác thực rút tiền thất bại. Mã OTP sai',
            });
            break;
        default:
            break;
    }
};
// GET ALL WITHDRAWS BY USER
export const userGetWithdrawByUserSV = async (props = {}) => {
    const { id_user, setSnackbar, token, dispatch } = props;
    const resGet = await userGet(`withdraws/${id_user}`, {
        headers: {
            token: token,
        },
    });
    // console.log('userGetWithdrawByUserSV: ', resGet);
    switch (resGet.code) {
        case 0:
            dispatch(
                setData({
                    dataWithdrawsHistory: resGet?.data,
                })
            );
            // setSnackbar({
            //     open: true,
            //     type: 'success',
            //     message: 'Tải dữ liệu thành công',
            // });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setSnackbar({
                open: true,
                type: 'error',
                message: resGet?.message || 'Tải dữ liệu thất bại',
            });
            break;
        default:
            break;
    }
};
// CHANGE PASSWORD USER
export const userChangePasswordSV = async (props = {}) => {
    const {
        id_user,
        token,
        oldPassword,
        newPassword,
        setSnackbar,
        setisProcessModalPwd,
        setmodalChangePwd,
    } = props;
    const resPut = await userPut(`password/${id_user}`, {
        password: oldPassword,
        new_password: newPassword,
        headers: {
            token: token,
        },
    });
    console.log('userChangePasswordSV: ', resPut);
    switch (resPut.code) {
        case 0:
            setisProcessModalPwd(false);
            setmodalChangePwd(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Đổi mật khẩu thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setisProcessModalPwd(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: resPut?.message || 'Đổi mật khẩu thất bại',
            });
            break;
        default:
            break;
    }
};
// LẤY TỔNG TIỀN GIẢI NGÂN
export const userGetTotalMoneySV = async (props = {}) => {
    const {
        setSnackbar,
        typeContract,
        cycleContract,
        principalContract,
        setDisbursement,
        token,
    } = props;
    const resPost = await userPost('/disbursement/field', {
        typeContract,
        cycleContract,
        principalContract,
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('userGetTotalMoneySV: ', resPost);
    switch (resPost.code) {
        case 0:
            setDisbursement(resPost?.data);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setSnackbar({
                open: true,
                type: 'error',
                message: resPost?.message || 'Tính tiền giải ngân thất bại',
            });
            break;
        default:
            break;
    }
};
// THÊM HỢP ĐỒNG (CONTRACT)
export const userAddContractSV = async (props = {}) => {
    const {
        id_user,
        cycle,
        principal,
        type,
        timeSend,
        setSnackbar,
        setIsProcessSubmit,
        setIsModalSubmit,
        token,
        history,
    } = props;
    const resPost = await userPost(`addContract/${id_user}`, {
        cycle, // kỳ hạn
        principal, // số tiền gửi
        type, // quỹ
        day: timeSend, // thời gian gửi
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('userAddContractSV: ', resPost);
    switch (resPost.code) {
        case 0:
            setIsProcessSubmit(false);
            setIsModalSubmit(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Thêm hợp đồng thành công',
            });
            history(
                `${routers.providentFund}/${routers.fund}/${routers.managerFund}`
            );
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessSubmit(false);
            setIsModalSubmit(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: resPost?.message || 'Thêm hợp đồng thất bại',
            });
            break;
        default:
            break;
    }
};
// GET CONTRACT
export const userGetContractSV = async (props = {}) => {
    const { setSnackbar, token, id_user, setDataContract } = props;
    const resGet = await userGet(`contract/${id_user}`, {
        headers: {
            token: token,
        },
    });
    // console.log('userGetContractSV: ', resGet);
    switch (resGet.code) {
        case 0:
            setDataContract(resGet?.data);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setSnackbar({
                open: true,
                type: 'error',
                message: resGet?.message || 'Tải dữ liệu thất bại',
            });
            break;
        default:
            break;
    }
};
// LẤY TIỀN GIẢI NGÂN THEO ID CONTRACT
export const userGetDisbursementByIdContractSV = async (props = {}) => {
    const { id_contract, token, setSnackbar, setDisbursement } = props;
    const resGet = await userGet(`disbursement/${id_contract}`, {
        headers: {
            token: token,
        },
    });
    // console.log('userGetDisbursementByIdContractSV: ', resGet);
    switch (resGet.code) {
        case 0:
            setDisbursement((prev) => [...prev, resGet?.data]);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setSnackbar({
                open: true,
                type: 'error',
                message: resGet?.message || 'Tải dữ liệu thất bại',
            });
            break;
        default:
            break;
    }
};
// UPLOAD LICENSE USER
export const userUploadLicenseSV = async (props = {}) => {
    const {
        id_user,
        token,
        setSnackbar,
        imagePersonNationalityFont,
        imagePersonNationalityBeside,
        imageLicenseFont,
        imageLicenseBeside,
        setisProcessModalUpload,
        setModalUpload,
        setUploadCCCDFont,
        setUploadCCCDBeside,
        setUploadLicenseFont,
        setUploadLicenseBeside,
    } = props;
    const resPut = await userPut(
        `image/${id_user}`,
        {
            cccdFont: imagePersonNationalityFont,
            cccdBeside: imagePersonNationalityBeside,
            licenseFont: imageLicenseFont,
            licenseBeside: imageLicenseBeside,
            headers: {
                token: token,
            },
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: token,
            },
        }
    );
    // console.log('userUploadLicenseSV: ', resPut);
    switch (resPut.code) {
        case 0:
            setisProcessModalUpload(false);
            setModalUpload(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Cập nhật giấy tờ thành công!',
            });
            setUploadCCCDFont(null);
            setUploadCCCDBeside(null);
            setUploadLicenseFont(null);
            setUploadLicenseBeside(null);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setisProcessModalUpload(false);
            setSnackbar({
                open: true,
                type: 'error',
                message:
                    'Cập nhật giấy tờ thất bại. Vui lòng chọn lại tất cả 4 ảnh để cập nhật, xin cảm ơn!',
            });
            break;
        default:
            break;
    }
};
