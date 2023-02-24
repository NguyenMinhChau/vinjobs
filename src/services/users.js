import routers from '../routers/routers';

import { userGet, userPost } from '../utils/Axios/axiosInstance';
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
    // console.log('userOTPForgotPwdSV: ', resGet);
    switch (resGet.code) {
        case 0:
            setIsProcess(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Xác thực thành công!',
            });
            history(routers.login);
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
