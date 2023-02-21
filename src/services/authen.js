import { authGet, authPost } from '../utils/axios/axiosInstance';
import { routers } from '../routers/';
import {
    getStore,
    removeStore,
    setStore,
} from '../utils/localStore/localStore';
import { setData } from '../app/reducer';
// REGISTER USER
export const authRegisterSV = async (props = {}) => {
    const { email, password, username, history, setIsProcess, setSnackbar } =
        props;
    const resPost = await authPost('register', {
        email: email,
        password: password,
        username: username,
    });
    // console.log('authRegisterSV: ', resPost);
    switch (resPost.code) {
        case 0:
            setIsProcess(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: resPost?.message || 'Đăng ký thành công',
            });
            history(routers.login);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: resPost?.message || 'Đăng ký thất bại',
            });
            break;
        default:
            break;
    }
};
// LOGIN AUTHEN
export const authLoginSV = async (props = {}) => {
    const { email, password, setSnackbar, dispatch, history, setIsProcess } =
        props;
    const resPost = await authPost('login', {
        email: email,
        password: password,
    });
    // console.log('authLoginSV: ', resPost);
    switch (resPost.code) {
        case 0:
            await setStore({
                token: resPost?.data?.accessToken,
                username: resPost?.data?.user?.payment?.username,
                email: resPost?.data?.user?.payment?.email,
                rule: resPost?.data?.user?.payment.rule,
                rank: resPost?.data?.user?.rank,
                id: resPost?.data?.user?._id,
                balance: resPost?.data?.user?.Wallet?.balance,
            });
            await dispatch(
                setData({
                    currentUser: getStore(),
                })
            );
            setIsProcess(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: resPost?.message || 'Đăng nhập thành công',
            });
            history(routers.home);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: resPost?.message || 'Đăng nhập thất bại',
            });
            break;
        default:
            break;
    }
};
// LOGOUT AUTHEN
export const authLogoutSV = async (props = {}) => {
    const { id_user, history, setSnackbar, dispatch } = props;
    const resGet = await authGet(`logout/${id_user}`, {});
    // console.log('authLogoutSV: ', resGet);
    switch (resGet.code) {
        case 0:
            await removeStore();
            await dispatch(
                setData({
                    currentUser: getStore(),
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: resGet?.message || 'Đăng xuất thành công',
            });
            history(routers.home);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setSnackbar({
                open: true,
                type: 'error',
                message: resGet?.message || 'Đăng xuất thất bại',
            });
            break;
        default:
            break;
    }
};
