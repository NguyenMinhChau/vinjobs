/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './JobsContent.module.css';
import { actions } from '../../app/';
import {
	deleteUtils,
	handleUtils,
	localStoreUtils,
	requestRefreshToken,
	useAppContext,
} from '../../utils';
import { getStore } from '../../utils/localStore/localStore';
import routers from '../../routers/routers';
import { ActionsTable, Icons, Modal, SnackbarCp } from '../../components';
import General from '../General/General';
import DataJobsContentHeader from '../../utils/FakeData/JobsContentHeader';
import LOGO_COMPANY from '../../assets/images/logo_company.png';
import moment from 'moment';
import { deleteJobContentSV, getAllJobContentSV } from '../../services/admin';

const cx = className.bind(styles);

function JobsContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		searchValues: { jobsContent },
		pagination: { page, show },
		data: { dataJobContent, dataUser },
	} = state.set;
	const { modalDelete } = state.toggle;
	const [isProcess, setIsProcess] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const getAllJobSV = (dataToken) => {
		getAllJobContentSV({
			token: dataToken?.token,
			setSnackbar,
			dispatch,
			state,
		});
	};
	useEffect(() => {
		requestRefreshToken(currentUser, getAllJobSV, state, dispatch, actions);
	}, []);
	// console.log(dataJobContent);
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	let showPage = 10;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	const dataJobsContentFlag = dataJobContent || [];
	const modalDeleteTrue = (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalDeleteFalse = (e) => {
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	const handleViewJobsContent = (item) => {
		dispatch(
			actions.setData({
				edit: {
					...state.set.edit,
					id: item._id || item.id,
					itemData: item,
				},
			}),
		);
	};
	const URL = process.env.REACT_APP_URL_IMAGE;
	const RenderBodyTable = ({ data }) => {
		return (
			<>
				{data.map((item, index) => {
					const username = dataUser?.filter((x) => {
						return item?.idUser === x?._id;
					})[0]?.username;
					return (
						<tr key={index}>
							<td>{handleUtils.indexTable(page, show, index)}</td>
							<td>{username}</td>
							<td className="item-w200">
								<div
									className={`${cx('content')}`}
									dangerouslySetInnerHTML={{
										__html: item?.content,
									}}
								></div>
							</td>
							<td className="item-w150">
								<img
									src={`${URL}${item?.thumbnail}`}
									alt=""
									onError={(e) =>
										(e.target.src = LOGO_COMPANY)
									}
									className={`${cx('thumbnail')}`}
								/>
							</td>
							<td>
								{moment(item?.createdAt).format(
									'DD/MM/YYYY HH:mm:ss',
								)}
							</td>
							<td>{item?.type}</td>
							<td>
								<ActionsTable
									view
									linkView={`${routers.content}/${routers.updatejobscontent}/${item?._id}`}
									onClickDel={async (e) => {
										modalDeleteTrue(e, item?._id);
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
									onClickView={() =>
										handleViewJobsContent(item)
									}
								></ActionsTable>
							</td>
						</tr>
					);
				})}
			</>
		);
	};
	const deleteJobContent = (dataToken, id) => {
		deleteJobContentSV({
			id_post: id,
			setSnackbar,
			dispatch,
			state,
			token: dataToken?.token,
			setIsProcess,
		});
	};
	const handleDelete = (id) => {
		requestRefreshToken(
			currentUser,
			deleteJobContent,
			state,
			dispatch,
			actions,
			id,
		);
	};
	return (
		<div className={`${cx('container')}`}>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<General
				className={cx('jobsContent')}
				valueSearch={jobsContent}
				nameSearch="jobsContent"
				textBtnNew="Tạo mới"
				linkCreate={`${routers.content}/${routers.createjobscontent}`}
				classNameButton={'probgc'}
				dataHeaders={DataJobsContentHeader(Icons).headers}
				totalData={dataJobsContentFlag?.length}
				dataPagiCus={dataJobsContentFlag?.filter((row, index) => {
					if (index + 1 >= start && index + 1 <= end) return true;
				})}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable
					data={dataJobsContentFlag?.filter((row, index) => {
						if (index + 1 >= start && index + 1 <= end) return true;
					})}
				/>
			</General>
			{modalDelete && (
				<Modal
					titleHeader="Xác nhận xóa nội dung"
					actionButtonText="Xóa"
					openModal={modalDeleteTrue}
					closeModal={modalDeleteFalse}
					classNameButton="cancelbgc"
					onClick={() => handleDelete(currentUser?.idUpdate)}
					isProcess={isProcess}
				>
					<p className="modal-delete-desc">
						Bạn có chắc muốn xóa nội dung này [
						{currentUser?.idUpdate}]?
					</p>
				</Modal>
			)}
		</div>
	);
}

export default JobsContent;
