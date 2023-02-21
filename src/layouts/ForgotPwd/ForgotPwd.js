/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ForgotPwd.module.css';
import { useAppContext } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import { setData } from '../../app/reducer';
import { routers } from '../../routers';
import { userForgotPwdSV } from '../../services/user';

const cx = className.bind(styles);

export default function ForgotPwd() {
    const { state, dispatch } = useAppContext();
    const { email } = state.set;
    const [isProcess, setIsProcess] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const history = useNavigate();
    useEffect(() => {
        document.title = `Quên mật khẩu | ${process.env.REACT_APP_TITLE_WEB}`;
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
    const handleForgot = async () => {
        await 1;
        setIsProcess(true);
        userForgotPwdSV({
            email_user: email,
            setIsProcess,
            setSnackbar,
            history,
        });
        dispatch(
            setData({
                email: '',
            })
        );
    };
    const onEnter = (e) => {
        handleForgot();
    };
    return (
        <Form
            titleForm='Quên mật khẩu'
            textBtn='Tiếp tục'
            onClick={handleForgot}
            bolEmail
            forgotPwdForm
            className={cx('form-page-forgot')}
            onEnter={onEnter}
            isProcess={isProcess}
            handleCloseSnackbar={handleClose}
            openSnackbar={snackbar.open}
            typeSnackbar={snackbar.type}
            messageSnackbar={snackbar.message}
        />
    );
}
