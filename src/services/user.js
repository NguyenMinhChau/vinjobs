import { routers } from '../routers';
import { userPut } from '../utils/axios/axiosInstance';

// ADD PAYMENT USER
export const userAddPaymentSV = async (props = {}) => {
    const {
        id_user,
        account,
        bankName,
        name,
        setSnackbar,
        setisProcessModalReciving,
        setModalRecivingAccount,
        history,
    } = props;
    const resPut = await userPut(`addPayment/${id_user}`, {
        account,
        bankName,
        name,
    });
    console.log('userAddPaymentSV: ', resPut);
    switch (resPut.code) {
        case 0:
            setisProcessModalReciving(false);
            setModalRecivingAccount(false);
            setSnackbar({
                open: true,
                type: 'success',
                message:
                    resPut?.message || 'Thêm phương thức thanh toán thành công',
            });
            history(`${routers.providentFund}/${routers.profile}`);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setisProcessModalReciving(false);
            setModalRecivingAccount(false);
            setSnackbar({
                open: true,
                type: 'error',
                message:
                    resPut?.message || 'Thêm phương thức thanh toán thất bại',
            });
            break;
        default:
            break;
    }
};
