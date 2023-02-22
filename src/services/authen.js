import { authGet, authPost } from '../utils/axios/axiosInstance';
import { setData } from '../app/reducer';

// REGISTER AUTHEN
export const authRegisterSV = async (props = {}) => {
    const { email, password, username, dispatch, state, setIsProcess } = props;
    const resPost = await authPost('register', {
        email: email,
        password: password,
        username: username,
    });
    console.log('authRegisterSV: ', resPost);
    switch (resPost.code) {
        case 0:
            setIsProcess(false);
            dispatch(
                setData({
                    form: {
                        ...state.set.form,
                        cre: resPost?.message || 'Đăng kí thành công',
                    },
                })
            );
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                setData({
                    form: {
                        ...state.set.form,
                        error: resPost?.message || 'Đăng kí thất bại',
                    },
                })
            );
            break;
        default:
            break;
    }
};
// LOGIN AUTHEN
export const authLoginSV = async (props = {}) => {
    const { email, password, dispatch, state, setIsProcess } = props;
    const resPost = await authPost('login', {
        email: email,
        password: password,
    });
    console.log('authLoginSV: ', resPost);
    switch (resPost.code) {
        case 0:
            setIsProcess(false);
            dispatch(
                setData({
                    form: {
                        ...state.set.form,
                        cre: resPost?.message || 'Đăng nhập thành công',
                    },
                })
            );
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                setData({
                    form: {
                        ...state.set.form,
                        error: resPost?.message || 'Đăng nhập thất bại',
                    },
                })
            );
            break;
        default:
            break;
    }
};
// LOGOUT AUTHEN
export const authLogoutSV = async (props = {}) => {
    const { id_user, dispatch, state, setIsProcess } = props;
    const resGet = await authGet(`logout/${id_user}`, {});
    console.log('authLogoutSV: ', resGet);
    switch (resGet.code) {
        case 0:
            setIsProcess(false);
            dispatch(
                setData({
                    form: {
                        ...state.set.form,
                        cre: resGet?.message || 'Đăng xuất thành công',
                    },
                })
            );
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                setData({
                    form: {
                        ...state.set.form,
                        error: resGet?.message || 'Đăng xuất thất bại',
                    },
                })
            );
            break;
        default:
            break;
    }
};
