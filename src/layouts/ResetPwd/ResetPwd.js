/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ResetPwd.module.css';
import { useAppContext } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import { setData } from '../../app/reducer';
import { userOTPForgotPwdSV } from '../../services/user';

const cx = className.bind(styles);

export default function ResetPwd() {
	const { state, dispatch } = useAppContext();
	const { otpCode } = state.set;
	const [isProcess, setIsProcess] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const history = useNavigate();
	useEffect(() => {
		document.title = `Khôi phục tài khoản | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const handleSendOTP = async () => {
		/* TODO document why this async arrow function is empty */
	};
	const onEnter = (e) => {
		handleSendOTP();
	};
	return (
		<Form
			titleForm="Xác thực OTP"
			textBtn="Gửi"
			onClick={handleSendOTP}
			bolOtpCode
			forgotPwdForm
			className={cx('form-page-reset-password')}
			onEnter={onEnter}
			isProcess={isProcess}
			handleCloseSnackbar={handleClose}
			openSnackbar={snackbar.open}
			typeSnackbar={snackbar.type}
			messageSnackbar={snackbar.message}
		/>
	);
}
