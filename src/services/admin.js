import { actions } from '../app/';
import {
    adminDelete,
    adminGet,
    adminPost,
    adminPut,
    userGet,
} from '../utils/Axios/axiosInstance';

export const getDepositsWithdrawById = async (props = {}) => {
    const { idDeposits, idWithdraw, dispatch, state } = props;
    if (idDeposits || idWithdraw) {
        const processUser = await adminGet('/allUsers');
        const process = await adminGet(
            idDeposits ? `/deposit/${idDeposits}` : `/withdraw/${idWithdraw}`
        );
        const { data } = process;
        dispatch(
            actions.setData({
                edit: {
                    ...state.set.edit,
                    itemData: data,
                },
                data: {
                    ...state.set.data,
                    dataUser: processUser,
                },
            })
        );
    }
};
export const getUsdAgriById = async (props = {}) => {
    const { idContractUsd, idContractAgri, dispatch, state } = props;
    if (idContractUsd || idContractAgri) {
        const processUser = await adminGet('/allUsers');
        const process = await adminGet(
            idContractUsd
                ? `/contract/${idContractUsd}`
                : `/contract/${idContractAgri}`
        );
        const { data } = process;
        dispatch(
            actions.setData({
                edit: {
                    ...state.set.edit,
                    itemData: data,
                },
                data: {
                    ...state.set.data,
                    dataUser: processUser,
                },
            })
        );
    }
};
export const deleteDepositsSV = async (props = {}) => {
    const { id_deposits, token, setSnackbar, dispatch, setIsProcess, state } =
        props;
    const resDel = await adminDelete(`deleteDeposit/${id_deposits}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('deleteDepositsSV', resDel);
    switch (resDel.code) {
        case 0:
            const resGet = await adminGet('deposits', {});
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataDeposits: resGet?.data,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Xóa thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Xóa thất bại. ${resDel.message}`,
            });
            break;
        default:
            break;
    }
};
export const deleteWithdrawsSV = async (props = {}) => {
    const { id_withdraw, token, setSnackbar, dispatch, setIsProcess, state } =
        props;
    const resDel = await adminDelete(`deleteWithdraw/${id_withdraw}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('deleteWithdrawsSV', resDel);
    switch (resDel.code) {
        case 0:
            const resGet = await adminGet('withdraws', {});
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataWithdraw: resGet?.data,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Xóa thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Xóa thất bại. ${resDel.message}`,
            });
            break;
        default:
            break;
    }
};
export const updateDepositsSV = async (props = {}) => {
    const {
        id_deposits,
        setIsProcess,
        state,
        token,
        dispatch,
        statusCurrent,
        statusUpdate,
        setSnackbar,
    } = props;
    const resPut = await adminPut(`updateDeposit/${id_deposits}`, {
        token: token,
        status: statusUpdate || statusCurrent,
        header: {
            token: token,
        },
    });
    // console.log('updateDepositsSV', resPut);
    switch (resPut.code) {
        case 0:
            const resGet = await adminGet('deposits', {});
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataDeposits: resGet?.data,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Cập nhật thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Cập nhật thất bại. ${
                    resPut?.message || resPut.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const updateWithdrawsSV = async (props = {}) => {
    const {
        id_withdraw,
        setIsProcess,
        state,
        token,
        dispatch,
        statusCurrent,
        statusUpdate,
        setSnackbar,
    } = props;
    const resPut = await adminPut(`updateWithdraw/${id_withdraw}`, {
        token: token,
        status: statusUpdate || statusCurrent,
        header: {
            token: token,
        },
    });
    // console.log('updateWithdrawsSV', resPut);
    switch (resPut.code) {
        case 0:
            const resGet = await adminGet('withdraws', {});
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataWithdraw: resGet?.data,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Cập nhật thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Cập nhật thất bại. ${
                    resPut?.message || resPut.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const getContractUSDSV = async (props = {}) => {
    const { dispatch, setSnackbar, state } = props;
    const resGet = await adminGet('contracts', {});
    const processUser = await adminGet('/allUsers');
    const data = resGet?.data?.filter((item) => item.type === 'USD');
    switch (resGet.code) {
        case 0:
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataFundUsd: data,
                        dataUser: processUser,
                    },
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
                message: `Tải dữ liệu thất bại. ${
                    resGet?.message || resGet.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const deleteFundUSDsSV = async (props = {}) => {
    const { id_fund, token, setSnackbar, dispatch, setIsProcess, state } =
        props;
    const resDel = await adminDelete(`contract/${id_fund}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('deleteFundUSDsSV', resDel);
    switch (resDel.code) {
        case 0:
            const resGet = await adminGet('contracts', {});
            const processUser = await adminGet('/allUsers');
            const data = resGet?.data?.filter((item) => item.type === 'USD');
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataFundUsd: data,
                        dataUser: processUser,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Xóa thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Xóa thất bại. ${resDel.message}`,
            });
            break;
        default:
            break;
    }
};
export const updateFundUsdSV = async (props = {}) => {
    const {
        id_fund,
        setIsProcess,
        state,
        token,
        dispatch,
        statusCurrent,
        statusUpdate,
        setSnackbar,
    } = props;
    const resPut = await adminPut(`contract/${id_fund}`, {
        token: token,
        status: statusUpdate || statusCurrent,
        header: {
            token: token,
        },
    });
    // console.log('updateFundUsdSV', resPut);
    switch (resPut.code) {
        case 0:
            const resGet = await adminGet('contracts', {});
            const processUser = await adminGet('/allUsers');
            const data = resGet?.data?.filter((item) => item.type === 'USD');
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataFundUsd: data,
                        dataUser: processUser,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Cập nhật thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Cập nhật thất bại. ${
                    resPut?.message || resPut.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const getContractAgriSV = async (props = {}) => {
    const { dispatch, setSnackbar, state } = props;
    const resGet = await adminGet('contracts', {});
    const processUser = await adminGet('/allUsers');
    const data = resGet?.data?.filter((item) => item.type === 'AGRICULTURE');
    switch (resGet.code) {
        case 0:
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataFundAgri: data,
                        dataUser: processUser,
                    },
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
                message: `Tải dữ liệu thất bại. ${
                    resGet?.message || resGet.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const deleteFundAgrisSV = async (props = {}) => {
    const { id_fund, token, setSnackbar, dispatch, setIsProcess, state } =
        props;
    const resDel = await adminDelete(`contract/${id_fund}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('deleteFundAgriSV', resDel);
    switch (resDel.code) {
        case 0:
            const resGet = await adminGet('contracts', {});
            const processUser = await adminGet('/allUsers');
            const data = resGet?.data?.filter(
                (item) => item.type === 'AGRICULTURE'
            );
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataFundAgri: data,
                        dataUser: processUser,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Xóa thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Xóa thất bại. ${resDel.message}`,
            });
            break;
        default:
            break;
    }
};
export const updateFundAgriSV = async (props = {}) => {
    const {
        id_fund,
        setIsProcess,
        state,
        token,
        dispatch,
        statusCurrent,
        statusUpdate,
        setSnackbar,
    } = props;
    const resPut = await adminPut(`contract/${id_fund}`, {
        token: token,
        status: statusUpdate || statusCurrent,
        header: {
            token: token,
        },
    });
    // console.log('updateFundAgriSV', resPut);
    switch (resPut.code) {
        case 0:
            const resGet = await adminGet('contracts', {});
            const processUser = await adminGet('/allUsers');
            const data = resGet?.data?.filter(
                (item) => item.type === 'AGRICULTURE'
            );
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataFundAgri: data,
                        dataUser: processUser,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Cập nhật thành công',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Cập nhật thất bại. ${
                    resPut?.message || resPut.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const getDisbursementById = async (props = {}) => {
    const { setDisbursement, id_fund, setSnackbar, token } = props;
    const resGet = await userGet(`disbursement/${id_fund}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('getDisbursementById', resGet);
    switch (resGet.code) {
        case 0:
            setDisbursement(resGet?.data);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setSnackbar({
                open: true,
                type: 'error',
                message: `Tải dữ liệu giải ngân thất bại. ${
                    resGet?.message || resGet?.meaage?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const getUsersSV = async (props = {}) => {
    const { dispatch, actions, state, setSnackbar, page, show, search } = props;
    const resGet = await adminGet(
        `allUsers?page=${page}&show=${show}&search=${search}`,
        {}
    );
    switch (resGet.code) {
        case 0:
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataUser: resGet?.data,
                    },
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
                message: `Tải dữ liệu người dùng thất bại. ${
                    resGet?.message || resGet?.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const updateRuleUserSV = async (props = {}) => {
    const {
        id_user,
        dispatch,
        state,
        setSnackbar,
        statusCurrent,
        statusUpdate,
        token,
        setIsProcess,
        setModalChangeRule,
    } = props;
    const resPut = await adminPut(`updateUser/${id_user}`, {
        token: token,
        rule: statusUpdate.toLowerCase() || statusCurrent.toLowerCase(),
        headers: {
            token: token,
        },
    });
    // console.log('updateRuleUserSV', resPut);
    switch (resPut.code) {
        case 0:
            const resGet = await adminGet(`allUsers`, {});
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataUser: resGet?.data,
                    },
                })
            );
            setIsProcess(false);
            setModalChangeRule(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Cập nhật quyền người dùng thành công.',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            setModalChangeRule(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: `Cập nhật quyền người dùng thất bại. ${
                    resPut?.message || resPut?.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const updateRankUserSV = async (props = {}) => {
    const {
        id_user,
        dispatch,
        state,
        setSnackbar,
        statusCurrent,
        statusUpdate,
        token,
        setIsProcess,
    } = props;
    const resPut = await adminPut(`updateUser/${id_user}`, {
        token: token,
        rank: statusUpdate || statusCurrent,
        headers: {
            token: token,
        },
    });
    // console.log('updateRankUserSV', resPut);
    switch (resPut.code) {
        case 0:
            const resGet = await adminGet(`allUsers`, {});
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataUser: resGet?.data,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Cập nhật hạng người dùng thành công.',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalStatus: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Cập nhật hạng người dùng thất bại. ${
                    resPut?.message || resPut?.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const deleteUserSV = async (props = {}) => {
    const { id_user, dispatch, state, setSnackbar, token, setIsProcess } =
        props;
    const resDel = await adminDelete(`deleteUser/${id_user}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('deleteUserSV', resDel);
    switch (resDel.code) {
        case 0:
            const resGet = await adminGet(`allUsers`, {});
            dispatch(
                actions.setData({
                    data: {
                        ...state.set.data,
                        dataUser: resGet?.data,
                    },
                })
            );
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'success',
                message: 'Xóa người dùng thành công.',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcess(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Xóa người dùng thất bại. ${
                    resDel?.message || resDel?.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const getUserByIdSV = async (props = {}) => {
    const { id_user, setSnackbar, token, setUserById } = props;
    const resGet = await adminGet(`user/${id_user}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('getUserByIdSV', resGet);
    switch (resGet.code) {
        case 0:
            setUserById(resGet?.data);
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setSnackbar({
                open: true,
                type: 'error',
                message: `Tải dữ liệu thất bại. ${
                    resGet?.message || resGet?.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const blockUserByEmailSV = async (props = {}) => {
    const {
        email_user,
        id_user,
        setUserById,
        setSnackbar,
        token,
        setIsProcessBlockUser,
    } = props;
    const resPut = await adminPut(`block/${email_user}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('blockUserByEmailSV', resPut);
    switch (resPut.code) {
        case 0:
            const resGet = await adminGet(`user/${id_user}`, {
                token: token,
                headers: {
                    token: token,
                },
            });
            setUserById(resGet?.data);
            setIsProcessBlockUser(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Chặn tài khoản thành công.',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessBlockUser(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: `Chặn tài khoản thất bại. ${
                    resPut?.message || resPut?.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const refreshPwdUserSV = async (props = {}) => {
    const {
        email_user,
        id_user,
        setUserById,
        setSnackbar,
        token,
        setIsProcessRefreshPwd,
    } = props;
    const resPost = await adminPut(`refreshPwd/${email_user}`, {
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('refreshPwdUserSV', resPost);
    switch (resPost.code) {
        case 0:
            const resGet = await adminGet(`user/${id_user}`, {
                token: token,
                headers: {
                    token: token,
                },
            });
            setUserById(resGet?.data);
            setIsProcessRefreshPwd(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Đặt lại mật khảu thành công.',
            });
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessRefreshPwd(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: `Đặt lại mật khẩu thất bại. ${
                    resPost?.message || resPost?.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const changePwdUserSV = async (props = {}) => {
    const {
        email_user,
        id_user,
        password,
        setUserById,
        setSnackbar,
        token,
        setIsProcessChangePwd,
        dispatch,
    } = props;
    const resPost = await adminPut(`changePwd/${email_user}`, {
        password: password,
        token: token,
        headers: {
            token: token,
        },
    });
    // console.log('changePwdUserSV', resPost);
    switch (resPost.code) {
        case 0:
            const resGet = await adminGet(`user/${id_user}`, {
                token: token,
                headers: {
                    token: token,
                },
            });
            setUserById(resGet?.data);
            setIsProcessChangePwd(false);
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Đổi mật khẩu thành công.',
            });
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            break;
        case 1:
        case 2:
        case 304:
        case 500:
            setIsProcessChangePwd(false);
            dispatch(
                actions.toggleModal({
                    modalDelete: false,
                })
            );
            setSnackbar({
                open: true,
                type: 'error',
                message: `Đổi mật khẩu thất bại. ${
                    resPost?.message || resPost?.message?.message
                }`,
            });
            break;
        default:
            break;
    }
};
export const adminGetAllDepositsSV = async (props = {}) => {
    const { dispatch, setSnackbar, page, show, search } = props;
    const resGet = await adminGet(
        `deposits?page=${page}&show=${show}&search=${search}`,
        {}
    );
    // console.log(resGet);
    const resGetUser = await adminGet('allUsers', {});
    switch (resGet.code) {
        case 0:
            dispatch(
                actions.setData({
                    data: {
                        ...props.state.data,
                        dataUser: resGetUser?.data,
                        dataDeposits: resGet?.data,
                    },
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
                message: resGet.message || 'Tải dữ liệu thất bại!',
            });
            break;
        default:
            break;
    }
};
export const adminGetAllWithdrawsSV = async (props = {}) => {
    const { dispatch, setSnackbar, page, show, search } = props;
    const resGet = await adminGet(
        `withdraws?page=${page}&show=${show}&search=${search}`,
        {}
    );
    // console.log('adminGetAllWithdrawsSV: ', resGet);
    const resGetUser = await adminGet('allUsers', {});
    switch (resGet.code) {
        case 0:
            dispatch(
                actions.setData({
                    data: {
                        dataUser: resGetUser?.data,
                        dataWithdraw: resGet?.data,
                    },
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
                message: resGet.message || 'Tải dữ liệu thất bại!',
            });
            break;
        default:
            break;
    }
};
//DASHBOARD SERVICES
export const dashboardServices = async (props = {}) => {
    const { dispatch, state } = props;
    const resGetBalance = await adminGet('total/balance', {});
    const resGetDeposit = await adminGet('total/deposit', {});
    const resGetWithdraw = await adminGet('total/withdraw', {});
    const resGetUsers = await adminGet('total/user/isBalance', {});
    dispatch(
        actions.setData({
            ...state.set,
            totalBalance: resGetBalance?.data?.sum,
            totalDeposit: resGetDeposit?.data?.sum,
            totalWithdraw: resGetWithdraw?.data?.sum,
            dataUserBalance: resGetUsers?.data,
        })
    );
};

// ---
// ADD RATE
export const adminAddRateSV = async (props = {}) => {
    const { rate } = props;
    const resPost = await adminPost('addRate', {
        rate,
    });
    console.log('adminAddRateSV: ', resPost);
};
// GET RATE
export const adminGetRateSV = async (props = {}) => {
    const { id_rate } = props;
    const resGet = await adminGet(`getRate/${id_rate}`, {});
    console.log('adminGetRateSV: ', resGet);
};
// UPDATE RATE
export const adminUpdateRateSV = async (props = {}) => {
    const { id_rate, rate } = props;
    const resPut = await adminPut(`updateRate/${id_rate}`, {
        rate,
    });
    console.log('adminUpdateRateSV: ', resPut);
};
// DELETE RATE
export const adminDeleteRateSV = async (props = {}) => {
    const { id_rate } = props;
    const resDelete = await adminDelete(`deleteRate/${id_rate}`, {});
    console.log('adminDeleteRateSV: ', resDelete);
};
// ---
