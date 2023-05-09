/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
	useAppContext,
	DataUsers,
	deleteUtils,
	handleUtils,
	requestRefreshToken,
	localStoreUtils,
	useDebounce,
} from '../../utils';
import { TrStatus } from '../../components/TableData/TableData';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import { General } from '../';
import {
	Modal,
	ActionsTable,
	SelectStatus,
	SnackbarCp,
} from '../../components';
import styles from './User.module.css';
import moment from 'moment';
import { getStore } from '../../utils/localStore/localStore';
import {
	deleteUserSV,
	getUsersSV,
	updateRankUserSV,
	updateRuleUserSV,
} from '../../services/admin';

const cx = className.bind(styles);
const DATA_USERS = DataUsers();

function User() {
	const { state, dispatch } = useAppContext();
	const { headers } = DATA_USERS;
	const {
		currentUser,
		statusUpdate,
		statusCurrent,
		data: { dataUser },
		pagination: { page, show },
		searchValues: { user },
	} = state.set;
	let showPage = 10;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const { modalDelete, modalStatus } = state.toggle;
	const [isProcess, setIsProcess] = useState(false);
	const [modalChangeRule, setModalChangeRule] = useState(false);
	const useDebounceUser = useDebounce(user, 1000);
	useEffect(() => {
		document.title = `Tài khoản | ${process.env.REACT_APP_TITLE_WEB}`;
		getUsersSV({
			state,
			dispatch,
			actions,
			setSnackbar,
			page,
			show,
			search: useDebounceUser,
		});
	}, [useDebounceUser, page, show]);
	let dataUserFlag = dataUser?.users || [];
	if (user) {
		dataUserFlag = dataUserFlag.filter((item) => {
			return (
				item.payment.username
					.toLowerCase()
					.includes(user.toLowerCase()) ||
				item.payment.email.toLowerCase().includes(user.toLowerCase()) ||
				item.payment.roles.toLowerCase().includes(user.toLowerCase()) ||
				item.rank.toLowerCase().includes(user.toLowerCase()) ||
				moment(item.createdAt)
					.format('DD/MM/YYYY HH:mm:ss')
					.toLowerCase()
					.includes(user.toLowerCase())
			);
		});
	}
	const toggleEditTrue = async (e, status, id) => {
		deleteUtils.statusTrue(e, status, id, dispatch, state, actions);
	};
	const toggleEditFalse = (e) => {
		return deleteUtils.statusFalse(e, dispatch, state, actions);
	};
	const modalDeleteTrue = (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalDeleteFalse = (e) => {
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	const toggleEditRuleTrue = async (e, status, id) => {
		setModalChangeRule(true);
		dispatch(
			actions.setData({
				...state.set,
				edit: { ...state.set.edit, id },
				statusCurrent: status,
			}),
		);
	};
	const toggleEditRuleFalse = async (e) => {
		await 1;
		setModalChangeRule(false);
		dispatch(
			actions.setData({
				...state.set,
				statusCurrent: '',
				statusUpdate: '',
			}),
		);
	};
	const handleViewUser = (item) => {
		dispatch(
			actions.setData({
				...state.set,
				edit: {
					...state.set.edit,
					id: item._id || item.id,
					itemData: item,
				},
			}),
		);
	};
	// Delete User + Update Status User
	const handleSendDel = (dataToken, id) => {
		deleteUserSV({
			id_user: id,
			dispatch,
			state,
			setSnackbar,
			token: dataToken?.token,
			setIsProcess,
			page,
			show,
			search: useDebounceUser,
		});
	};
	const deleteUser = async (id) => {
		await 1;
		setIsProcess(true);
		requestRefreshToken(
			currentUser,
			handleSendDel,
			state,
			dispatch,
			actions,
			id,
		);
	};
	const handleSendRank = (dataToken, id) => {
		updateRankUserSV({
			id_user: id,
			dispatch,
			state,
			setSnackbar,
			statusCurrent,
			statusUpdate,
			token: dataToken?.token,
			setIsProcess,
			page,
			show,
			search: useDebounceUser,
		});
	};
	const editRank = async (id) => {
		await 1;
		setIsProcess(true);
		requestRefreshToken(
			currentUser,
			handleSendRank,
			state,
			dispatch,
			actions,
			id,
		);
	};
	const handleSendRule = async (dataToken, id) => {
		updateRuleUserSV({
			id_user: id,
			dispatch,
			state,
			setSnackbar,
			statusCurrent,
			statusUpdate,
			token: dataToken?.token,
			setIsProcess,
			setModalChangeRule,
			page,
			show,
			search: useDebounceUser,
		});
	};
	const editRuleUser = async (id) => {
		await 1;
		setIsProcess(true);
		requestRefreshToken(
			currentUser,
			handleSendRule,
			state,
			dispatch,
			actions,
			id,
		);
	};
	function RenderBodyTable({ data }) {
		return (
			<>
				{data.map((item, index) => (
					<tr key={index}>
						<td className="upc">
							{handleUtils.indexTable(page, show, index)}
						</td>
						<td className="item-w200">
							{item.payment.username || <Skeleton width={50} />}
						</td>
						<td className="item-w200">
							{item.payment.email || <Skeleton width={50} />}
						</td>
						<td className="item-w150">
							{moment(item.createdAt).format(
								'DD/MM/YYYY HH:mm:ss',
							) || <Skeleton width={30} />}
						</td>
						<td>
							<TrStatus
								item={
									item.payment.roles.charAt(0).toUpperCase() +
									item.payment.roles.slice(1).toLowerCase()
								}
								onClick={async (e) => {
									toggleEditRuleTrue(
										e,
										item.payment.roles,
										item._id,
									);
									await localStoreUtils.setStore({
										...currentUser,
										idUpdate: item?._id,
									});
									await dispatch(
										actions.setData({
											currentUser: getStore(),
										}),
									);
								}}
							/>
						</td>
						<td>
							<TrStatus
								item={
									item.rank.charAt(0).toUpperCase() +
									item.rank.slice(1).toLowerCase()
								}
								onClick={async (e) => {
									toggleEditTrue(e, item.rank, item._id);
									await localStoreUtils.setStore({
										...currentUser,
										idUpdate: item?._id,
									});
									await dispatch(
										actions.setData({
											currentUser: getStore(),
										}),
									);
								}}
							/>
						</td>
						<td>
							<ActionsTable
								view
								linkView={`${routers.user}/${item._id}`}
								onClickView={() => handleViewUser(item)}
								onClickDel={async (e) => {
									modalDeleteTrue(e, item._id);
									await localStoreUtils.setStore({
										...currentUser,
										idUpdate: item?._id,
									});
									await dispatch(
										actions.setData({
											currentUser: getStore(),
										}),
									);
								}}
							></ActionsTable>
						</td>
					</tr>
				))}
			</>
		);
	}
	return (
		<>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<General
				className={cx('user')}
				valueSearch={user}
				nameSearch="user"
				dataHeaders={headers}
				dataFlag={dataUserFlag}
				totalData={dataUser?.total || dataUserFlag?.length}
				PaginationCus={!dataUser?.total}
				dataPagiCus={dataUserFlag}
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable data={dataUserFlag} />
			</General>
			{modalStatus && (
				<Modal
					titleHeader="Thay đổi hạng"
					actionButtonText="Gửi"
					openModal={toggleEditTrue}
					closeModal={toggleEditFalse}
					classNameButton="vipbgc"
					onClick={() => editRank(currentUser?.idUpdate)}
					isProcess={isProcess}
				>
					<p className="modal-delete-desc">
						Bạn có chắc thay đổi hạng tài khoản này [
						{currentUser?.idUpdate}]?
					</p>
					<SelectStatus rank />
				</Modal>
			)}
			{modalChangeRule && (
				<Modal
					titleHeader="Thay đổi quyền"
					actionButtonText="Gửi"
					openModal={toggleEditRuleTrue}
					closeModal={toggleEditRuleFalse}
					classNameButton="vipbgc"
					onClick={() => editRuleUser(currentUser?.idUpdate)}
					isProcess={isProcess}
				>
					<p className="modal-delete-desc">
						Bạn có chắc muốn thay đổi quyền tài khoản này [
						{currentUser?.idUpdate}]?
					</p>
					<SelectStatus ruleUser />
				</Modal>
			)}
			{modalDelete && (
				<Modal
					titleHeader="Xác nhận xóa"
					actionButtonText="Gửi"
					openModal={modalDeleteTrue}
					closeModal={modalDeleteFalse}
					classNameButton="cancelbgc"
					onClick={() => deleteUser(currentUser?.idUpdate)}
					isProcess={isProcess}
				>
					<p className="modal-delete-desc">
						Bạn có chắc muốn xóa tài khoản này [
						{currentUser?.idUpdate}]?
					</p>
				</Modal>
			)}
		</>
	);
}

export default User;
