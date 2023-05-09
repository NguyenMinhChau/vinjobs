/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './FinanceReportContent.module.css';
import { actions } from '../../app/';
import {
	deleteUtils,
	handleUtils,
	localStoreUtils,
	useAppContext,
} from '../../utils';
import { ActionsTable, Icons, Modal, SnackbarCp } from '../../components';
import routers from '../../routers/routers';
import { getStore } from '../../utils/localStore/localStore';
import DataFinanceReportContentHeader from '../../utils/FakeData/FinanceReportContentHeader';
import General from '../General/General';

const cx = className.bind(styles);

function FinanceReportContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		searchValues: { financeReportContent },
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
	const dataFinanceContentFlag = [1, 2, 3];
	const modalDeleteTrue = (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalDeleteFalse = (e) => {
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	const handleViewFinanceContent = (item) => {
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
							<td className="item-w200">Nội dung</td>
							<td className="item-w150">Hình ảnh</td>
							<td>
								<ActionsTable
									view
									linkView={`${routers.content}/${routers.updatefinancecontent}/1`}
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
										handleViewFinanceContent(item)
									}
								></ActionsTable>
							</td>
						</tr>
					);
				})}
			</>
		);
	};
	const deleteFinanceContent = async (id) => {
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
				className={cx('financeReportContent')}
				valueSearch={financeReportContent}
				nameSearch="financeReportContent"
				textBtnNew="Tạo mới"
				linkCreate={`${routers.content}/${routers.createfinancecontent}`}
				classNameButton={'probgc'}
				dataHeaders={DataFinanceReportContentHeader(Icons).headers}
				totalData={dataFinanceContentFlag?.length}
				dataPagiCus={dataFinanceContentFlag}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable data={dataFinanceContentFlag} />
			</General>
			{modalDelete && (
				<Modal
					titleHeader="Xác nhận xóa nội dung"
					actionButtonText="Xóa"
					openModal={modalDeleteTrue}
					closeModal={modalDeleteFalse}
					classNameButton="cancelbgc"
					onClick={() => deleteFinanceContent(currentUser?.idUpdate)}
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

export default FinanceReportContent;
