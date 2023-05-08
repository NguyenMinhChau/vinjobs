/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Login.module.css';
import { useAppContext } from '../../utils';
import { routers } from '../../routers';
import { Form } from '../../components';
import { setData } from '../../app/reducer';
import MuiAlert from '@mui/material/Alert';
import { authLoginSV } from '../../services/authen';

const cx = className.bind(styles);
export default function Login() {
	const { state, dispatch } = useAppContext();
	const { email, password } = state.set;
	const [isProcess, setIsProcess] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const history = useNavigate();
	useEffect(() => {
		document.title = `Đăng nhập | ${process.env.REACT_APP_TITLE_WEB}`;
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
	const handleLogin = async () => {};
	const onEnter = (e) => {
		handleLogin();
	};
	return (
		<Form
			titleForm="Đăng nhập"
			textBtn="Đăng nhập"
			onClick={handleLogin}
			bolEmail
			bolPassword
			loginForm
			className={cx('form-page-login')}
			isProcess={isProcess}
			onEnter={onEnter}
			handleCloseSnackbar={handleClose}
			openSnackbar={snackbar.open}
			typeSnackbar={snackbar.type}
			messageSnackbar={snackbar.message}
		>
			<Link
				to={routers.forgotPwd}
				className={`${cx('login-forgotpwd-link')}`}
			>
				Quên mật khẩu?
			</Link>
		</Form>
	);
}
