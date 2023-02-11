import { setData } from '../app/reducer';
import { adminGet } from '../utils/axios/axiosInstance';

// GET USER BY ID
export const adminGetUserByIdSV = async (props = {}) => {
    const { id_user, dispatch, setSnackbar } = props;
    const resGet = await adminGet(`user/${id_user}`, {});
    console.log('adminGetUserByIdSV: ', resGet);
    switch (resGet.code) {
        case 0:
            dispatch(
                setData({
                    userById: resGet?.data,
                })
            );
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setSnackbar({
                open: true,
                type: 'error',
                message: resGet?.message || 'Lấy thông tin thất bại',
            });
            break;
        default:
            break;
    }
};
