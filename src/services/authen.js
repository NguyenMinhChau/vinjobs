import {
	getStore,
	removeStore,
	setStore,
} from '../utils/localStore/localStore';
import { setData } from '../app/reducer';
import routers from '../routers/routers';
import { authGet, authPost } from '../utils/Axios/axiosInstance';
// REGISTER USER
export const authRegisterSV = async (props = {}) => {
	const { email, password, username, history, setIsProcess, setSnackbar } =
		props;
	try {
		const resPost = await authPost('register/admin', {
			email: email,
			password: password,
			username: username,
		});
		console.log('authRegisterSV: ', resPost);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPost?.message || 'Đăng ký thành công',
		});
		history(routers.login);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Đăng ký thất bại',
		});
	}
};
// LOGIN AUTHEN
export const authLoginSV = async (props = {}) => {
	const { email, password, setSnackbar, dispatch, history, setIsProcess } =
		props;
	try {
		const resPost = await authPost('login', {
			username: email,
			password: password,
		});
		// console.log('authLoginSV: ', resPost);
		if (
			resPost?.metadata?.user?.payment.roles !== 'admin' &&
			resPost?.metadata?.user?.payment.roles !== 'manager'
		) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Tài khoản của bạn không có quyền truy cập',
			});
			setIsProcess(false);
			return;
		}
		await setStore({
			token: resPost?.metadata?.token,
			username: resPost?.metadata?.user?.payment?.username,
			email: resPost?.metadata?.user?.payment?.email,
			rule: resPost?.metadata?.user?.payment.roles,
			rank: resPost?.metadata?.user?.rank,
			id: resPost?.metadata?.user?._id,
			balance: resPost?.metadata?.user?.Wallet?.balance,
		});
		await dispatch(
			setData({
				currentUser: getStore(),
			}),
		);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPost?.message || 'Đăng nhập thành công',
		});
		history(routers.content);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Đăng nhập thất bại',
		});
	}
};
// LOGOUT AUTHEN
export const authLogoutSV = async (props = {}) => {
	const { id_user, history, setSnackbar, dispatch } = props;
	try {
		const resGet = await authGet(`logout/${id_user}`, {});
		console.log('authLogoutSV: ', resGet);
		await removeStore();
		await dispatch(
			setData({
				currentUser: getStore(),
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resGet?.message || 'Đăng xuất thành công',
		});
		history(routers.login);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Đăng xuất thất bại',
		});
	}
};
