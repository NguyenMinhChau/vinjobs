/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import moment from "moment";
import {
  FormInput,
  Button,
  Icons,
  Modal,
  Image,
  ModalViewImage,
  SnackbarCp,
} from "../../components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  useAppContext,
  requestRefreshToken,
  textUtils,
  deleteUtils,
  formUtils,
  alertUtils,
  refreshPage,
  numberUtils,
} from "../../utils";
import { actions } from "../../app/";
import styles from "./UserDetail.module.css";
import {
  blockUserByEmailSV,
  changePwdUserSV,
  getUserByIdSV,
  refreshPwdUserSV,
} from "../../services/admin";

const cx = className.bind(styles);

function UserDetail() {
  const { idUser } = useParams();
  const { state, dispatch } = useAppContext();
  const {
    edit,
    currentUser,
    form: { password },
  } = state.set;
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: "",
  });
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };
  const { modalDelete } = state.toggle;
  const [isModalImage, setIsModalImage] = useState(false);
  const [indexImage, setIndexImage] = useState(0);
  const [userById, setUserById] = useState(null);
  const [isProcessUpdateUsd, setIsProcessUpdateUsd] = useState(false);
  const [isProcessChangePwd, setIsProcessChangePwd] = useState(false);
  const [isProcessBlockUser, setIsProcessBlockUser] = useState(false);
  const [isProcessRefreshPwd, setIsProcessRefreshPwd] = useState(false);
  const x = userById ? userById : edit?.itemData && edit?.itemData;
  const handleSendUser = (dataToken) => {
    getUserByIdSV({
      id_user: idUser,
      setSnackbar,
      token: dataToken?.token,
      setUserById,
    });
  };
  useEffect(() => {
    document.title = `Chi tiết | ${process.env.REACT_APP_TITLE_WEB}`;
    requestRefreshToken(currentUser, handleSendUser, state, dispatch, actions);
  }, []);
  const changeInput = (e) => {
    return formUtils.changeForm(e, dispatch, state, actions);
  };
  const modalChangePwdTrue = (e, id) => {
    return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
  };
  const modalChangePwdFalse = (e) => {
    dispatch(
      actions.setData({
        form: {
          ...state.set.form,
          password: "",
        },
      })
    );
    return deleteUtils.deleteFalse(e, dispatch, state, actions);
  };
  const DATA_IMAGE_MODAL = [
    x?.uploadCCCDFont,
    x?.uploadCCCDBeside,
    x?.uploadLicenseFont,
    x?.uploadLicenseBeside,
  ];
  const modalImageTrue = (e, url) => {
    e.stopPropagation();
    setIsModalImage(true);
  };
  const modalImageFalse = (e) => {
    e.stopPropagation();
    setIsModalImage(false);
    setIndexImage(0);
  };
  const handleSendChangePwd = (dataToken) => {
    changePwdUserSV({
      email_user: x?.payment?.email,
      id_user: x?._id,
      password: password,
      setUserById,
      setSnackbar,
      token: dataToken?.token,
      setIsProcessChangePwd,
      dispatch,
    });
  };
  const changePwd = async (id) => {
    // await 1;
    // setSnackbar({
    //     open: true,
    //     type: 'success',
    //     message: 'Chức năng đang phát triển',
    // });
    // dispatch(
    //   actions.toggleModal({
    //     modalDelete: false,
    //   })
    // );
    setIsProcessChangePwd(true);
    requestRefreshToken(
      currentUser,
      handleSendChangePwd,
      state,
      dispatch,
      actions
    );
  };
  const handleSendRefresh = (dataToken) => {
    refreshPwdUserSV({
      email_user: x.payment.email,
      id_user: x._id,
      setIsProcessRefreshPwd,
      setUserById,
      setSnackbar,
      token: dataToken?.token,
    });
  };
  const refreshPwd = async (id) => {
    // await 1;
    // setSnackbar({
    //     open: true,
    //     type: 'success',
    //     message: 'Chức năng đang phát triển',
    // });
    setIsProcessRefreshPwd(true);
    requestRefreshToken(
      currentUser,
      handleSendRefresh,
      state,
      dispatch,
      actions
    );
  };
  const handleSendBlockUser = (dataToken) => {
    blockUserByEmailSV({
      email_user: x.payment.email,
      id_user: x._id,
      setIsProcessBlockUser,
      setUserById,
      setSnackbar,
      token: dataToken?.token,
    });
  };
  const onBlockAndUnblockUser = async (id) => {
    // await 1;
    // setSnackbar({
    //     open: true,
    //     type: 'success',
    //     message: 'Chức năng đang phát triển',
    // });
    setIsProcessBlockUser(true);
    requestRefreshToken(
      currentUser,
      handleSendBlockUser,
      state,
      dispatch,
      actions
    );
  };
  function ItemRender({
    title,
    info,
    bankInfo,
    methodBank,
    nameAccount,
    numberAccount,
  }) {
    return (
      <div className="detail-item">
        <div className="detail-title" style={{ minWidth: "120px" }}>
          {title}
        </div>
        <div className={`${cx("detail-status")}`}>
          {bankInfo ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span className="info">
                {methodBank ? methodBank : <Skeleton width={30} />}
              </span>
              <span className="info">
                {nameAccount ? nameAccount : <Skeleton width={30} />}
              </span>
              <span className="info">
                {numberAccount ? numberAccount : <Skeleton width={30} />}
              </span>
            </div>
          ) : (
            <span className="info">
              {info || info === 0 ? info : <Skeleton width={30} />}
            </span>
          )}
        </div>
      </div>
    );
  }
  function ImageUploadRender({
    label,
    isCheck,
    imageFrontUrl,
    imageBesideUrl,
  }) {
    return (
      <>
        <div className={`${cx("document-user-title")}`}>{label}</div>
        {isCheck ? (
          <div className={`${cx("document-user-item")}`}>
            <Image
              src={`${process.env.REACT_APP_URL_SERVER}/${imageFrontUrl}`}
              alt=""
              className={`${cx("document-user-item-image-view")}`}
              onClick={(e) => {
                modalImageTrue(e, imageFrontUrl);
                const index = DATA_IMAGE_MODAL.findIndex(
                  (item) => item === imageFrontUrl
                );
                setIndexImage(index);
              }}
            />
            <Image
              src={`${process.env.REACT_APP_URL_SERVER}/${imageBesideUrl}`}
              alt=""
              className={`${cx("document-user-item-image-view")}`}
              onClick={(e) => {
                modalImageTrue(e, imageBesideUrl);
                const index = DATA_IMAGE_MODAL.findIndex(
                  (item) => item === imageBesideUrl
                );
                setIndexImage(index);
              }}
            />
          </div>
        ) : (
          <Skeleton width="100%" height="200px" />
        )}
      </>
    );
  }

  return (
    <>
      <SnackbarCp
        openSnackbar={snackbar.open}
        handleCloseSnackbar={handleCloseSnackbar}
        messageSnackbar={snackbar.message}
        typeSnackbar={snackbar.type}
      />
      <div className={`${cx("buySellDetail-container")}`}>
        <div className={`${cx("detail-container")}`}>
          <div className="detail-item">
            <div className="detail-title">Hạng</div>
            <div className={`${cx("detail-status")}`}>
              {x ? (
                <>
                  <span
                    className={`status fwb ${
                      x.rank.toLowerCase().replace(" ", "") + "bgc"
                    }`}
                  >
                    {textUtils.FirstUpc(x.rank)}
                  </span>
                </>
              ) : (
                <Skeleton width={50} />
              )}
            </div>
          </div>
          <ItemRender title="Họ và tên" info={x && x.payment.username} />
          <ItemRender title="Email" info={x && x.payment.email} />
          <ItemRender title="Quyền" info={x && x.payment.rule} />
          <ItemRender
            bankInfo
            title="Phương thức thanh toán"
            methodBank={x && x.payment.bank.bankName}
            nameAccount={x && x.payment.bank.name}
            numberAccount={x && x.payment.bank.account}
          />
          <ItemRender
            title="Tổng tiền nạp"
            info={x && numberUtils.formatVND(x.Wallet.deposit)}
          />
          <ItemRender
            title="Tổng tiền rút"
            info={x && numberUtils.formatVND(x.Wallet.withdraw)}
          />
          <ItemRender
            title="Tổng tài sản"
            info={x && numberUtils.formatVND(x.Wallet.balance)}
          />
          <ItemRender
            title="Ngày tạo"
            info={x && moment(x.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          />
        </div>
        <div className={`${cx("detail-container")}`}>
          <div className={`${cx("document-user-container")} w100`}>
            <ImageUploadRender
              label="1. Căn cước công dân"
              isCheck={x?.uploadCCCDFont && x?.uploadCCCDBeside}
              imageFrontUrl={x?.uploadCCCDFont}
              imageBesideUrl={x?.uploadCCCDBeside}
            />
            <ImageUploadRender
              label="2. Giấy phép lái xe"
              isCheck={x?.uploadLicenseFont && x?.uploadLicenseBeside}
              imageFrontUrl={x?.uploadLicenseFont}
              imageBesideUrl={x?.uploadLicenseBeside}
            />
          </div>
        </div>
        <div>
          <Button className="confirmbgc" onClick={refreshPage.refreshPage}>
            <div className="flex-center">
              <Icons.RefreshIcon className="fz12 mr8" />
              <span className={`${cx("general-button-text")}`}>
                Tải lại trang
              </span>
            </div>
          </Button>
          <Button
            className="cancelbgc"
            onClick={() => {
              onBlockAndUnblockUser(idUser);
            }}
            isProcess={isProcessBlockUser}
            disabled={isProcessBlockUser}
          >
            <div className="flex-center">
              {!x?.blockUser ? (
                <Icons.BlockUserIcon />
              ) : (
                <Icons.UnBlockUserIcon />
              )}{" "}
              <span className="ml8">
                {!x?.blockUser ? "Chặn tài khoản" : "Bỏ chặn tài khoản"}
              </span>
            </div>
          </Button>
          <Button
            className="confirmbgc"
            onClick={() => refreshPwd(idUser)}
            isProcess={isProcessRefreshPwd}
            disabled={isProcessRefreshPwd}
          >
            <div className="flex-center">
              <Icons.RefreshPageIcon />{" "}
              <span className="ml8">Đặt lại mật khẩu</span>
            </div>
          </Button>
          <Button
            className="completebgc"
            onClick={(e) => modalChangePwdTrue(e, idUser)}
          >
            <div className="flex-center">
              <Icons.EditIcon /> <span className="ml8">Đổi mật khẩu</span>
            </div>
          </Button>
        </div>
      </div>
      <ModalViewImage
        stateModal={isModalImage}
        closeModal={modalImageFalse}
        uniqueData={DATA_IMAGE_MODAL}
        indexImage={indexImage}
        setIndexImage={setIndexImage}
      />
      {modalDelete && (
        <Modal
          titleHeader="Thay đổi mật khẩu"
          actionButtonText="Gửi"
          closeModal={modalChangePwdFalse}
          openModal={modalChangePwdTrue}
          classNameButton="vipbgc"
          onClick={() => changePwd(idUser)}
          isProcess={isProcessChangePwd}
          disabled={!password}
        >
          <FormInput
            type="password"
            name="password"
            placeholder="Nhập mật khẩu mới"
            label="Mật khẩu"
            showPwd
            onChange={changeInput}
          />
        </Modal>
      )}
    </>
  );
}

export default UserDetail;
