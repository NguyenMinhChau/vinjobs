/* eslint-disable no-unused-vars */
import { actions } from '../app/';
import routers from '../routers/routers';
import {
	adminDelete,
	adminGet,
	adminPatch,
	adminPost,
	adminPut,
	userGet,
} from '../utils/Axios/axiosInstance';

// ===================================
export const getUsersSV = async (props = {}) => {
	const { dispatch, actions, state, setSnackbar, page, show, search, token } =
		props;
	try {
		const resGet = await adminGet(
			`user`,
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
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
		const resPut = await adminPut(
			`user/${id_user}`,
			{
				roles:
					statusUpdate.toLowerCase() || statusCurrent.toLowerCase(),
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		// console.log('updateRuleUserSV', resPut);
		const resGet = await adminGet(`user`, {});
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
export const blockUserByEmailSV = async (props = {}) => {
	const {
		email_user,
		id_user,
		setUserById,
		setSnackbar,
		token,
		lock,
		setIsProcessBlockUser,
	} = props;
	try {
		const resPut = await adminPut(
			`user/${id_user}`,
			{
				lock: lock,
			},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		console.log('blockUserByEmailSV', resPut);
		const resGet = await adminGet(
			`user/${id_user}`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
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
export const getUserByIdSV = async (props = {}) => {
	const { id_user, setSnackbar, token, setUserById, setPaymentUser } = props;
	try {
		const resGet = await adminGet(
			`user/${id_user}`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		console.log('getUserByIdSV', resGet);
		setUserById(resGet?.metadata);
	} catch (err) {
		setSnackbar({
			open: true,
			type: 'error',
			message: `Tải dữ liệu thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const changePwdUserSV = async (props = {}) => {
	const {
		id_user,
		password,
		setUserById,
		setSnackbar,
		token,
		setIsProcessChangePwd,
		dispatch,
	} = props;
	try {
		const resPut = await adminPut(
			`user/${id_user}`,
			{
				password: password,
			},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		// console.log('changePwdUserSV', resPut);
		const resGet = await adminGet(
			`user/${id_user}`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
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
		const resGet = await adminGet(
			`user/password/refresh/${email_user}`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		console.log('refreshPwdUserSV', resGet);
		const resGetUser = await adminGet(
			`user/${id_user}`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
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
		const resDel = await adminDelete(
			`user/${id_user}`,
			{ headers: { Authorization: `Bearer ${token}` } },
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		const resGet = await adminGet(
			`user`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
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
		console.log(err);
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
export const getAllJobContentSV = async (props = {}) => {
	const { token, setSnackbar, dispatch, state } = props;
	try {
		const resGet = await adminGet(
			'post',
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		const resGetUser = await adminGet(
			`user`,
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataJobContent: resGet?.metadata,
					dataUser: resGetUser?.metadata,
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
export const getJobByIdSV = async (props = {}) => {
	const { id_post, setSnackbar, dispatch, state, token } = props;
	try {
		const resGet = await adminGet(
			`post/${id_post}`,
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		dispatch(
			actions.setData({
				editor: {
					title: resGet?.metadata?.post?.namePost,
					subTitle: resGet?.metadata?.post?.description,
					topic: { name: resGet?.metadata?.post?.type },
					salary: resGet?.metadata?.post?.wage,
					area: [...resGet?.metadata?.post?.location],
				},
				edit: {
					...state.set.edit,
					itemData: resGet?.metadata,
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
export const addJobContentSV = async (props = {}) => {
	const {
		id_user,
		setSnackbar,
		dispatch,
		state,
		token,
		title,
		desc,
		content,
		thumbnail,
		statements,
		type,
		wage,
		location,
		history,
		setIsProcess,
		editorJobsRef,
	} = props;
	try {
		const resPost = await adminPost(
			`post/${id_user}`,
			{
				namePost: title,
				description: desc,
				content: content,
				statements: statements,
				thumbnail: thumbnail,
				type: 'TUYEN_DUNG',
				wage: wage,
				location: location,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		setIsProcess(false);
		editorJobsRef.current.setContent('');
		dispatch(
			actions.setData({
				editor: { title: '', subTitle: '', topic: '', salary: '' },
			}),
		);
		alert(resPost?.message || 'Thêm thành công!');
		history(routers.content);
	} catch (err) {
		console.log(err);
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Thêm thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const deleteJobContentSV = async (props = {}) => {
	const { id_post, setSnackbar, dispatch, state, token, setIsProcess } =
		props;
	try {
		const resDel = await adminDelete(
			`post/${id_post}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const resGet = await adminGet(
			'post',
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		const resGetUser = await adminGet(
			`user`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		setIsProcess(false);
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
		);
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataJobContent: resGet?.metadata,
					dataUser: resGetUser?.metadata,
				},
			}),
		);
		setSnackbar({
			open: true,
			type: 'success',
			message: resDel?.message || 'Xóa thành công!',
		});
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Xóa thất bại. ${err?.response?.data?.message}`,
		});
	}
};
export const updateThumbnailSV = async (props = {}) => {
	const {
		id_post,
		setSnackbar,
		dispatch,
		state,
		setIsProcessThumbnail,
		token,
		thumbnail,
		history,
	} = props;
	try {
		const resPatch = await adminPatch(
			`post/${id_post}`,
			{
				thumbnail: thumbnail,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		setIsProcessThumbnail(false);
		alert(resPatch?.message || 'Cập nhật thành công!');
		history(routers.content);
	} catch (err) {
		setIsProcessThumbnail(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. Vui lòng tải lên ảnh có kích thước tối đa 1080x1080 ${err?.response?.data?.message}`,
		});
	}
};
export const updateJobContentSV = async (props = {}) => {
	const {
		id_post,
		setSnackbar,
		dispatch,
		state,
		setIsProcess,
		token,
		title,
		desc,
		content,
		wage,
		location,
		statements,
		type,
		history,
	} = props;
	console.log(props);
	try {
		const resPut = await adminPut(
			`post/${id_post}`,
			{
				namePost: title,
				description: desc,
				content: content,
				wage: wage,
				location: location,
				type: 'TUYEN_DUNG',
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		setIsProcess(false);
		alert(resPut?.message || 'Cập nhật thành công!');
		history(routers.content);
	} catch (err) {
		setIsProcess(false);
		setSnackbar({
			open: true,
			type: 'error',
			message: `Cập nhật thất bại. ${err?.response?.data?.message}`,
		});
	}
};

// ===================================
