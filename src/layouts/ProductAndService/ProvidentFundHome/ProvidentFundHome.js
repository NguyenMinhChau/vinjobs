/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ProvidentFundHome.module.css';
import {
	FundMenuAndSlider,
	MenuItem as MenuItemFund,
	SiderFund,
	SliderHeader,
	SnackbarCp,
	TotalAssetsAndFund,
	TotalItem,
} from '../../../components';
import { routers } from '../../../routers';
import { useAppContext } from '../../../utils';
import { userGetAssetSV } from '../../../services/user';
import requestRefreshToken from '../../../utils/axios/refreshToken';
import { setData } from '../../../app/reducer';
import { DataFundUSD } from '../../../utils/dataFund/usd';
import { DataFundAgricutural } from '../../../utils/dataFund/agricutural';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';

const cx = className.bind(styles);

const IMAGE_SLIDERS = [
	{
		id: 1,
		url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3VzdG9tZXIlMjBzZXJ2aWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
	},
];

export default function ProvidentFundHome() {
	const { state, dispatch } = useAppContext();
	const { currentUser, dataAssets } = state.set;
	const [isShow, setIShow] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const handleSendAssets = (dataToken) => {
		userGetAssetSV({
			id_user: currentUser?.id,
			token: dataToken?.token,
			dispatch,
			setSnackbar,
		});
	};
	useEffect(() => {
		document.title = `Quỹ tiết kiệm | ${process.env.REACT_APP_TITLE_WEB}`;
		requestRefreshToken(
			currentUser,
			handleSendAssets,
			state,
			dispatch,
			setData,
			setSnackbar,
		);
	}, []);
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const toogleIsShow = () => {
		setIShow(!isShow);
	};
	const totalAssets = dataAssets?.fund_wallet + 0 + dataAssets?.surplus;
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000"
				title1="QUỸ"
				title2="TIẾT KIỆM"
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
				<FundMenuAndSlider
					imageSliders={IMAGE_SLIDERS}
					title="Menu"
					nameIconTitle="bx bx-menu"
				>
					<MenuItemFund
						title="Quỹ"
						nameIcon="bx bxs-bank"
						to={`${routers.providentFund}/${routers.fund}`}
					/>
					<MenuItemFund
						title="Đầu tư"
						nameIcon="bx bx-donate-heart"
						to={`${routers.providentFund}/${routers.investment}`}
					/>
					<MenuItemFund
						title="Đối tác"
						nameIcon="fa-solid fa-users"
						to={`${routers.providentFund}/${routers.partner}`}
					/>
					<MenuItemFund
						title="CSKH"
						nameIcon="bx bx-phone"
						to={`${routers.providentFund}/${routers.customcare}`}
					/>
				</FundMenuAndSlider>
				<div className={`${cx('title_fund')}`}>Các quỹ đầu tư</div>
				<FundMenuAndSlider
					imageSlidersProduct={DataFundAgricutural}
					padding={0}
					margin={0}
				>
					<div className={`${cx('list_fund_slider')}`}>
						<Swiper
							slidesPerView={1}
							spaceBetween={0}
							centeredSlides={true}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							pagination={{
								clickable: true,
							}}
							modules={[Autoplay, Pagination]}
							className={`${cx('mySwiper')}`}
						>
							{DataFundUSD.map((item, index) => (
								<SwiperSlide key={index}>
									<SiderFund item={item} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</FundMenuAndSlider>
			</div>
		</div>
	);
}
