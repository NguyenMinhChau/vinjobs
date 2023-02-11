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
                console.log('refreshToken', res);
                if (res.code === 0) {
                    const refreshUser = {
                        ...currentUser,
                        token: res.newtoken.toString(),
                    };
                    await setStore(refreshUser);
                    dispatch(
                        setData({
                            currentUser: getStore(),
                        })
                    );
                    currentUser.token = `${res.newtoken}`;
                    handleFunc(refreshUser, id ? id : '');
                    return refreshUser;
                } else {
                    setSnackbar({
                        open: true,
                        type: 'error',
                        message: 'RefreshToken not found- Please login again',
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
