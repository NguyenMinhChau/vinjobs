/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import {
	FormInput,
	Button,
	Icons,
	Modal,
	Image,
	ModalViewImage,
	SnackbarCp,
} from '../../components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
	useAppContext,
	requestRefreshToken,
	textUtils,
	deleteUtils,
	formUtils,
	alertUtils,
	refreshPage,
	numberUtils,
} from '../../utils';
import { actions } from '../../app/';
import styles from './UserDetail.module.css';
import {
	blockUserByEmailSV,
	changePwdUserSV,
	getUserByIdSV,
	refreshPwdUserSV,
} from '../../services/admin';
import { checkPwd } from '../../utils/Validate';

const cx = className.bind(styles);

function UserDetail() {
	const { idUser } = useParams();
	const { state, dispatch } = useAppContext();
	const {
		edit,
		currentUser,
		form: { password },
	} = state.set;
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
	const { modalDelete } = state.toggle;
	const [userById, setUserById] = useState(null);
	const [isProcessChangePwd, setIsProcessChangePwd] = useState(false);
	const [isProcessBlockUser, setIsProcessBlockUser] = useState(false);
	const [isProcessRefreshPwd, setIsProcessRefreshPwd] = useState(false);
	const x = userById ? userById : edit?.itemData;
	// console.log(x);
	const handleSendUser = (dataToken) => {
		getUserByIdSV({
			id_user: idUser,
			setSnackbar,
			token: dataToken?.token,
			setUserById,
		});
	};
	useEffect(() => {
		document.title = `Chi tiết | ${process.env.REACT_APP_TITLE_WEB}`;
		requestRefreshToken(
			currentUser,
			handleSendUser,
			state,
			dispatch,
			actions,
		);
	}, []);
	const changeInput = (e) => {
		return formUtils.changeForm(e, dispatch, state, actions);
	};
	const modalChangePwdTrue = (e, id) => {
		return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
	};
	const modalChangePwdFalse = (e) => {
		dispatch(
			actions.setData({
				form: {
					...state.set.form,
					password: '',
				},
			}),
		);
		return deleteUtils.deleteFalse(e, dispatch, state, actions);
	};
	const handleSendChangePwd = (dataToken) => {
		changePwdUserSV({
			email_user: x?.email,
			id_user: x?._id,
			password: password,
			setUserById,
			setSnackbar,
			token: dataToken?.token,
			setIsProcessChangePwd,
			dispatch,
		});
	};
	const changePwd = (id) => {
		if (!checkPwd(password)) {
			alert(
				'Mật khẩu ít nhất 8 kí tự và bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một kí tự đặc biệt!',
			);
		} else {
			setIsProcessChangePwd(true);
			requestRefreshToken(
				currentUser,
				handleSendChangePwd,
				state,
				dispatch,
				actions,
			);
		}
	};
	const handleSendRefresh = (dataToken) => {
		refreshPwdUserSV({
			email_user: x.email,
			id_user: x._id,
			setIsProcessRefreshPwd,
			setUserById,
			setSnackbar,
			token: dataToken?.token,
		});
	};
	const refreshPwd = async (id) => {
		setIsProcessRefreshPwd(true);
		requestRefreshToken(
			currentUser,
			handleSendRefresh,
			state,
			dispatch,
			actions,
		);
	};
	const handleSendBlockUser = (dataToken) => {
		blockUserByEmailSV({
			email_user: x?.email,
			id_user: x._id,
			lock: !x?.lock,
			setIsProcessBlockUser,
			setUserById,
			setSnackbar,
			token: dataToken?.token,
		});
	};
	const onBlockAndUnblockUser = async () => {
		setIsProcessBlockUser(true);
		requestRefreshToken(
			currentUser,
			handleSendBlockUser,
			state,
			dispatch,
			actions,
		);
	};
	function ItemRender({ title, info, infoClass }) {
		return (
			<div className="detail-item">
				<div className="detail-title">{title}</div>
				<div className={`${cx('detail-status')}`}>
					<span className={`${infoClass} info`}>
						{info ? info : <Skeleton width={30} />}
					</span>
				</div>
			</div>
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
			<div className={`${cx('buySellDetail-container')}`}>
				<div className={`${cx('detail-container')}`}>
					<ItemRender title="Họ và tên" info={x && x.username} />
					<ItemRender title="Email" info={x && x.email} />
					<ItemRender
						title="Quyền"
						info={x && x.roles}
						infoClass="cancel"
					/>
					<ItemRender
						title="Ngày tạo"
						info={
							x &&
							moment(x.createdAt).format('DD/MM/YYYY HH:mm:ss')
						}
					/>
				</div>
				<div>
					<Button
						className={`${cx('button')} confirmbgc`}
						onClick={refreshPage.refreshPage}
					>
						<div className="flex-center">
							<Icons.RefreshIcon className="fz12 mr8" />
							<span className={`${cx('general-button-text')}`}>
								Tải lại trang
							</span>
						</div>
					</Button>
					<Button
						className={`${cx('button')} cancelbgc`}
						onClick={onBlockAndUnblockUser}
						isProcess={isProcessBlockUser}
						disabled={isProcessBlockUser}
					>
						<div className="flex-center">
							{!x?.lock ? (
								<Icons.BlockUserIcon />
							) : (
								<Icons.UnBlockUserIcon />
							)}{' '}
							<span className="ml8">
								{!x?.lock
									? 'Chặn tài khoản'
									: 'Bỏ chặn tài khoản'}
							</span>
						</div>
					</Button>
					<Button
						className={`${cx('button')} confirmbgc`}
						onClick={() => refreshPwd(idUser)}
						isProcess={isProcessRefreshPwd}
						disabled={isProcessRefreshPwd}
					>
						<div className="flex-center">
							<Icons.RefreshPageIcon />{' '}
							<span className="ml8">Đặt lại mật khẩu</span>
						</div>
					</Button>
					<Button
						className={`${cx('button')} completebgc`}
						onClick={(e) => modalChangePwdTrue(e, idUser)}
					>
						<div className="flex-center">
							<Icons.EditIcon />{' '}
							<span className="ml8">Đổi mật khẩu</span>
						</div>
					</Button>
				</div>
			</div>
			{modalDelete && (
				<Modal
					titleHeader="Thay đổi mật khẩu"
					actionButtonText="Gửi"
					closeModal={modalChangePwdFalse}
					openModal={modalChangePwdTrue}
					classNameButton="vipbgc"
					onClick={() => changePwd(idUser)}
					isProcess={isProcessChangePwd}
					disabled={!password}
				>
					<FormInput
						type="password"
						name="password"
						placeholder="Nhập mật khẩu mới"
						label="Mật khẩu"
						showPwd
						onChange={changeInput}
					/>
				</Modal>
			)}
		</>
	);
}

export default UserDetail;
