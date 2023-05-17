import { authPost } from '../utils/axios/axiosInstance';
import { actions } from '../app/';
import { routers } from '../routers';
import {
	setStore,
	getStore,
	removeStore,
} from '../utils/localStore/localStore';

// REGISTER USER
export const authRegisterSV = async (props = {}) => {
	const { email, password, username, history, setIsProcess, setSnackbar } =
		props;
	try {
		const resPost = await authPost('register', {
			email: email,
			password: password,
			username: username,
		});
		// console.log('authRegisterSV: ', resPost);
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
		await setStore({
			token: resPost?.metadata?.token,
			username: resPost?.metadata?.user?.username,
			email: resPost?.metadata?.user?.email,
			rule: resPost?.metadata?.user?.roles,
			id: resPost?.metadata?.user?._id,
		});
		await dispatch(
			actions.setData({
				currentUser: getStore(),
			}),
		);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPost?.message || 'Đăng nhập thành công',
		});
		history(routers.home);
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
	const { email_user, history, setSnackbar, dispatch } = props;
	try {
		const resGet = await authPost(`logout/${email_user}`, {});
		// console.log('authLogoutSV: ', resGet);
		await removeStore();
		await dispatch(
			actions.setData({
				currentUser: getStore(),
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resGet?.message || 'Đăng xuất thành công',
		});
		history(routers.home);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Đăng xuất thất bại',
		});
	}
};
