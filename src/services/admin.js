/* eslint-disable no-unused-vars */
import { actions } from '../app/';
import {
	adminDelete,
	adminGet,
	adminPost,
	adminPut,
	userGet,
} from '../utils/Axios/axiosInstance';

export const getDepositsWithdrawById = async (props = {}) => {
	const {
		idDeposits,
		idWithdraw,
		dispatch,
		state,
		setSnackbar,
		setPaymentUser,
	} = props;
	try {
		if (idDeposits || idWithdraw) {
			const processUser = await adminGet('user');
			const process = await adminGet(
				idDeposits ? `deposit/${idDeposits}` : `withdraw/${idWithdraw}`,
			);
			const { metadata } = process;
			const resGet = await adminGet(
				`payment/${metadata?.idPayment || metadata?.paymentId}`,
				{},
			);
			if (setPaymentUser) {
				setPaymentUser(resGet?.metadata);
			}
			dispatch(
				actions.setData({
					edit: {
						...state.set.edit,
						itemData: metadata,
					},
					data: {
						...state.set.data,
						dataUser: processUser,
					},
				}),
			);
		}
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Đã xảy ra lỗi',
		});
	}
};
export const getUsdAgriById = async (props = {}) => {
	const { idContractUsd, idContractAgri, dispatch, state, setSnackbar } =
		props;
	try {
		if (idContractUsd || idContractAgri) {
			const processUser = await adminGet('user');
			const process = await adminGet(
				idContractUsd
					? `contract/${idContractUsd}`
					: `contract/${idContractAgri}`,
			);
			const { metadata } = process;
			dispatch(
				actions.setData({
					edit: {
						...state.set.edit,
						itemData: metadata,
					},
					data: {
						...state.set.data,
						dataUser: processUser,
					},
				}),
			);
		}
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Đã xảy ra lỗi',
		});
	}
};
export const deleteDepositsSV = async (props = {}) => {
	const { id_deposits, token, setSnackbar, dispatch, setIsProcess, state } =
		props;
	try {
		const resDel = await adminDelete(`deposit/${id_deposits}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		// console.log('deleteDepositsSV', resDel);
		const resGet = await adminGet('deposit', {});
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataDeposits: resGet?.metadata,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resDel?.message || 'Xóa thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa thất bại. Lỗi ${err?.response?.data?.message}`,
		});
	}
};
export const deleteWithdrawsSV = async (props = {}) => {
	const { id_withdraw, token, setSnackbar, dispatch, setIsProcess, state } =
		props;
	try {
		const resDel = await adminDelete(`withdraw/${id_withdraw}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		// console.log('deleteWithdrawsSV', resDel);
		const resGet = await adminGet('withdraw', {});
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataWithdraw: resGet?.metadata,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resDel?.message || 'Xóa thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa thất bại. Lỗi ${err?.response?.data?.message}`,
		});
	}
};
export const updateDepositsSV = async (props = {}) => {
	const {
		id_deposits,
		setIsProcess,
		state,
		token,
		dispatch,
		statusCurrent,
		statusUpdate,
		setSnackbar,
	} = props;
	try {
		const resPut = await adminPut(`deposit/${id_deposits}`, {
			token: token,
			status: statusUpdate || statusCurrent,
			header: {
				token: token,
			},
		});
		console.log('updateDepositsSV', resPut);
		const resGet = await adminGet('deposit', {});
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataDeposits: resGet?.metadata,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Cập nhật thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. ${err?.response?.data?.message}`,
		});
	}
};

export const handleDepositsSV = async (props = {}) => {
	const {
		id_deposits,
		setIsProcess,
		state,
		token,
		dispatch,
		statusCurrent,
		statusUpdate,
		setSnackbar,
	} = props;
	try {
		const resPut = await adminPut(`handle/deposit/${id_deposits}`, {
			token: token,
			status: statusUpdate || statusCurrent,
			header: {
				token: token,
			},
		});
		console.log('updateDepositsSV', resPut);
		const resGet = await adminGet('deposit', {});
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataDeposits: resGet?.metadata,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPut?.message || 'Cập nhật thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. ${err?.response?.data?.message}`,
		});
	}
};

export const updateWithdrawsSV = async (props = {}) => {
	const {
		id_withdraw,
		setIsProcess,
		state,
		token,
		dispatch,
		statusCurrent,
		statusUpdate,
		setSnackbar,
	} = props;
	try {
		const resPut = await adminPut(`withdraw/${id_withdraw}`, {
			token: token,
			status: statusUpdate || statusCurrent,
			header: {
				token: token,
			},
		});
		console.log('updateWithdrawsSV', resPut);
		const resGet = await adminGet('withdraw', {});
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataWithdraw: resGet?.metadata,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Cập nhật thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. ${err?.response?.data?.message}`,
		});
	}
};

export const handleWithdrawsSV = async (props = {}) => {
	const {
		id_withdraw,
		setIsProcess,
		state,
		token,
		dispatch,
		statusCurrent,
		statusUpdate,
		setSnackbar,
	} = props;
	try {
		const resPut = await adminPut(`handle/withdraw/${id_withdraw}`, {
			token: token,
			status: statusUpdate || statusCurrent,
			header: {
				token: token,
			},
		});
		// console.log('updateWithdrawsSV', resPut);
		const resGet = await adminGet('withdraw', {});
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataWithdraw: resGet?.metadata,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPut?.message || 'Cập nhật thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. ${err?.response?.data?.message}`,
		});
	}
};

export const getContractUSDSV = async (props = {}) => {
	const { dispatch, setSnackbar, state } = props;
	try {
		const resGet = await adminGet('contract', {});
		const processUser = await adminGet('user');
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataFundUsd: resGet?.metadata?.USDContract,
					dataUser: processUser,
				},
			}),
		);
	} catch (err) {
		console.log(err);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const deleteFundUSDsSV = async (props = {}) => {
	const { id_fund, token, setSnackbar, dispatch, setIsProcess, state } =
		props;
	try {
		const resDel = await adminDelete(`contract/${id_fund}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		console.log('deleteFundUSDsSV', resDel);
		const resGet = await adminGet('contract', {});
		const processUser = await adminGet('user');
		const data = resGet?.metadata?.filter((item) => item.type === 'USD');
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataFundUsd: data,
					dataUser: processUser,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Xóa thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const updateFundUsdSV = async (props = {}) => {
	const {
		id_fund,
		setIsProcess,
		state,
		token,
		dispatch,
		statusCurrent,
		statusUpdate,
		setSnackbar,
	} = props;
	try {
		const resPut = await adminPut(`contract/${id_fund}`, {
			token: token,
			status: statusUpdate || statusCurrent,
			header: {
				token: token,
			},
		});
		console.log('updateFundUsdSV', resPut);
		const resGet = await adminGet('contract', {});
		const processUser = await adminGet('user');
		const data = resGet?.metadata?.filter((item) => item.type === 'USD');
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataFundUsd: data,
					dataUser: processUser,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Cập nhật thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. ${err?.response?.data?.message}`,
		});
	}
};

export const handleFundUsdSV = async (props = {}) => {
	const {
		id_fund,
		setIsProcess,
		state,
		token,
		dispatch,
		statusCurrent,
		statusUpdate,
		setSnackbar,
	} = props;
	try {
		const resPut = await adminPut(`handle/contract/${id_fund}`, {
			token: token,
			status: statusUpdate || statusCurrent,
			header: {
				token: token,
			},
		});
		console.log('updateFundUsdSV', resPut);
		const resGet = await adminGet('contract', {});
		const processUser = await adminGet('user');
		const data = resGet?.metadata?.filter((item) => item.type === 'USD');
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataFundUsd: data,
					dataUser: processUser,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Cập nhật thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. ${err?.response?.data?.message}`,
		});
	}
};

export const getContractAgriSV = async (props = {}) => {
	const { dispatch, setSnackbar, state } = props;
	try {
		const resGet = await adminGet('contract', {});
		const processUser = await adminGet('user');
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataFundAgri: resGet?.metadata?.AGRICULTUREContract,
					dataUser: processUser,
				},
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const deleteFundAgrisSV = async (props = {}) => {
	const { id_fund, token, setSnackbar, dispatch, setIsProcess, state } =
		props;
	try {
		const resDel = await adminDelete(`contract/${id_fund}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		console.log('deleteFundAgriSV', resDel);
		const resGet = await adminGet('contract', {});
		const processUser = await adminGet('user');
		const data = resGet?.metadata?.filter(
			(item) => item.type === 'AGRICULTURE',
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataFundAgri: data,
					dataUser: processUser,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Xóa thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const updateFundAgriSV = async (props = {}) => {
	const {
		id_fund,
		setIsProcess,
		state,
		token,
		dispatch,
		statusCurrent,
		statusUpdate,
		setSnackbar,
	} = props;
	try {
		const resPut = await adminPut(`contract/${id_fund}`, {
			token: token,
			status: statusUpdate || statusCurrent,
			header: {
				token: token,
			},
		});
		console.log('updateFundAgriSV', resPut);
		const resGet = await adminGet('contract', {});
		const processUser = await adminGet('user');
		const data = resGet?.metadata?.filter(
			(item) => item.type === 'AGRICULTURE',
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataFundAgri: data,
					dataUser: processUser,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Cập nhật thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. ${err?.response?.data?.message}`,
		});
	}
};

export const handleFundAgriSV = async (props = {}) => {
	const {
		id_fund,
		setIsProcess,
		state,
		token,
		dispatch,
		statusCurrent,
		statusUpdate,
		setSnackbar,
	} = props;
	try {
		const resPut = await adminPut(`handle/contract/${id_fund}`, {
			token: token,
			status: statusUpdate || statusCurrent,
			header: {
				token: token,
			},
		});
		console.log('updateFundAgriSV', resPut);
		const resGet = await adminGet('contract', {});
		const processUser = await adminGet('user');
		const data = resGet?.metadata?.filter(
			(item) => item.type === 'AGRICULTURE',
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataFundAgri: data,
					dataUser: processUser,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: 'Cập nhật thành công',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. ${err?.response?.data?.message}`,
		});
	}
};

export const getDisbursementById = async (props = {}) => {
	const { setDisbursement, id_fund, setSnackbar, token } = props;
	try {
		const resGet = await userGet(`contract/disbursement/${id_fund}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		// console.log('getDisbursementById', resGet);
		setDisbursement(resGet?.metadata);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu giải ngân thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const getUsersSV = async (props = {}) => {
	const { dispatch, actions, state, setSnackbar, page, show, search } = props;
	try {
		const resGet = await adminGet(
			`paging/user?page=${page}&show=${show}&search=${search}`,
			{},
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataUser: resGet?.metadata,
				},
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu người dùng thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const updateRuleUserSV = async (props = {}) => {
	const {
		id_user,
		dispatch,
		state,
		setSnackbar,
		statusCurrent,
		statusUpdate,
		token,
		setIsProcess,
		setModalChangeRule,
		page,
		show,
		search,
	} = props;
	try {
		const resPut = await adminPut(`user/role/${id_user}`, {
			token: token,
			role: statusUpdate.toLowerCase() || statusCurrent.toLowerCase(),
			headers: {
				token: token,
			},
		});
		// console.log('updateRuleUserSV', resPut);
		const resGet = await adminGet(
			`paging/user?page=${page}&show=${show}&search=${search}`,
			{},
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataUser: resGet?.metadata,
				},
			}),
		);
		setIsProcess(false);
		setModalChangeRule(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPut?.message || 'Cập nhật quyền người dùng thành công.',
		});
	} catch (err) {
		setIsProcess(false);
		setModalChangeRule(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật quyền người dùng thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const updateRankUserSV = async (props = {}) => {
	const {
		id_user,
		dispatch,
		state,
		setSnackbar,
		statusCurrent,
		statusUpdate,
		token,
		setIsProcess,
		page,
		show,
		search,
	} = props;
	try {
		const resPut = await adminPut(`user/${id_user}`, {
			token: token,
			rank: statusUpdate || statusCurrent,
			headers: {
				token: token,
			},
		});
		// console.log('updateRankUserSV', resPut);
		const resGet = await adminGet(
			`paging/user?page=${page}&show=${show}&search=${search}`,
			{},
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataUser: resGet?.metadata,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPut?.message || 'Cập nhật hạng người dùng thành công.',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalStatus: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật hạng người dùng thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const deleteUserSV = async (props = {}) => {
	const {
		id_user,
		dispatch,
		state,
		setSnackbar,
		token,
		setIsProcess,
		page,
		show,
		search,
	} = props;
	try {
		const resDel = await adminDelete(`user/${id_user}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		// console.log('deleteUserSV', resDel);
		const resGet = await adminGet(
			`paging/user?page=${page}&show=${show}&search=${search}`,
			{},
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataUser: resGet?.metadata,
				},
			}),
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resDel?.message || 'Xóa người dùng thành công.',
		});
	} catch (err) {
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa người dùng thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const getUserByIdSV = async (props = {}) => {
	const { id_user, setSnackbar, token, setUserById, setPaymentUser } = props;
	try {
		const resGet = await adminGet(`user/${id_user}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		// console.log('getUserByIdSV', resGet);
		setUserById(resGet?.metadata);
		const resGetPayment = await adminGet(
			`payment/${resGet?.metadata?.payment?.bank}`,
			{},
		);
		if (setPaymentUser) {
			setPaymentUser(resGetPayment?.metadata);
		}
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const blockUserByEmailSV = async (props = {}) => {
	const {
		email_user,
		id_user,
		setUserById,
		setSnackbar,
		token,
		setIsProcessBlockUser,
	} = props;
	try {
		const resPut = await adminPut(`user/status/${id_user}`, {
			headers: {
				token: token,
			},
		});
		// console.log('blockUserByEmailSV', resPut);
		const resGet = await adminGet(`user/${id_user}`, {
			status: true,
			headers: {
				token: token,
			},
		});
		setUserById(resGet?.metadata);
		setIsProcessBlockUser(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPut?.message || 'Chặn tài khoản thành công.',
		});
	} catch (err) {
		setIsProcessBlockUser(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Chặn tài khoản thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const refreshPwdUserSV = async (props = {}) => {
	const {
		email_user,
		id_user,
		setUserById,
		setSnackbar,
		token,
		setIsProcessRefreshPwd,
	} = props;
	try {
		const resGet = await adminGet(`user/password/refresh/${email_user}`, {
			headers: {
				token: token,
			},
		});
		// console.log('refreshPwdUserSV', resGet);
		const resGetUser = await adminGet(`user/${id_user}`, {
			headers: {
				token: token,
			},
		});
		setUserById(resGetUser?.metadata);
		setIsProcessRefreshPwd(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: resGet?.message || 'Đặt lại mật khẩu thành công.',
		});
	} catch (err) {
		setIsProcessRefreshPwd(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đặt lại mật khẩu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const changePwdUserSV = async (props = {}) => {
	const {
		// email_user,
		id_user,
		password,
		setUserById,
		setSnackbar,
		token,
		setIsProcessChangePwd,
		dispatch,
	} = props;
	try {
		const resPut = await adminPut(`user/password/change/${id_user}`, {
			newPass: password,
			headers: {
				token: token,
			},
		});
		// console.log('changePwdUserSV', resPut);
		const resGet = await adminGet(`user/${id_user}`, {
			headers: {
				token: token,
			},
		});
		setUserById(resGet?.metadata);
		setIsProcessChangePwd(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPut?.message || 'Đổi mật khẩu thành công.',
		});
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
	} catch (err) {
		setIsProcessChangePwd(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Đổi mật khẩu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const adminGetAllDepositsSV = async (props = {}) => {
	const { dispatch, setSnackbar, page, show, search } = props;
	try {
		// const resGet = await adminGet(
		// 	`paging/deposit?page=${page}&show=${show}&search=${search}`,
		// 	{},
		// );
		const resGet = await adminGet(`deposit`, {});
		const resGetUser = await adminGet('user', {});
		dispatch(
			actions.setData({
				data: {
					...props.state.data,
					dataUser: resGetUser?.metadata,
					dataDeposits: resGet?.metadata,
				},
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại!',
		});
	}
};
export const adminGetAllWithdrawsSV = async (props = {}) => {
	const { dispatch, setSnackbar, page, show, search } = props;
	try {
		// const resGet = await adminGet(
		// 	`paging/withdraw?page=${page}&show=${show}&search=${search}`,
		// 	{},
		// );
		const resGet = await adminGet(`withdraw`, {});
		// console.log('adminGetAllWithdrawsSV: ', resGet);
		const resGetUser = await adminGet('user', {});
		dispatch(
			actions.setData({
				data: {
					dataUser: resGetUser?.metadata,
					dataWithdraw: resGet?.metadata,
				},
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại!',
		});
	}
};
//DASHBOARD SERVICES
export const dashboardServices = async (props = {}) => {
	const { dispatch, setSnackbar, token } = props;
	try {
		const resGet = await adminGet('total', {
			headers: { token: token },
		});
		dispatch(
			actions.setData({
				totalBalance: resGet?.metadata?.userHad?.totalBalance,
				totalDeposit: resGet?.metadata?.totalDeposit,
				totalWithdraw: resGet?.metadata?.totalWithdraw,
				dataUserBalance: resGet?.metadata?.userHad?.userHad,
			}),
		);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại!',
		});
	}
};

// ---
// ADD RATE
export const adminAddRateSV = async (props = {}) => {
	const { rate, setSnackbar } = props;
	try {
		const resPost = await adminPost('rate', {
			rate,
		});
		console.log('adminAddRateSV: ', resPost);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại!',
		});
	}
};
// GET RATE
export const adminGetRateSV = async (props = {}) => {
	const { setSnackbar, token, setRate } = props;
	try {
		const resGet = await adminGet(`rate`, {
			headers: { token: token },
		});
		setRate(resGet?.metadata);
		// console.log('adminGetRateSV: ', resGet);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại!',
		});
	}
};
// UPDATE RATE
export const adminUpdateRateSV = async (props = {}) => {
	const { id_rate, rate, setSnackbar, token } = props;
	try {
		const resPut = await adminPut(`rate/${id_rate}`, {
			rate: rate,
			headers: {
				token: token,
			},
		});
		// console.log('adminUpdateRateSV: ', resPut);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPut?.message || 'Cập nhật giá thành công',
		});
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Cập nhật giá thất bại!',
		});
	}
};
// DELETE RATE
export const adminDeleteRateSV = async (props = {}) => {
	const { id_rate, setSnackbar } = props;
	try {
		const resDelete = await adminDelete(`rate/${id_rate}`, {});
		console.log('adminDeleteRateSV: ', resDelete);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại!',
		});
	}
};
// ---
export const getPaymentByIds = async (props = {}) => {
	const { setSnackbar, id_payment, setPaymentUser } = props;
	try {
		const resGet = await adminGet(`payment/${id_payment}`, {});
		console.log('getPaymentByIds: ', resGet);
		setPaymentUser(resGet?.metadata);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải dữ liệu thất bại!',
		});
	}
};

export const uploadContractSV = async (props = {}) => {
	const {
		id_contract,
		setSnackbar,
		setIsProcess,
		token,
		statement,
		dispatch,
		state,
		setDisbursement,
	} = props;
	try {
		const resPut = await adminPut(
			`contract/image/${id_contract}`,
			{
				statement: statement,
				headers: {
					token: token,
				},
			},
			{
				headers: {
					token: token,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		console.log('uploadContractSV', resPut);
		const processUser = await adminGet('user');
		const process = await adminGet(`contract/${id_contract}`, {
			headers: { token: token },
		});
		const resGet = await userGet(`contract/disbursement/${id_contract}`, {
			token: token,
			headers: {
				token: token,
			},
		});
		setDisbursement(resGet?.metadata);
		const { metadata } = process;
		dispatch(
			actions.setData({
				edit: {
					...state.set.edit,
					itemData: metadata,
				},
				data: {
					...state.set.data,
					dataUser: processUser,
				},
			}),
		);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'success',
			message: resPut?.message || 'Tải thành công',
		});
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: err?.response?.data?.message || 'Tải thất bại',
		});
	}
};
