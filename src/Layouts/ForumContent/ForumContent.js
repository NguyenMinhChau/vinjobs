/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './ForumContent.module.css';
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
import General from '../General/General';
import DataForumContentHeader from '../../utils/FakeData/ForumContentHeader';
import LOGO_COMPANY from '../../assets/images/logo_company.png';
import moment from 'moment';

const cx = className.bind(styles);

function ForumContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		searchValues: { forumContent },
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
	const dataForumContentFlag = [1, 2, 3];
	const modalDeleteTrue = (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalDeleteFalse = (e) => {
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	const handleViewForumContent = (item) => {
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
							<td>NguyenMinhChau</td>
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
							<td className="item-w150">
								{moment(new Date()).format(
									'DD/MM/YYYY HH:mm:ss',
								)}
							</td>
							<td>TUYEN_DUNG</td>
							<td>
								<ActionsTable
									view
									linkView={`${routers.content}/${routers.updateforumcontent}/1`}
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
										handleViewForumContent(item)
									}
								></ActionsTable>
							</td>
						</tr>
					);
				})}
			</>
		);
	};
	const deleteRecuiterContent = async (id) => {
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
				className={cx('forumContent')}
				valueSearch={forumContent}
				nameSearch="forumContent"
				textBtnNew="Tạo mới"
				linkCreate={`${routers.content}/${routers.createforumcontent}`}
				classNameButton={'probgc'}
				dataHeaders={DataForumContentHeader(Icons).headers}
				totalData={dataForumContentFlag?.length}
				dataPagiCus={dataForumContentFlag}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable data={dataForumContentFlag} />
			</General>
			{modalDelete && (
				<Modal
					titleHeader="Xác nhận xóa nội dung"
					actionButtonText="Xóa"
					openModal={modalDeleteTrue}
					closeModal={modalDeleteFalse}
					classNameButton="cancelbgc"
					onClick={() => deleteRecuiterContent(currentUser?.idUpdate)}
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

export default ForumContent;
