/* eslint-disable no-unused-vars */
import { adminGet } from '../utils/axios/axiosInstance';
import { actions } from '../app/';
// { headers: { Authorization: `Bearer ${token}` } },
// CONTENT JOBS
export const getAllJobContentSV = async (props = {}) => {
	const { setSnackbar, dispatch, state } = props;
	try {
		const resGet = await adminGet('post', {});
		dispatch(
			actions.setData({
				data: {
					...state.set.data,
					dataJobs: resGet?.metadata,
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
	const { id_post, setSnackbar, dispatch, state } = props;
	try {
		const resGet = await adminGet(`post/${id_post}`);
		dispatch(
			actions.setData({
				setItem: {
					...state.set.edit,
					dataItem: resGet?.metadata,
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
// CONTENT FORUM
export const getAllForumContentSV = async (props = {}) => {
	const { token, setSnackbar, dispatch, state } = props;
	try {
		const resGet = await adminGet(
			'forum',
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
					dataForum: resGet?.metadata,
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
export const getForumByIdSV = async (props = {}) => {
	const { id_post, setSnackbar, dispatch, state, token } = props;
	try {
		const resGet = await adminGet(
			`forum/${id_post}`,
			{},
			// { headers: { Authorization: `Bearer ${token}` } },
		);
		dispatch(
			actions.setData({
				setItem: {
					...state.set.edit,
					dataItem: resGet?.metadata,
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
