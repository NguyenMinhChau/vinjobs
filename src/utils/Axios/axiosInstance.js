import axios from 'axios';

// AUTHENTICATION
export const authInstance = axios.create({
	baseURL: `${process.env.REACT_APP_URL_SERVER}auth/`,
	withCredentials: true,
});
export const authPost = async (path, options = {}, others = {}) => {
	const res = await authInstance.post(path, options, others);
	return res.data;
};
export const authGet = async (path, options = {}, others = {}) => {
	const res = await authInstance.get(path, options, others);
	return res.data;
};
// REFRESH TOKEN
export const refreshToken = async (path, options = {}, others = {}) => {
	const res = await authInstance.post(path, options, others);
	return res.data;
};
// ADMIN
export const adminInstance = axios.create({
	baseURL: `${process.env.REACT_APP_URL_SERVER}admin/`,
	withCredentials: true,
});
export const adminGet = async (path, options = {}, others = {}) => {
	const res = await adminInstance.get(path, options, others);
	return res.data;
};
export const adminPost = async (path, options = {}, others = {}) => {
	const res = await adminInstance.post(path, options, others);
	return res.data;
};
export const adminPut = async (path, options = {}, others = {}) => {
	const res = await adminInstance.put(path, options, others);
	return res.data;
};
export const adminPatch = async (path, options = {}, others = {}) => {
	const res = await adminInstance.patch(path, options, others);
	return res.data;
};
export const adminDelete = async (path, options = {}, others = {}) => {
	const res = await adminInstance.delete(path, options, others);
	return res.data;
};
// USERS
export const userInstance = axios.create({
	baseURL: `${process.env.REACT_APP_URL_SERVER}user/`,
	withCredentials: true,
});
export const userGet = async (path, options = {}, others = {}) => {
	const res = await userInstance.get(path, options, others);
	return res.data;
};
export const userPost = async (path, options = {}, others = {}) => {
	const res = await userInstance.post(path, options, others);
	return res.data;
};
export const userPut = async (path, options = {}, others = {}) => {
	const res = await userInstance.put(path, options, others);
	return res.data;
};
export const userDelete = async (path, options = {}, others = {}) => {
	const res = await userInstance.delete(path, options, others);
	return res.data;
};
