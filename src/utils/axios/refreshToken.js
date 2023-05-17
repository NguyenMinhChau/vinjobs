import jwt_decode from 'jwt-decode';
import { refreshToken } from './axiosInstance';
import { getStore, setStore } from '../localStore/localStore';
import { routers } from '../../routers';

const requestRefreshToken = async (
	currentUser,
	handleFunc,
	state,
	dispatch,
	actions,
	id,
) => {
	try {
		const accessToken = currentUser?.token;
		if (accessToken) {
			const decodedToken = await jwt_decode(accessToken);
			const date = new Date();
			if (decodedToken.exp < date.getTime() / 1000) {
				const res = await refreshToken(
					`refreshToken/${currentUser?.email}`,
				);
				if (res?.status === 200) {
					const refreshUser = {
						...currentUser,
						token: res.metadata.toString(),
					};
					await setStore(refreshUser);
					dispatch(
						actions.setData({
							...state.set,
							currentUser: getStore(),
						}),
					);
					currentUser.token = `${res.metadata}`;
					handleFunc(refreshUser, id ? id : '');
					return refreshUser;
				} else {
					alert('Refresh token đã hết hạn, vui lòng đăng nhập lại');
					await setStore(null);
					window.location.href = routers.login;
				}
			} else {
				handleFunc(currentUser, id ? id : '');
				return currentUser;
			}
		}
	} catch (err) {
		console.log(err);
		alert(`Lỗi ${err?.response?.data?.message}`);
	}
};
export default requestRefreshToken;
