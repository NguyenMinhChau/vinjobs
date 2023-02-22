/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import className from "classnames/bind";
import "react-loading-skeleton/dist/skeleton.css";
import { actions } from "../../app/";
import styles from "./Dashboard.module.css";
import {
  Button,
  FormInput,
  Modal,
  Search,
  SearchDate,
  TableData,
} from "../../components";
import {
  alertUtils,
  DataUserBalance,
  dateUtils,
  handleUtils,
  numberUtils,
  refreshPage,
  requestRefreshToken,
  searchUtils,
  useAppContext,
} from "../../utils";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import routers from "../../routers/routers";
// import { SVtotal, SVupdateRate } from '../../services/dashboard';
import { FirstUpc } from "../../utils/format/LetterFirstUpc";
import { dashboardServices } from "../../services/admin";

const cx = className.bind(styles);

function Dashboard() {
  const { state, dispatch } = useAppContext();
  const {
    currentUser,
    totalDeposit,
    totalWithdraw,
    totalBalance,
    totalCommission,
    dataUserBalance,
    message: { del, upd, cre, error },
    searchValues: { dateFrom, dateTo, userBalance },
    pagination: { page, show },
  } = state.set;
  const { alertModal } = state.toggle;
  const [modalRate, setModalRate] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [rateUpdate, setRateUpdate] = useState(null);
  const refRateUpdate = useRef();
  useEffect(() => {
    document.title = `Dashboard | ${process.env.REACT_APP_TITLE_WEB}`;
    dashboardServices({ actions, state, dispatch, page, show });
  }, []);

  console.log(totalBalance, totalDeposit, totalWithdraw);
  let dataUser = dataUserBalance || [];
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      actions.setData({
        ...state.set,
        searchValues: {
          ...state.set.searchValues,
          [name]: value,
        },
      })
    );
  };
  const handleChangeRate = (e) => {
    setRateUpdate(e.target.value);
  };
  const closeAlert = () => {
    return alertUtils.closeAlert(dispatch, state, actions);
  };
  const modalRateTrue = (e) => {
    e.stopPropagation();
    setModalRate(true);
  };
  const modalRateFalse = (e) => {
    e.stopPropagation();
    setRateUpdate("");
    setModalRate(false);
  };
  const changeSearch = (e) => {
    return searchUtils.logicSearch(e, dispatch, state, actions);
  };
  const handleSend = async () => {
    try {
      await 1;
      setIsProcess(true);
      setTimeout(() => {
        setIsProcess(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateRate = (data) => {};
  const updateRate = async () => {
    try {
      await 1;
      setIsProcess(true);
      setTimeout(() => {
        requestRefreshToken(
          currentUser,
          handleUpdateRate,
          state,
          dispatch,
          actions
        );
        setRateUpdate(null);
        setModalRate(false);
        setIsProcess(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  const ChartItem = ({ title, value, link, to }) => {
    return (
      <div className={`${cx("item")}`}>
        {link ? (
          <Link to={to} className={`${cx("title-link")}`}>
            {title}
          </Link>
        ) : (
          <div className={`${cx("title")}`}>{title}</div>
        )}
        <div className={`${cx("value")}`}>{value}</div>
      </div>
    );
  };
  function RenderBodyTableUser({ data }) {
    return (
      <>
        {data.map((item, index) => {
          return (
            <tr key={index} style={{ fontSize: "14px" }}>
              <td className="upc">
                {handleUtils.indexTable(page, show, index)}
              </td>
              <td className="item-w150">{item.payment.username}</td>
              <td className="item-w150 text-left">{item.payment.email}</td>
              <td className="text-left">
                {numberUtils.formatUSD(item.Wallet.balance)}
              </td>
              <td className="text-left">
                <span className={`${item.payment.rule + "bgc"} status`}>
                  {item.payment.rule}
                </span>
              </td>
              <td className="text-left">
                <span className={`${item.rank.toLowerCase() + "bgc"} status`}>
                  {FirstUpc(item.rank)}
                </span>
              </td>
            </tr>
          );
        })}
      </>
    );
  }
  return (
    <div className={`${cx("dashboard-container")}`}>
      {(del || upd || cre || error) && alertModal && (
        <Alert
          severity={error ? "error" : "success"}
          className="mb8"
          onClose={closeAlert}
        >
          {del ? del : upd ? upd : cre ? cre : error}
        </Alert>
      )}
      <div className={`${cx("general-top")}`}>
        <div className={`${cx("search-container")}`}>
          <div className={`${cx("search-title")}`}>Từ ngày</div>
          <SearchDate
            name="dateFrom"
            value={dateFrom ? dateFrom : dateUtils.dateVn(new Date())}
            onChange={handleChange}
            className={`${cx("search")}`}
          />
        </div>
        <div className={`${cx("search-container")}`}>
          <div className={`${cx("search-title")}`}>Đến ngày</div>
          <SearchDate
            name="dateTo"
            value={
              dateTo
                ? dateTo
                : dateUtils.dateVn(
                    new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
                  )
            }
            onChange={handleChange}
            className={`${cx("search")}`}
          />
        </div>
        <div className="flex-end mt8">
          <Button
            className={`${cx("general-button")} completebgc`}
            onClick={handleSend}
            isProcess={isProcess}
            disabled={isProcess}
          >
            <span className={`${cx("general-button-icon")}`}>
              <i className="fa-regular fa-paper-plane"></i>
            </span>
            <span className={`${cx("general-button-text")}`}>Send</span>
          </Button>
          <Button
            className={`${cx("general-button")} vipbgc`}
            onClick={modalRateTrue}
          >
            <span className={`${cx("general-button-icon")}`}>
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span className={`${cx("general-button-text")}`}>Change rate</span>
          </Button>
          <Button
            className={`${cx("general-button")} confirmbgc`}
            onClick={refreshPage.refreshPage}
          >
            <div className="flex-center">
              <span className={`${cx("general-button-icon")}`}>
                <i class="fa-solid fa-rotate"></i>
              </span>
              <span className={`${cx("general-button-text")}`}>
                Refresh Page
              </span>
            </div>
          </Button>
        </div>
      </div>
      <div className={`${cx("chart-container")}`}>
        <div className={`${cx("chart-item-container")}`}>
          <ChartItem
            title="Total Deposits"
            value={totalDeposit ? totalDeposit : 0}
            link
            to={routers.deposits}
          />
          <ChartItem
            title="Total Withdraw"
            value={totalWithdraw ? totalWithdraw : 0}
            link
            to={routers.withdraw}
          />
          <ChartItem title="Balance" value={totalBalance ? totalBalance : 0} />
          <ChartItem
            title="Commission"
            value={numberUtils.formatUSD(totalCommission)}
          />
        </div>
      </div>
      <div className={`${cx("general-table-container")}`}>
        <div className={`${cx("title-header")}`}>
          Danh sách user còn balance
        </div>
        <Search
          name="userBalance"
          value={userBalance}
          onChange={changeSearch}
          className={`${cx("search-coin")}`}
        />
        <TableData
          data={dataUser}
          totalData={dataUserBalance?.totalUser}
          headers={DataUserBalance().headers}
          search=""
          noActions
        >
          <RenderBodyTableUser data={dataUser} />
        </TableData>
      </div>
      {modalRate && (
        <Modal
          titleHeader={"Update Rate"}
          actionButtonText={"Update"}
          closeModal={modalRateFalse}
          openModal={modalRateTrue}
          classNameButton="vipbgc"
          errorMessage={error}
          onClick={
            rateUpdate
              ? updateRate
              : () => {
                  refRateUpdate.current.focus();
                }
          }
          isProcess={isProcess}
          disabled={!rateUpdate}
        >
          <FormInput
            label="Rate"
            type="text"
            placeholder="Enter rate percent (Ex: 0.5 = 50%)"
            name="rateDeposit"
            value={rateUpdate}
            onChange={handleChangeRate}
            ref={refRateUpdate}
            classNameField={`${cx("payment-form-field")}`}
            classNameInput={`${cx("payment-form-input")}`}
          />
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;