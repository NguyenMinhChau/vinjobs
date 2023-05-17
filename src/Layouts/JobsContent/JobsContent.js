/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './JobsContent.module.css';
import { actions } from '../../app/';
import {
	deleteUtils,
	handleUtils,
	localStoreUtils,
	useAppContext,
} from '../../utils';
import { getStore } from '../../utils/localStore/localStore';
import routers from '../../routers/routers';
import { ActionsTable, Icons, Modal, SnackbarCp } from '../../components';
import General from '../General/General';
import DataJobsContentHeader from '../../utils/FakeData/JobsContentHeader';
import LOGO_COMPANY from '../../assets/images/logo_company.png';

const cx = className.bind(styles);

function JobsContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		searchValues: { jobsContent },
		pagination: { page, show },
	} = state.set;
	const { modalDelete } = state.toggle;
	const [isProcess, setIsProcess] = useState(false);
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
	let showPage = 10;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	const dataJobsContentFlag = [1, 2];
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
	const RenderBodyTable = ({ data }) => {
		return (
			<>
				{data.map((item, index) => {
					return (
						<tr key={index}>
							<td>{handleUtils.indexTable(page, show, index)}</td>
							<td className="item-w200">
								<div
									className={`${cx('content')}`}
									dangerouslySetInnerHTML={{
										__html: `❤️<b>The first test verifies that the Counter component renders with a count of 0 by default. In the second test, we pass in a value of 1 for the initialCount prop and test whether the rendered count value is also 1.</b>. Finally, the third test checks whether the Counter component updates the count correctly after the increment button is clicked.`,
									}}
								></div>
							</td>
							<td className="item-w150">
								<img
									src=""
									alt=""
									onError={(e) =>
										(e.target.src = LOGO_COMPANY)
									}
									className={`${cx('thumbnail')}`}
								/>
							</td>
							<td>
								<ActionsTable
									view
									linkView={`${routers.content}/${routers.updatejobscontent}/1`}
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
	const deleteJobsContent = async (id) => {
		await 1;
		dispatch(
			actions.toggleModal({
				modalDelete: false,
			}),
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
				dataPagiCus={dataJobsContentFlag}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable data={dataJobsContentFlag} />
			</General>
			{modalDelete && (
				<Modal
					titleHeader="Xác nhận xóa nội dung"
					actionButtonText="Xóa"
					openModal={modalDeleteTrue}
					closeModal={modalDeleteFalse}
					classNameButton="cancelbgc"
					onClick={() => deleteJobsContent(currentUser?.idUpdate)}
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
