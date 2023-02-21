import jwt_decode from 'jwt-decode';
import { getStore, setStore } from '../localStore/localStore';
import { refreshToken } from './axiosInstance';

const requestRefreshToken = async (
    currentUser,
    handleFunc,
    state,
    dispatch,
    setData,
    setSnackbar,
    id
) => {
    try {
        const accessToken = currentUser?.token;
        if (accessToken) {
            const decodedToken = await jwt_decode(accessToken);
            const date = new Date();
            if (decodedToken.exp < date.getTime() / 1000) {
                const res = await refreshToken(
                    `refreshToken/${currentUser?.id}`
                );
                if (res.code === 0) {
                    const refreshUser = {
                        ...currentUser,
                        token: res.data.toString(),
                    };
                    await setStore(refreshUser);
                    dispatch(
                        setData({
                            currentUser: getStore(),
                        })
                    );
                    currentUser.token = `${res.data}`;
                    handleFunc(refreshUser, id ? id : '');
                    return refreshUser;
                } else {
                    setSnackbar({
                        open: true,
                        type: 'error',
                        message:
                            'Refresh token không tìm thấy. Vui lòng đăng xuất và đăng nhập lại, xin cảm ơn!',
                    });
                }
            } else {
                handleFunc(currentUser, id ? id : '');
                return currentUser;
            }
        }
    } catch (err) {
        console.log(err);
    }
};
export default requestRefreshToken;
