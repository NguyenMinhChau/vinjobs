/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useParams, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Icons, Image, SnackbarCp } from '../../components';
import moment from 'moment';
import {
	useAppContext,
	textUtils,
	refreshPage,
	numberUtils,
} from '../../utils';
import styles from './DepositsWithdrawDetail.module.css';

import {
	adminGetWithdrawByIdSV,
	adminGetDepositByIdSV,
	getDepositsWithdrawById,
	getPaymentByIds,
} from '../../services/admin';

const cx = className.bind(styles);

function DepositsWithdrawDetail() {
	const { idDeposits, idWithdraw } = useParams();
	const { state, dispatch } = useAppContext();
	const location = useLocation();
	const [withdrawValue, setWithdrawValue] = useState({});
	const [paymentUser, setPaymentUser] = useState(null);
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
	const {
		edit,
		data: { dataUser },
	} = state.set;
	useEffect(() => {
		document.title = `Chi tiết | ${process.env.REACT_APP_TITLE_WEB}`;
		getDepositsWithdrawById({
			state,
			dispatch,
			idDeposits,
			idWithdraw,
			setPaymentUser,
		});
	}, []);
	function ItemRender({
		title,
		info,
		bankInfo,
		methodBank,
		nameAccount,
		numberAccount,
	}) {
		return (
			<div className="detail-item">
				<div className="detail-title">{title}</div>
				<div className={`${cx('detail-status')}`}>
					{bankInfo ? (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-end',
							}}
						>
							<span className="info">
								{methodBank ? (
									methodBank
								) : (
									<Skeleton width={30} />
								)}
							</span>
							<span className="info">
								{nameAccount ? (
									nameAccount
								) : (
									<Skeleton width={30} />
								)}
							</span>
							<span className="info">
								{numberAccount ? (
									numberAccount
								) : (
									<Skeleton width={30} />
								)}
							</span>
						</div>
					) : (
						<span className="info">
							{info || info === 0 ? (
								info
							) : (
								<Skeleton width={30} />
							)}
						</span>
					)}
				</div>
			</div>
		);
	}
	const x = edit?.itemData;
	const username = dataUser?.metadata?.find((t) => t?._id === x.userId)
		?.payment.username;
	const email = dataUser?.metadata?.find((t) => t?._id === x.userId)?.payment
		.email;
	const infoUser = {
		name: username,
		email: email,
		bankName: paymentUser?.bank_name,
		accountNumber: paymentUser?.account_number,
		accountName: paymentUser?.account_name,
	};
	// console.log(paymentUser, x);
	return (
		<>
			<Button
				className="confirmbgc mb8"
				onClick={refreshPage.refreshPage}
			>
				<div className="flex-center">
					<Icons.RefreshIcon className="fz12 mr8" />
					<span className={`${cx('general-button-text')}`}>
						Tải lại trang
					</span>
				</div>
			</Button>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className={`${cx('info-container')}`}>
				<div className={`${cx('detail-container')}`}>
					<div className="detail-item">
						<div className="detail-title">Trạng thái</div>
						<div className={`${cx('detail-status')}`}>
							{x ? (
								<>
									<span
										className={`status fwb ${
											x.status
												.toLowerCase()
												.replace(' ', '') + 'bgc'
										}`}
									>
										{textUtils.FirstUpc(x.status)}
									</span>
								</>
							) : (
								<Skeleton width={50} />
							)}
						</div>
					</div>
					<ItemRender title="Họ và tên" info={infoUser?.name} />
					<ItemRender title="Email" info={infoUser?.email} />
					<ItemRender
						title={`Ngày ${idDeposits ? 'nạp' : 'rút'}`}
						info={
							x &&
							moment(x.createdAt).format('DD/MM/YYYY HH:mm:ss')
						}
					/>
					<ItemRender
						title={`Số tiền ${idDeposits ? 'nạp' : 'rút'}`}
						info={x && numberUtils.formatVND(x.amount)}
					/>
					<ItemRender
						title="Phương thức thanh toán"
						bankInfo
						methodBank={infoUser?.bankName}
						nameAccount={infoUser?.accountName}
						numberAccount={infoUser?.accountNumber}
					/>
					{idDeposits && (
						<ItemRender
							title="Hóa đơn"
							info={
								x && (
									<a
										href={`${process.env.REACT_APP_URL_SERVER}${x.statement}`}
										target="_blank"
									>
										{x.statement ? (
											x.statement.replace('/images/', '')
										) : (
											<Skeleton width="30px" />
										)}
									</a>
								)
							}
						/>
					)}
				</div>
				{idDeposits && (
					<div className={`${cx('detail-container')}`}>
						<div className={`${cx('document-review-container')}`}>
							<div className={`${cx('document-review-title')}`}>
								Xem hóa đơn
							</div>
							{x?.statement ? (
								<div className={`${cx('document-container')}`}>
									<Image
										src={`${process.env.REACT_APP_URL_SERVER}/${x?.statement}`}
										alt={x.statement.replace(
											'/images/',
											'',
										)}
										className={`${cx(
											'document-review-image',
										)}`}
									/>
								</div>
							) : (
								<Skeleton width="100%" height="200px" />
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default DepositsWithdrawDetail;
