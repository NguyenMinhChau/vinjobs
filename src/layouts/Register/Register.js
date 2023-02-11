/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Register.module.css';
import { useAppContext } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import { setData } from '../../app/reducer';
import { routers } from '../../routers';
import { authRegisterSV } from '../../services/authen';

const cx = className.bind(styles);

export default function Register() {
    const { state, dispatch } = useAppContext();
    const { username, email, password } = state.set;
    const [isProcess, setIsProcess] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const history = useNavigate();
    useEffect(() => {
        document.title = `Đăng ký | ${process.env.REACT_APP_TITLE_WEB}`;
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
    const handleRegister = async () => {
        await 1;
        setIsProcess(true);
        setTimeout(() => {
            // setIsProcess(false);
            // console.log(username, email, password);
            authRegisterSV({
                email,
                password,
                username,
                history,
                setIsProcess,
                setSnackbar,
            });
            dispatch(
                setData({
                    username: '',
                    email: '',
                    password: '',
                })
            );
            // history(routers.login);
            // setSnackbar({
            //     open: true,
            //     type: 'success',
            //     message: 'Đăng ký thành công!',
            // });
        }, 3000);
    };
    const onEnter = (e) => {
        handleRegister();
    };
    return (
        <Form
            titleForm='Đăng ký'
            textBtn='Đăng ký'
            onClick={handleRegister}
            bolUsername
            bolEmail
            bolPassword
            registerForm
            className={cx('form-page-register')}
            isProcess={isProcess}
            onEnter={onEnter}
            handleCloseSnackbar={handleClose}
            openSnackbar={snackbar.open}
            typeSnackbar={snackbar.type}
            messageSnackbar={snackbar.message}
        ></Form>
    );
}
