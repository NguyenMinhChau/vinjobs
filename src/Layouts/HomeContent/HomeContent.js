/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './HomeContent.module.css';
import General from '../General/General';
import {
	deleteUtils,
	handleUtils,
	localStoreUtils,
	useAppContext,
} from '../../utils';
import { ActionsTable, Icons, Modal, SnackbarCp } from '../../components';
import DataHomeContentHeader from '../../utils/FakeData/HomeContentHeader';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import { getStore } from '../../utils/localStore/localStore';

const cx = className.bind(styles);

function HomeContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		searchValues: { homeContent },
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
	const dataHomeContentFlag = [1];
	const modalDeleteTrue = (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalDeleteFalse = (e) => {
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	const handleViewHomeContent = (item) => {
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
									linkView={`${routers.content}/${routers.updatehomecontent}/1`}
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
										handleViewHomeContent(item)
									}
								></ActionsTable>
							</td>
						</tr>
					);
				})}
			</>
		);
	};
	const deleteHomeContent = async (id) => {
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
				className={cx('homeContent')}
				valueSearch={homeContent}
				nameSearch="homeContent"
				textBtnNew="Tạo mới"
				linkCreate={`${routers.content}/${routers.createhomecontent}`}
				classNameButton={'probgc'}
				dataHeaders={DataHomeContentHeader(Icons).headers}
				totalData={dataHomeContentFlag?.length}
				dataPagiCus={dataHomeContentFlag}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable data={dataHomeContentFlag} />
			</General>
			{modalDelete && (
				<Modal
					titleHeader="Xác nhận xóa nội dung"
					actionButtonText="Xóa"
					openModal={modalDeleteTrue}
					closeModal={modalDeleteFalse}
					classNameButton="cancelbgc"
					onClick={() => deleteHomeContent(currentUser?.idUpdate)}
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

export default HomeContent;
