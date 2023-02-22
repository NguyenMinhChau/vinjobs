import {
  adminDelete,
  adminGet,
  adminPost,
  adminPut,
} from "../utils/Axios/axiosInstance";

// ADD RATE
export const adminAddRateSV = async (props = {}) => {
  const { rate } = props;
  const resPost = await adminPost("addRate", {
    rate,
  });
  console.log("adminAddRateSV: ", resPost);
};
// GET RATE
export const adminGetRateSV = async (props = {}) => {
  const { id_rate } = props;
  const resGet = await adminGet(`getRate/${id_rate}`, {});
  console.log("adminGetRateSV: ", resGet);
};
// UPDATE RATE
export const adminUpdateRateSV = async (props = {}) => {
  const { id_rate, rate } = props;
  const resPut = await adminPut(`updateRate/${id_rate}`, {
    rate,
  });
  console.log("adminUpdateRateSV: ", resPut);
};
// DELETE RATE
export const adminDeleteRateSV = async (props = {}) => {
  const { id_rate } = props;
  const resDelete = await adminDelete(`deleteRate/${id_rate}`, {});
  console.log("adminDeleteRateSV: ", resDelete);
};
// GET ALL USERS
export const adminGetAllUsersSV = async (props = {}) => {
  const resGet = await adminGet("allUsers", {});
  console.log("adminGetAllUsersSV: ", resGet);
};
// GET USER BY ID
export const adminGetUserByIdSV = async (props = {}) => {
  const { id_user } = props;
  const resGet = await adminGet(`user/${id_user}`, {});
  console.log("adminGetUserByIdSV: ", resGet);
};
// UPDATE USER BY ID
export const adminUpdateUserByIdSV = async (props = {}) => {
  const { id_user } = props;
  const resPut = await adminPut(`updateUser/${id_user}`, {});
  console.log("adminUpdateUserByIdSV: ", resPut);
};
// DELETE USER BY ID
export const adminDeleteUserByIdSV = async (props = {}) => {
  const { id_user } = props;
  const resDel = await adminDelete(`deleteUser/${id_user}`, {});
  console.log("adminDeleteUserByIdSV: ", resDel);
};
// GET ALL PAYMENTS
export const adminGetAllPaymentsSV = async (props = {}) => {
  const resGet = await adminGet("getPayments", {});
  console.log("adminGetAllPaymentsSV: ", resGet);
};
// GET PAYMENT BY ID
export const adminGetPaymentByIdSV = async (props = {}) => {
  const { id_payment } = props;
  const resGet = await adminGet(`payment/${id_payment}`, {});
  console.log("adminGetPaymentByIdSV: ", resGet);
};
// ADD PAYMENT
export const adminAddPaymentSV = async (props = {}) => {
  const { payment } = props;
  const resPost = await adminPost("addPayment", {
    payment,
  });
  console.log("adminAddPaymentSV: ", resPost);
};
// UPDATE PAYMENT
export const adminUpdatePaymentSV = async (props = {}) => {
  const { id_payment } = props;
  const resPut = await adminPut(`updatePayment/${id_payment}`, {});
  console.log("adminUpdatePaymentSV: ", resPut);
};
// DELETE PAYMENT
export const adminDeletePaymentSV = async (props = {}) => {
  const { id_payment } = props;
  const resDel = await adminDelete(`deletePayment/${id_payment}`, {});
  console.log("adminDeletePaymentSV: ", resDel);
};
// GET ALL DEPOSITS
export const adminGetAllDepositsSV = async (props = {}) => {
  const resGet = await adminGet("deposits", {});
  console.log("adminGetAllDepositsSV: ", resGet);
  return resGet?.data;
};

// GET DEPOSIT BY ID
export const adminGetDepositByIdSV = async (props = {}) => {
  const { id_deposit } = props;
  const deposit = await adminGet(`deposit/${id_deposit}`, {});
  const payment = await adminGet(`payment/${deposit?.data?.paymentId}`, {});
  const user = await adminGet(`user/${deposit?.data?.userId}`, {});
  return {
    withdraw: deposit?.data,
    payment: payment?.data,
    user: user?.data,
  };
  // console.log("adminGetDepositByIdSV: ", resGet);
};
// UPDATE DEPOSITS
export const adminUpdateDepositSV = async (props = {}) => {
  const { id_deposit } = props;
  const resPut = await adminPut(`updateDeposit/${id_deposit}`, {});
  console.log("adminUpdateDepositSV: ", resPut);
};
// DELETE DEPOSIT
export const adminDeleteDepositSV = async (props = {}) => {
  const { id_deposit } = props;
  const resDel = await adminDelete(`deleteDeposit/${id_deposit}`, {});
  console.log("adminDeleteDepositSV: ", resDel);
};
// UPDATE STATUS DEPOSITS
export const adminUpdateStatusDepositSV = async (props = {}) => {
  const { id_deposit, status } = props;
  const resPut = await adminPut(`handleDeposit/${id_deposit}`, {
    status,
  });
  console.log("adminUpdateStatusDepositSV: ", resPut);
};
// GET ALL WITHDRAWS
export const adminGetAllWithdrawsSV = async (props = {}) => {
  const resGet = await adminGet("withdraws", {});
  //   console.log("adminGetAllWithdrawsSV: ", resGet);
  props.dispatch(
    props.actions.setData({
      ...props.state.set,
      data: {
        ...props.state.set.data,
        dataWithdraw: resGet?.data?.withdraws,
      },
    })
  );
};

// GET WITHDRAW BY ID
export const adminGetWithdrawByIdSV = async (props = {}) => {
  const { id_withdraw } = props;
  const withdraw = await adminGet(`withdraw/${id_withdraw}`, {});
  const payment = await adminGet(`payment/${withdraw?.data?.paymentId}`, {});
  const user = await adminGet(`user/${withdraw?.data?.userId}`, {});
  return {
    withdraw: withdraw?.data,
    payment: payment?.data,
    user: user?.data,
  };
};
// UPDATE WITHDRAW
export const adminUpdateWithdrawSV = async (props = {}) => {
  const { id_withdraw } = props;
  const resPut = await adminPut(`updateWithdraw/${id_withdraw}`, {});
  console.log("adminUpdateWithdrawSV: ", resPut);
};
// DELETE WITHDRAW
export const adminDeleteWithdrawSV = async (props = {}) => {
  const { id_withdraw } = props;
  const resDel = await adminDelete(`deleteWithdraw/${id_withdraw}`, {});
  console.log("adminDeleteWithdrawSV: ", resDel);
};
// UPDATE STATUS WITHDRAW
export const adminUpdateStatusWithdrawSV = async (props = {}) => {
  const { id_withdraw, status } = props;
  const resPut = await adminPut(`handleWithdraw/${id_withdraw}`, {
    status,
  });
  console.log("adminUpdateStatusWithdrawSV: ", resPut);
};
// UPDATE STATUS CONTRACT
export const adminUpdateStatusContractSV = async (props = {}) => {
  const { id_contract, status } = props;
  const resPut = await adminPut(`handleContract/${id_contract}`, {
    status,
  });
  console.log("adminUpdateStatusContractSV: ", resPut);
};

//DASHBOARD SERVICES
export const dashboardServices = async (props = {}) => {
  const resGetBalance = await adminGet("total/balance", {}).then(
    (data) => data?.data
  );
  const resGetDeposit = await adminGet("total/deposit", {}).then(
    (data) => data?.data
  );
  const resGetWithdraw = await adminGet("total/withdraw", {}).then(
    (data) => data?.data
  );

  const resGetUsers = await adminGet("total/user/isBalance", {}).then(
    (data) => data?.data
  );

  //   console.log("adminGetAllWithdrawsSV: ", resGet);
  // console.log(resGet.sum);
  props.dispatch(
    props.actions.setData({
      ...props.state.set,
      totalBalance: resGetBalance?.sum,
      totalDeposit: resGetDeposit?.sum,
      totalWithdraw: resGetWithdraw?.sum,
      dataUserBalance: resGetUsers,
    })
  );
};
