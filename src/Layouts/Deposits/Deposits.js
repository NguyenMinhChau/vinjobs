/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import moment from 'moment';
import {
	useAppContext,
	DataDeposits,
	deleteUtils,
	handleUtils,
	localStoreUtils,
	numberUtils,
	requestRefreshToken,
	useDebounce,
} from '../../utils';
import {
	Icons,
	ActionsTable,
	Modal,
	SelectStatus,
	SnackbarCp,
} from '../../components';
import { actions } from '../../app/';
import routers from '../../routers/routers';
import { General } from '../';
import { TrObjectNoIcon, TrStatus } from '../../components/TableData/TableData';
import styles from './Deposits.module.css';
import Skeleton from 'react-loading-skeleton';
import {
	adminGetAllDepositsSV,
	deleteDepositsSV,
	updateDepositsSV,
	handleDepositsSV,
} from '../../services/admin';
import { getStore } from '../../utils/localStore/localStore';

const cx = className.bind(styles);

function Deposits() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		statusUpdate,
		statusCurrent,
		searchValues: { deposits },
		pagination: { page, show },
		data: { dataDeposits, dataUser },
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
	const { modalStatus, modalDelete } = state.toggle;
	const [isProcess, setIsProcess] = useState(false);
	const useDebounceDeposits = useDebounce(deposits, 1000);
	useEffect(() => {
		document.title = `Nạp tiền | ${process.env.REACT_APP_TITLE_WEB}`;
		adminGetAllDepositsSV({
			dispatch,
			state,
			setSnackbar,
			page,
			show,
			search: useDebounceDeposits,
		});
		dispatch(actions.setData({ pagination: { page: 1, show: 10 } }));
	}, [useDebounceDeposits]);
	let dataDepositsFlag = dataDeposits || [];
	if (deposits) {
		dataDepositsFlag = dataDepositsFlag.filter((item) => {
			return (
				numberUtils
					.formatVND(item?.amount)
					.replace(/\./g, '')
					.toLowerCase()
					.includes(deposits?.toLowerCase()) ||
				moment(item.createdAt)
					.format('DD/MM/YYYY HH:mm:ss')
					.toLowerCase()
					.includes(deposits?.toLowerCase()) ||
				item?.note.toLowerCase().includes(deposits?.toLowerCase()) ||
				item?.status.toLowerCase().includes(deposits?.toLowerCase())
			);
		});
	}
	// Modal
	const toggleEditTrue = async (e, status, id) => {
		deleteUtils.statusTrue(e, status, id, dispatch, state, actions);
	};
	const toggleEditFalse = (e) => {
		return deleteUtils.statusFalse(e, dispatch, state, actions);
	};
	const modalDeleteTrue = async (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalDeleteFalse = (e) => {
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	// Edit + Delete Deposits
	const handleSendDel = (dataToken, id) => {
		deleteDepositsSV({
			id_deposits: id,
			token: dataToken?.token,
			setSnackbar,
			setIsProcess,
			dispatch,
			state,
		});
	};
	const deleteDeposits = async (id) => {
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
	const handleEditStatus = async (dataToken, id) => {
		handleDepositsSV({
			id_deposits: id,
			setIsProcess,
			token: dataToken?.token,
			dispatch,
			statusCurrent,
			statusUpdate,
			setSnackbar,
			state,
		});
	};
	const editStatus = async (id) => {
		await 1;
		setIsProcess(true);
		requestRefreshToken(
			currentUser,
			handleEditStatus,
			state,
			dispatch,
			actions,
			id,
		);
	};
	const handleViewDeposits = (item) => {
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
	function RenderBodyTable({ data }) {
		return (
			<>
				{data.map((item, index) => {
					const username = (dataUser?.metadata || dataUser)?.find(
						(x) => x?._id === item.userId,
					)?.payment.username;
					const email = (dataUser?.metadata || dataUser)?.find(
						(x) => x?._id === item.userId,
					)?.payment.email;
					const infoUser = {
						name: username,
						email: email,
						path: `@${username?.replace(' ', '-')}`,
					};
					return (
						<tr key={index}>
							<td>{handleUtils.indexTable(page, show, index)}</td>
							<td className="item-w150">
								{numberUtils.formatVND(item?.amount)}
							</td>
							<td className="item-w200">
								{infoUser?.name ? (
									<TrObjectNoIcon item={infoUser} />
								) : (
									<Skeleton width="50px" />
								)}
							</td>
							<td className="item-w150">
								{moment(item.createdAt).format(
									'DD/MM/YYYY HH:mm:ss',
								)}
							</td>
							<td className="item-w200">
								{item.note || <Skeleton width="50px" />}
							</td>
							<td>
								<TrStatus
									item={item.status}
									onClick={async (e) => {
										toggleEditTrue(e, item.status, item.id);
										await localStoreUtils.setStore({
											...currentUser,
											idUpdate: item?.id,
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
									linkView={`${routers.deposits}/${item.id}`}
									onClickDel={async (e) => {
										modalDeleteTrue(e, item.id);
										await localStoreUtils.setStore({
											...currentUser,
											idUpdate: item?.id,
										});
										await dispatch(
											actions.setData({
												currentUser: getStore(),
											}),
										);
									}}
									onClickView={() => handleViewDeposits(item)}
								></ActionsTable>
							</td>
						</tr>
					);
				})}
			</>
		);
	}
	// console.log(dataDeposits);
	return (
		<>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<General
				className={cx('deposits')}
				valueSearch={deposits}
				nameSearch="deposits"
				dataHeaders={DataDeposits(Icons).headers}
				totalData={dataDepositsFlag?.length}
				dataPagiCus={dataDepositsFlag?.filter((row, index) => {
					if (index + 1 >= start && index + 1 <= end) return true;
				})}
				PaginationCus
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable
					data={dataDepositsFlag?.filter((row, index) => {
						if (index + 1 >= start && index + 1 <= end) return true;
					})}
				/>
			</General>
			{modalStatus && (
				<Modal
					titleHeader="Thay đổi trạng thái"
					actionButtonText="Gửi"
					openModal={toggleEditTrue}
					closeModal={toggleEditFalse}
					classNameButton="vipbgc"
					onClick={() => editStatus(currentUser?.idUpdate)}
					isProcess={isProcess}
				>
					<p className="modal-delete-desc">
						Bạn có chắc muốn thay đổi trạng thái [
						{currentUser?.idUpdate}]?
					</p>
					<SelectStatus />
				</Modal>
			)}
			{modalDelete && (
				<Modal
					titleHeader="Xác nhận xóa"
					actionButtonText="Gửi"
					openModal={modalDeleteTrue}
					closeModal={modalDeleteFalse}
					classNameButton="cancelbgc"
					onClick={() => deleteDeposits(currentUser?.idUpdate)}
					isProcess={isProcess}
				>
					<p className="modal-delete-desc">
						Bạn có chắc muốn xóa [{currentUser?.idUpdate}]?
					</p>
				</Modal>
			)}
		</>
	);
}

export default Deposits;
