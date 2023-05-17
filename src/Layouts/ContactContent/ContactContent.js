/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './ContactContent.module.css';
import { actions } from '../../app/';
import { getStore } from '../../utils/localStore/localStore';
import {
	deleteUtils,
	handleUtils,
	localStoreUtils,
	useAppContext,
} from '../../utils';
import routers from '../../routers/routers';
import { ActionsTable, Icons, SnackbarCp } from '../../components';
import { Modal } from '@mui/material';
import General from '../General/General';
import DataContactContentHeader from '../../utils/FakeData/ContactContentHeader';
import LOGO_COMPANY from '../../assets/images/logo_company.png';

const cx = className.bind(styles);

function ContactContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		searchValues: { contactContent },
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
	const dataContactContentFlag = [1, 2, 3, 4];
	const modalDeleteTrue = (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalDeleteFalse = (e) => {
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	const handleViewContactContent = (item) => {
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
									linkView={`${routers.content}/${routers.updatecontactcontent}/1`}
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
										handleViewContactContent(item)
									}
								></ActionsTable>
							</td>
						</tr>
					);
				})}
			</>
		);
	};
	const deleteContactContent = async (id) => {
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
				className={cx('contactContent')}
				valueSearch={contactContent}
				nameSearch="contactContent"
				textBtnNew="Tạo mới"
				linkCreate={`${routers.content}/${routers.createcontactcontent}`}
				classNameButton={'probgc'}
				dataHeaders={DataContactContentHeader(Icons).headers}
				totalData={dataContactContentFlag?.length}
				dataPagiCus={dataContactContentFlag}
				PaginationCus={true}
				startPagiCus={start}
				endPagiCus={end}
			>
				<RenderBodyTable data={dataContactContentFlag} />
			</General>
			{modalDelete && (
				<Modal
					titleHeader="Xác nhận xóa nội dung"
					actionButtonText="Xóa"
					openModal={modalDeleteTrue}
					closeModal={modalDeleteFalse}
					classNameButton="cancelbgc"
					onClick={() => deleteContactContent(currentUser?.idUpdate)}
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

export default ContactContent;
