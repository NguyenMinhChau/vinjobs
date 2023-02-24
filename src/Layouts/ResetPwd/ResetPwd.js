/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ResetPwd.module.css';
import { useNavigate } from 'react-router-dom';
import { setData } from '../../app/reducer';
import { useAppContext } from '../../utils';
import { Form } from '../../components';
import { userOTPForgotPwdSV } from '../../services/users';

const cx = className.bind(styles);

export default function ResetPwd() {
    const { state, dispatch } = useAppContext();
    const { otpCode } = state.set.form;
    const [isProcess, setIsProcess] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const history = useNavigate();
    useEffect(() => {
        document.title = `Xác thực OTP | ${process.env.REACT_APP_TITLE_WEB}`;
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
        await 1;
        setIsProcess(true);
        userOTPForgotPwdSV({
            code: otpCode,
            setIsProcess,
            setSnackbar,
            history,
        });
        dispatch(setData({ form: { otpCode: '' } }));
    };
    const onEnter = (e) => {
        handleSendOTP();
    };
    return (
        <Form
            titleForm='Xác thực OTP'
            textBtn='Gửi'
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
