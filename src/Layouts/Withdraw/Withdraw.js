/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import moment from "moment";
// import {
//     getWithdraws,
//     searchWithdraw,
//     handleEdit,
//     checkErrorWithdraw,
//     handleDelete,
// } from '../../services/withdraws';
import {
  useAppContext,
  DataWithdraws,
  deleteUtils,
  handleUtils,
  requestRefreshToken,
  localStoreUtils,
  numberUtils,
} from "../../utils";
import routers from "../../routers/routers";
import { Icons, ActionsTable, Modal, SelectStatus } from "../../components";
import { actions } from "../../app/";
import { General } from "../";
import {
  TrObjectIcon,
  TrObjectNoIcon,
  TrStatus,
} from "../../components/TableData/TableData";
import styles from "./Withdraw.module.css";
import Skeleton from "react-loading-skeleton";
import { adminGetAllWithdrawsSV } from "../../services/admin";

const cx = className.bind(styles);

function Withdraw() {
  const { state, dispatch } = useAppContext();
  const {
    edit,
    currentUser,
    statusCurrent,
    statusUpdate,
    data: { dataWithdraw, dataUser },
    searchValues: { withdraw },
    pagination: { page, show },
  } = state.set;
  const { modalStatus, modalDelete } = state.toggle;
  const [isProcess, setIsProcess] = useState(false);
  useEffect(() => {
    document.title = `Withdraw | ${process.env.REACT_APP_TITLE_WEB}`;
    adminGetAllWithdrawsSV({ state, actions, dispatch, page, show });
  }, []);

  let dataWithdrawFlag = dataWithdraw || [];
  // Modal
  const toggleEditTrue = async (e, status, id) => {
    await localStoreUtils.setStore({
      ...currentUser,
      idUpdate: id,
    });
    deleteUtils.statusTrue(e, status, id, dispatch, state, actions);
  };
  const toggleEditFalse = (e) => {
    return deleteUtils.statusFalse(e, dispatch, state, actions);
  };
  const modalDeleteTrue = (e, id) => {
    return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
  };
  const modalDeleteFalse = (e) => {
    return deleteUtils.deleteFalse(e, dispatch, state, actions);
  };
  // Edit + Delete Withdraw
  const deleteWithdraw = async (id) => {};
  const editStatus = async (id) => {};
  const handleViewWithdraw = (item) => {
    dispatch(
      actions.setData({
        ...state.set,
        edit: { ...state.set.edit, id: item.id, itemData: item },
      })
    );
  };
  function RenderBodyTable({ data }) {
    return (
      <>
        {data.map((item, index) => {
          const sendReceived = {
            send: {
              icon: <Icons.SendIcon />,
              title: "Send",
              number: numberUtils.formatVND(item?.amount),
            },
            received: {
              icon: <Icons.ReceivedIcon />,
              title: "Received",
              number: numberUtils.formatVND(item?.amount),
            },
          };
          // const username = dataUser?.data?.users?.find(
          //   (x) => x?.payment.email === item.user
          // )?.payment.username;
          const username = dataUser?.find((x) => x?._id === item.userId)
            ?.payment.username;
          const infoUser = {
            name: username,
            email: item.user,
            path: `@${username?.replace(" ", "-")}`,
          };
          return (
            <tr key={index}>
              <td>{handleUtils.indexTable(page, show, index)}</td>
              {/* <td className="item-w100">{item.code}</td> */}
              <td>
                <TrObjectIcon item={sendReceived} />
              </td>
              <td className="item-w150">
                <TrObjectNoIcon item={infoUser} />
              </td>
              <td className="item-w100">
                {moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}
              </td>
              <td className="item-w150">
                {item.createBy || <Skeleton width="50px" />}
              </td>
              <td>
                <TrStatus
                  item={item.status}
                  onClick={(e) => toggleEditTrue(e, item.status, item._id)}
                />
              </td>
              <td>
                <ActionsTable
                  view
                  linkView={`${routers.withdraw}/${item.id}`}
                  onClickDel={(e) => modalDeleteTrue(e, item.id)}
                  onClickView={() => handleViewWithdraw(item)}
                ></ActionsTable>
              </td>
            </tr>
          );
        })}
      </>
    );
  }
  return (
    <>
      <General
        className={cx("withdraw")}
        valueSearch={withdraw}
        nameSearch="withdraw"
        dataFlag={dataWithdrawFlag}
        dataHeaders={DataWithdraws(Icons).headers}
        totalData={dataWithdraw?.data?.total}
      >
        <RenderBodyTable data={dataWithdrawFlag} />
      </General>
      {modalStatus && (
        <Modal
          titleHeader="Change Status"
          actionButtonText="Submit"
          openModal={toggleEditTrue}
          closeModal={toggleEditFalse}
          classNameButton="vipbgc"
          onClick={() => editStatus(currentUser?.idUpdate || edit.id)}
          isProcess={isProcess}
        >
          <p className="modal-delete-desc">
            Are you sure change status this{" "}
            {window.location.pathname.includes(`${routers.deposits}`)
              ? "deposits"
              : "withdraw"}
            ?
          </p>
          <SelectStatus />
        </Modal>
      )}
      {modalDelete && (
        <Modal
          titleHeader="Delete Withdraw"
          actionButtonText="Delete"
          openModal={modalDeleteTrue}
          closeModal={modalDeleteFalse}
          classNameButton="cancelbgc"
          onClick={() => deleteWithdraw(edit.id)}
          isProcess={isProcess}
        >
          <p className="modal-delete-desc">
            Are you sure to delete this withdraw?
          </p>
        </Modal>
      )}
    </>
  );
}

export default Withdraw;