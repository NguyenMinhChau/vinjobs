/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import styles from './ForgotPwd.module.css';
import { useAppContext } from '../../utils';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import { userForgotPwdSV } from '../../services/users';

const cx = className.bind(styles);

function ForgotPwd() {
    const { state, dispatch } = useAppContext();
    const { email } = state.set.form;
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
        document.title = `Quên mật khẩu | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const handleForgot = async (e) => {
        await 1;
        setIsProcess(true);
        userForgotPwdSV({
            email_user: email,
            setIsProcess,
            setSnackbar,
            history,
        });
        dispatch(actions.setData({ form: { email: '' } }));
    };
    const onEnter = (e) => {
        handleForgot(e);
    };

    return (
        <Form
            titleForm='Quên mật khẩu'
            textBtn='Tiếp tục'
            onClick={handleForgot}
            bolEmail
            forgotPwdForm
            className={cx('form-page-login')}
            onEnter={onEnter}
            isProcess={isProcess}
            handleCloseSnackbar={handleCloseSnackbar}
            openSnackbar={snackbar.open}
            typeSnackbar={snackbar.type}
            messageSnackbar={snackbar.message}
        />
    );
}

export default ForgotPwd;