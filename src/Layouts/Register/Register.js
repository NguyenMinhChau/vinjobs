/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useAppContext, axiosUtils } from '../../utils';
import { Form } from '../../components';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import styles from './Register.module.css';
import { authRegisterSV } from '../../services/authen';
import { checkEmail, checkPwd } from '../../utils/Validate';

const cx = className.bind(styles);

function Register() {
	const { state, dispatch } = useAppContext();
	const { email, password, username } = state.set.form;
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
	const history = useNavigate();
	useEffect(() => {
		document.title = `Đăng ký | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	const handleRegister = async (e) => {
		await 1;
		if (!email || !username || !password) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Vui lòng nhập đầy đủ thông tin!',
			});
		} else if (!checkPwd(password)) {
			setSnackbar({
				open: true,
				type: 'error',
				message:
					'Mật khẩu ít nhất 8 kí tự và bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một kí tự đặc biệt!',
			});
		} else if (!checkEmail(email)) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Email không hợp lệ!',
			});
		} else {
			setIsProcess(true);
			authRegisterSV({
				email,
				password,
				username,
				history,
				setIsProcess,
				setSnackbar,
			});
			dispatch(
				actions.setData({
					form: {
						email: '',
						password: '',
						username: '',
					},
				}),
			);
		}
	};
	const onEnter = (e) => {
		handleRegister(e);
	};

	return (
		<Form
			titleForm="Đăng ký"
			textBtn="Đăng ký"
			onClick={handleRegister}
			bolUsername
			bolEmail
			bolPassword
			registerForm
			className={cx('form-page-login')}
			isProcess={isProcess}
			onEnter={onEnter}
			handleCloseSnackbar={handleCloseSnackbar}
			openSnackbar={snackbar.open}
			typeSnackbar={snackbar.type}
			messageSnackbar={snackbar.message}
		/>
	);
}

export default Register;
