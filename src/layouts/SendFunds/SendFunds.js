/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './SendFunds.module.css';
import {
	Button,
	CustomcareLine,
	FormInput,
	LoginRegisterCp,
	LoginRegisterCpTwo,
	Modal,
	SelectDateCp,
	SelectValueCp,
	SliderHeader,
	SnackbarCp,
	TotalAssetsAndFund,
	TotalItem,
} from '../../components';
import { useAppContext } from '../../utils';
import { setData } from '../../app/reducer';
import { formatVND, formatVNDCurrency } from '../../utils/format/FormatMoney';
import { dateFormat } from '../../utils/format/DateVN';
import moment from 'moment';
import { autoFormatNumberInputChange } from '../../utils/format/NumberFormat';
import useDebounce from '../../utils/hooks/useDebounce';
import {
	userAddContractSV,
	userGetAssetSV,
	userGetContractSV,
	userGetTotalMoneySV,
} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import { useNavigate } from 'react-router-dom';

const cx = className.bind(styles);
const DATA_INVESTMENT = [
	{
		id: 1,
		name: 'Quỹ đầu tư USD',
	},
	{
		id: 2,
		name: 'Quỹ phát triển nông nghiệp',
	},
];

export default function SendFunds() {
	const { state, dispatch } = useAppContext();
	const {
		item,
		dataAssets,
		sendingTime,
		period,
		deposits,
		investmentFund,
		currentUser,
		dataContracts,
	} = state.set;
	// console.log(item);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const [isShow, setIsShow] = useState(false);
	const [showSelect, setShowSelect] = useState(false);
	const [isProcessSendFund, setIsProcessSendFund] = useState(false);
	const [isModalContract, setIsModalContract] = useState(false);
	const [isModalSubmit, setIsModalSubmit] = useState(false);
	const [isProcessSubmit, setIsProcessSubmit] = useState(false);
	const [disbursement, setDisbursement] = useState(null);
	const history = useNavigate();
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const handleModalContractTrue = (e) => {
		e.stopPropagation();
		setIsModalContract(true);
	};
	const handleModalContractFalse = (e) => {
		e.stopPropagation();
		setIsModalContract(false);
	};
	const handleModalSubmitTrue = (e) => {
		e.stopPropagation();
		setIsModalSubmit(true);
	};
	const handleModalSubmitFalse = (e) => {
		e.stopPropagation();
		setIsModalSubmit(false);
	};
	const useDebouncePeriod = useDebounce(period, 3000);
	const useDebounceDeposits = useDebounce(deposits, 3000);
	const handleSendContract = (dataToken) => {
		userGetContractSV({
			id_user: currentUser?.id,
			setSnackbar,
			dispatch,
			token: dataToken?.token,
		});
	};
	const handleSendAssets = (dataToken) => {
		userGetAssetSV({
			id_user: currentUser?.id,
			token: dataToken?.token,
			dispatch,
			setSnackbar,
		});
	};
	const handleTypeContract = () => {
		if (investmentFund) {
			return investmentFund?.id === 1 ? 'USD' : 'AGRICULTURE';
		} else {
			return item?.type === process.env.REACT_APP_TYPE_USD
				? 'USD'
				: 'AGRICULTURE';
		}
	};
	const handleGetMoneySV = (dataToken) => {
		userGetTotalMoneySV({
			setSnackbar,
			typeContract: handleTypeContract(),
			cycleContract: parseInt(useDebouncePeriod || item?.period),
			principalContract: useDebounceDeposits.replace(/\./g, ''),
			setDisbursement,
			token: dataToken?.token,
		});
	};
	useEffect(() => {
		setDisbursement(null);
		if (
			(investmentFund || item?.type) &&
			(useDebouncePeriod || item?.period) &&
			useDebounceDeposits
		) {
			requestRefreshToken(
				currentUser,
				handleGetMoneySV,
				state,
				dispatch,
				setData,
				setSnackbar,
			);
		}
	}, [
		investmentFund || item?.type,
		useDebouncePeriod || item?.period,
		useDebounceDeposits,
	]);
	useEffect(() => {
		document.title = `Gửi quỹ | ${process.env.REACT_APP_TITLE_WEB}`;
		dispatch(
			setData({
				deposits: '',
				sendingTime: new Date(),
				investmentFund: '',
				period: '',
			}),
		);
		requestRefreshToken(
			currentUser,
			handleSendContract,
			state,
			dispatch,
			setData,
			setSnackbar,
		);
		requestRefreshToken(
			currentUser,
			handleSendAssets,
			state,
			dispatch,
			setData,
			setSnackbar,
		);
	}, []);
	const DATA_MERGE =
		dataContracts &&
		dataContracts?.usd &&
		dataContracts?.agriculture &&
		[...dataContracts?.usd, ...dataContracts?.agriculture]?.sort((a, b) => {
			return a?.id - b?.id;
		});
	const ID_FINAL = DATA_MERGE && DATA_MERGE[DATA_MERGE.length - 1]?.id;
	const toogleIsShow = () => {
		setIsShow(!isShow);
	};
	const handleSendFund = (dataToken) => {
		userAddContractSV({
			id_user: currentUser?.id,
			cycle: period,
			principal: deposits.replace(/\./g, ''),
			type:
				investmentFund?.id === 1
					? 'USD'
					: investmentFund?.id === 2
					? 'AGRICULTURE'
					: '',
			timeSend: moment(sendingTime).format('YYYY-MM-DD HH:mm:ss'),
			setSnackbar,
			dispatch,
			setIsModalSubmit,
			setIsProcessSubmit,
			token: dataToken?.token,
			history,
		});
	};
	const handleContinue = async () => {
		await 1;
		if (currentUser) {
			if (
				(!period && !item?.period) ||
				!deposits ||
				(!investmentFund && !item?.type)
			) {
				setSnackbar({
					open: true,
					type: 'error',
					message: 'Vui lòng nhập đầy đủ thông tin',
				});
			} else if (moment(sendingTime).isBefore(new Date())) {
				setSnackbar({
					open: true,
					type: 'error',
					message: 'Thời gian gửi không hợp lệ',
				});
			} else if (
				(investmentFund?.id === 2 ||
					item?.type === process.env.REACT_APP_TYPE_AGRICUTURAL) &&
				parseInt(period || item?.period) === 1
			) {
				setSnackbar({
					open: true,
					type: 'error',
					message:
						'Quỹ phát triển nông nghiệp phải gửi từ 2 mùa trở lên.',
				});
			} else if (!disbursement) {
				setSnackbar({
					open: true,
					type: 'error',
					message: 'Vui lòng chờ tính toán tổng giải ngân.',
				});
			} else {
				setIsModalSubmit(true);
			}
		} else {
			setSnackbar({
				open: true,
				type: 'error',
				message: <LoginRegisterCp />,
			});
		}
	};
	const handleSubmit = async () => {
		await 1;
		setIsProcessSubmit(true);
		requestRefreshToken(
			currentUser,
			handleSendFund,
			state,
			dispatch,
			setData,
			setSnackbar,
		);
		alert(
			'Thông tin này đã được gửi về bộ phận quản lý quỹ, bộ phận sẽ sớm liên hệ quý khách để tiến hành làm hợp đồng!',
		);
	};
	const totalAssets = dataAssets?.fund_wallet + 0 + dataAssets?.surplus;
	const valueSelectTypeFund = investmentFund?.name
		? investmentFund?.name
		: item?.type === process.env.REACT_APP_TYPE_USD
		? 'Quỹ đầu tư USD'
		: item?.type === process.env.REACT_APP_TYPE_AGRICUTURAL
		? 'Quỹ phát triển nông nghiệp'
		: '';
	const periodFund = () => {
		if (period) {
			return period;
		} else {
			return item?.period?.toString();
		}
	};
	const unitFund = () => {
		if (investmentFund) {
			return investmentFund?.id === 1
				? 'Tháng'
				: investmentFund?.id === 2
				? 'Mùa'
				: '';
		} else {
			return item?.type === process.env.REACT_APP_TYPE_USD
				? 'Tháng'
				: item?.type === process.env.REACT_APP_TYPE_AGRICUTURAL
				? 'Mùa'
				: '';
		}
	};
	const depositsFund = () => {
		if (investmentFund) {
			return '---';
		} else if (item?.capital) {
			return (
				`Bạn chọn gói ${
					item?.type === process.env.REACT_APP_TYPE_AGRICUTURAL
						? 'hạn mức '
						: ''
				}` +
				item?.capital?.toString()?.replace('M', '') +
				' triệu đồng'
			);
		} else {
			return '---';
		}
	};
	const codeHD = () => {
		if (investmentFund) {
			return investmentFund?.id === 1 ? 'HDQDTUSD' : 'HDQPTNN';
		} else {
			return item?.type === process.env.REACT_APP_TYPE_USD
				? 'HDQDTUSD'
				: 'HDQPTNN';
		}
	};
	const packageHD = () => {
		if (investmentFund) {
			return investmentFund?.id === 1
				? 'QUỸ ĐẦU TƯ USD'
				: 'QUỸ PHÁT TRIỂN NÔNG NGHIỆP';
		} else {
			return item?.type === process.env.REACT_APP_TYPE_USD
				? 'QUỸ ĐẦU TƯ USD'
				: 'QUỸ PHÁT TRIỂN NÔNG NGHIỆP';
		}
	};
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000"
				title1="GỬI"
				title2="QUỸ"
				animateName="animate__fadeInTopRight"
			/>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className={`${cx('body')}`}>
				{currentUser && (
					<TotalAssetsAndFund
						isShow={isShow}
						toogleIsShow={toogleIsShow}
					>
						<TotalItem
							title="Tổng tài sản"
							price={totalAssets}
							isShow={isShow}
						/>
						<TotalItem
							title="Ví quỹ"
							price={dataAssets?.fund_wallet || 0}
							isShow={isShow}
						/>
						<TotalItem
							title="Ví đầu tư"
							price={0}
							isShow={isShow}
						/>
						<TotalItem
							title="Số dư"
							price={dataAssets?.surplus || 0}
							isShow={isShow}
						/>
					</TotalAssetsAndFund>
				)}
				<div className={`${cx('list_info_container')}`}>
					<div className={`${cx('list_info_item')}`}>
						<div className={`${cx('item_text')}`}>
							<i class="fa-regular fa-paper-plane"></i>
							<span>Thông tin gửi quỹ</span>
						</div>
						<div className={`${cx('menu_conatiner')}`}>
							<SelectValueCp
								label="Chọn quỹ đầu tư"
								value={valueSelectTypeFund}
								placeholder="---"
								data={DATA_INVESTMENT}
								nameSet="investmentFund"
								stateSelect={showSelect}
								setStateSelect={setShowSelect}
							/>
							<SelectDateCp
								label="Thời gian gửi"
								value={sendingTime}
								nameSet="sendingTime"
							/>
							<FormInput
								label="Kỳ hạn"
								placeholder="---"
								value={periodFund()}
								name="period"
								onChange={(e) => {
									if (item?.period) {
										item.period = '';
									}
									dispatch(
										setData({ period: e.target.value }),
									);
								}}
								classNameField={`mt8`}
								unit={unitFund()}
							/>
							<FormInput
								label="Số tiền gửi"
								placeholder={depositsFund()}
								type="text"
								value={deposits}
								name="deposits"
								onChange={(e) => {
									dispatch(
										setData({
											deposits:
												autoFormatNumberInputChange(
													e.target.value,
												),
										}),
									);
								}}
								unit={deposits && 'VND'}
							/>
						</div>
					</div>
					<div className={`${cx('list_info_item')}`}>
						<div className={`${cx('menu_conatiner')}`}>
							<FormInput
								label="Tổng tiền giải ngân"
								value={formatVNDCurrency(
									disbursement?.disbursement || 0,
								)}
								readOnly
							/>
							<div
								className={`${cx('text_desc')} cancel fwb`}
								onClick={handleModalContractTrue}
							>
								*Các quy định về hợp đồng
							</div>
							<Button
								className={`${cx('btn_submit')} infobgcbold`}
								onClick={handleContinue}
								isProcess={isProcessSendFund}
								disabled={
									isProcessSendFund ||
									!disbursement?.disbursement
								}
							>
								Tiếp tục
							</Button>
						</div>
					</div>
				</div>
			</div>
			{isModalContract && (
				<Modal
					openModal={handleModalContractTrue}
					closeModal={handleModalContractFalse}
					titleHeader="Quy định về hợp đồng"
					hideButton={true}
				>
					<div className={`${cx('contract_container')}`}>
						<div className={`${cx('text_contract_desc')} info`}>
							Đang cập nhật...
						</div>
					</div>
				</Modal>
			)}
			{isModalSubmit && (
				<Modal
					openModal={handleModalSubmitTrue}
					closeModal={handleModalSubmitFalse}
					titleHeader="Xác nhận hợp đồng"
					actionButtonText="Xác nhận"
					classNameButton={`infobgcbold`}
					onClick={handleSubmit}
					isProcess={isProcessSubmit}
				>
					<CustomcareLine
						title="Mã HD:"
						textLink={`${
							ID_FINAL ? ID_FINAL + 1 : 1
						}/${new Date().getFullYear()}/${codeHD()}`}
						marginLeft={0}
					/>
					<CustomcareLine
						title="Tên:"
						textLink={currentUser?.username}
						marginLeft={0}
					/>
					<CustomcareLine
						title="Gói:"
						textLink={packageHD()}
						marginLeft={0}
					/>
					<CustomcareLine
						title="Thời gian gửi:"
						textLink={dateFormat(sendingTime, 'DD/MM/YYYY')}
						marginLeft={0}
					/>
					<CustomcareLine
						title="Kỳ hạn:"
						textLink={`${period || item?.period} ${unitFund()}`}
						marginLeft={0}
					/>
					<CustomcareLine
						title="Vốn:"
						textLink={formatVND(deposits || 0)}
						marginLeft={0}
					/>
					<CustomcareLine
						title="Giải ngân:"
						textLink={formatVNDCurrency(
							disbursement?.disbursement || 0,
						)}
						marginLeft={0}
						noneBorderBottom
					/>
				</Modal>
			)}
		</div>
	);
}
