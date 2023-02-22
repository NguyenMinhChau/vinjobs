/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import { useParams, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button, Icons, Image } from "../../components";
import moment from "moment";
// import { getDepositsWithdrawById } from '../../services/deposits';
import {
  useAppContext,
  textUtils,
  refreshPage,
  numberUtils,
} from "../../utils";
import styles from "./DepositsWithdrawDetail.module.css";

import {
  adminGetWithdrawByIdSV,
  adminGetDepositByIdSV,
} from "../../services/admin";

const cx = className.bind(styles);

function DepositsWithdrawDetail() {
  const { idDeposits, idWithdraw } = useParams();
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const [withdrawValue, setWithdrawValue] = useState({});
  //   const [depositValue, setDepositValue] = useState({});
  const { edit } = state.set;
  useEffect(() => {
    document.title = `Detail | ${process.env.REACT_APP_TITLE_WEB}`;
    adminGetWithdrawByIdSV({ id_withdraw: idWithdraw })
      .then((result) => setWithdrawValue(result))
      .catch((err) => console.log(err));

    adminGetDepositByIdSV({ id_deposit: idDeposits })
      .then((result) => setWithdrawValue(result))
      .catch((err) => console.log(err));
  }, []);

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
        <div className="detail-title">{title}</div>
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
  // const username = dataUser?.dataUser?.find(
  //     (x) => x.payment.email === edit?.itemData?.user
  // )?.payment?.username;
  //   const x = edit?.itemData && edit?.itemData;
  const x = withdrawValue?.withdraw && withdrawValue?.withdraw;
  return (
    <>
      <Button className="confirmbgc mb8" onClick={refreshPage.refreshPage}>
        <div className="flex-center">
          <Icons.RefreshIcon className="fz12 mr8" />
          <span className={`${cx("general-button-text")}`}>Refresh Page</span>
        </div>
      </Button>
      <div className={`${cx("info-container")}`}>
        <div className={`${cx("detail-container")}`}>
          <div className="detail-item">
            <div className="detail-title">Status</div>
            <div className={`${cx("detail-status")}`}>
              {x ? (
                <>
                  <span
                    className={`status fwb ${
                      x.status.toLowerCase().replace(" ", "") + "bgc"
                    }`}
                  >
                    {textUtils.FirstUpc(x.status)}
                  </span>
                </>
              ) : (
                <Skeleton width={50} />
              )}
            </div>
          </div>
          <ItemRender
            title="Username"
            info={withdrawValue?.user && withdrawValue?.user?.payment.username}
          />
          <ItemRender
            title="Email"
            info={withdrawValue?.user && withdrawValue?.user?.payment.email}
          />
          {/* <ItemRender title="Code" info={x && x.code} /> */}
          <ItemRender
            title="Created"
            info={x && moment(x.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          />
          <ItemRender
            title="Amount"
            info={x && numberUtils.formatVND(x.amount)}
          />
          {/* <ItemRender title="Symbol" info={x && x.symbol} /> */}
          <ItemRender
            title="Payment method"
            bankInfo
            methodBank={
              withdrawValue?.payment && location.pathname.includes("withdraw")
                ? withdrawValue?.payment?.bank_name
                : withdrawValue?.payment?.bank_name
            }
            nameAccount={
              withdrawValue?.payment && location.pathname.includes("withdraw")
                ? withdrawValue?.payment?.account_name
                : withdrawValue?.payment?.account_name
            }
            numberAccount={
              x && location.pathname.includes("withdraw")
                ? withdrawValue?.payment?.account_number
                : withdrawValue?.payment?.account_number
            }
          />
          {idDeposits && (
            <ItemRender
              title="Document"
              info={
                x && (
                  <a
                    href={`${process.env.REACT_APP_URL_SERVER}${x.statement}`}
                    target="_blank"
                  >
                    {x.statement ? (
                      x.statement.replace("/images/", "")
                    ) : (
                      <Skeleton width="30px" />
                    )}
                  </a>
                )
              }
            />
          )}
        </div>
        {idDeposits && (
          <div className={`${cx("detail-container")}`}>
            <div className={`${cx("document-review-container")}`}>
              <div className={`${cx("document-review-title")}`}>
                Document Review
              </div>
              {x?.statement ? (
                <div className={`${cx("document-container")}`}>
                  <Image
                    src={`${process.env.REACT_APP_URL_SERVER}/${x?.statement}`}
                    alt={x.statement.replace("/images/", "")}
                    className={`${cx("document-review-image")}`}
                  />
                </div>
              ) : (
                <Skeleton width="100%" height="200px" />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DepositsWithdrawDetail;
