import routers from '../routers/routers';

import { userGet } from '../utils/Axios/axiosInstance';
// FORGOT PASSWORD USER
export const userForgotPwdSV = async (props = {}) => {
	const { email_user, setIsProcess, history, setSnackbar } = props;
	try {
		const resGet = await userGet(`forgot/password/${email_user}`, {});
		console.log('userForgotPwdSV: ', resGet);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Gửi mã thành công, vui lòng kiểm tra email!',
		});
		history(routers.resetPwd);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message:
				err?.response?.data?.message ||
				'Gửi mã thất bại, vui lòng thử lại!',
		});
	}
};
// OTP FORGOT PASSWORD USER
export const userOTPForgotPwdSV = async (props = {}) => {
	const { code, setSnackbar, setIsProcess, history } = props;
	try {
		const resGet = await userGet(`otpForGot/${code}`, {});
		console.log('userOTPForgotPwdSV: ', resGet);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Xác thực thành công!',
		});
		history(routers.login);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message:
				err?.response?.data?.message ||
				'Xác thực thất bại, vui lòng thử lại!',
		});
	}
};
