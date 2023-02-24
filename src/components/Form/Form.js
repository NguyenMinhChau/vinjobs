import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { Image, FormInput, Button, SnackbarCp } from '../../components';
import { useAppContext, formUtils } from '../../utils';
import { actions } from '../../app/';
import styles from './Form.module.css';
import { Link } from 'react-router-dom';
import routers from '../../routers/routers';

const cx = className.bind(styles);

function Form({
    titleForm,
    textBtn,
    onClick,
    onEnter,
    disabled,
    bolUsername,
    bolEmail,
    bolPassword,
    bolOtpCode,
    loginForm,
    registerForm,
    forgotPwdForm,
    resetPwdForm,
    isProcess,
    className,
    children,
    openSnackbar,
    handleCloseSnackbar,
    messageSnackbar,
    typeSnackbar,
}) {
    const { state, dispatch } = useAppContext();
    const { email, password, username, otpCode } = state.set.form;
    const classed = cx('form-container', className);
    const handleChange = (e) => {
        return formUtils.changeForm(e, dispatch, state, actions);
    };
    return (
        <div
            className={classed}
            style={{
                backgroundImage: 'url(/images/bg-login01.png)',
            }}
        >
            <div className={`${cx('form-container-main')}`}>
                <div className={`${cx('form-login')}`}>
                    <Image
                        src='/images/header-logo01.png'
                        alt='login-logo'
                        className={`${cx('form-logo')}`}
                    />
                    <SnackbarCp
                        openSnackbar={openSnackbar}
                        handleCloseSnackbar={handleCloseSnackbar}
                        messageSnackbar={messageSnackbar}
                        typeSnackbar={typeSnackbar}
                    />
                    <p className={`${cx('form-title')}`}>{titleForm}</p>
                    {bolUsername && (
                        <FormInput
                            label='Họ và tên'
                            type='text'
                            placeholder='Nhập họ và tên'
                            classNameField={`${cx('custom-field')}`}
                            value={username}
                            name='username'
                            onChange={handleChange}
                            onEnter={onEnter}
                        />
                    )}
                    {bolEmail && (
                        <FormInput
                            label='Email'
                            type='email'
                            placeholder='Nhập email'
                            classNameField={`${cx('custom-field')}`}
                            value={email}
                            name='email'
                            onChange={handleChange}
                            onEnter={onEnter}
                        />
                    )}
                    {bolOtpCode && (
                        <FormInput
                            label='Mã OTP'
                            type='text'
                            placeholder='Nhập mã OTP'
                            classNameField={`${cx('custom-field')}`}
                            value={otpCode}
                            name='otpCode'
                            onChange={handleChange}
                            onEnter={onEnter}
                        />
                    )}
                    {bolPassword && (
                        <FormInput
                            label='Mật khẩu'
                            type='password'
                            placeholder='Nhập mật khẩu'
                            classNameField={`${cx('custom-field')}`}
                            value={password}
                            name='password'
                            onChange={handleChange}
                            showPwd
                            onEnter={onEnter}
                        />
                    )}
                    {children}
                    <Button
                        isProcess={isProcess}
                        disabled={disabled}
                        className={`${cx('form-btn')}`}
                        onClick={onClick}
                    >
                        {textBtn}
                    </Button>
                    {(loginForm || registerForm) && (
                        <div className={`${cx('form-help')}`}>
                            <span>
                                {loginForm
                                    ? 'Bạn chưa có tài khoản?'
                                    : 'Bạn đã có một tài khoản?'}{' '}
                            </span>
                            <Link
                                className={`${cx('form-link')}`}
                                to={
                                    loginForm
                                        ? `${routers.register}`
                                        : `${routers.login}`
                                }
                            >
                                {loginForm ? 'Đăng ký' : 'Đăng nhập'}
                            </Link>
                        </div>
                    )}
                    {(forgotPwdForm || resetPwdForm) && (
                        <>
                            <div className={`${cx('form-help')}`}>
                                <span>Bạn đã có một tài khoản? </span>
                                <Link
                                    className={`${cx('form-link')}`}
                                    to={`${routers.login}`}
                                >
                                    Đăng nhập
                                </Link>
                            </div>
                            <div className={`${cx('form-help')}`}>
                                <span>Bạn chưa có tài khoản? </span>
                                <Link
                                    className={`${cx('form-link')}`}
                                    to={`${routers.register}`}
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

Form.propTypes = {
    titleForm: PropTypes.string,
    textBtn: PropTypes.string,
    onClick: PropTypes.func,
    bolUsername: PropTypes.bool,
    bolEmail: PropTypes.bool,
    bolPassword: PropTypes.bool,
    loginForm: PropTypes.bool,
    registerForm: PropTypes.bool,
    forgotPwdForm: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Form;
