/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import { useAppContext, axiosUtils, localStoreUtils } from '../../utils';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import styles from './Login.module.css';
import { authLoginSV } from '../../services/authen';

const cx = className.bind(styles);

function Login() {
    const { state, dispatch } = useAppContext();
    const { email, password } = state.set.form;
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
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
    const handleLogin = async (e) => {
        await 1;
        setIsProcess(true);
        authLoginSV({
            email,
            password,
            setSnackbar,
            dispatch,
            history,
            setIsProcess,
        });
    };
    const onEnter = (e) => {
        handleLogin(e);
    };
    return (
        <Form
            titleForm='Đăng nhập'
            textBtn='Đăng nhập'
            onClick={handleLogin}
            bolEmail
            bolPassword
            loginForm
            className={cx('form-page-login')}
            isProcess={isProcess}
            onEnter={onEnter}
            handleCloseSnackbar={handleCloseSnackbar}
            openSnackbar={snackbar.open}
            typeSnackbar={snackbar.type}
            messageSnackbar={snackbar.message}
        >
            <Link
                to={routers.forgotPwd}
                className={`${cx('login-forgotpwd-link')}`}
            >
                Forgot your password?
            </Link>
        </Form>
    );
}

export default Login;
