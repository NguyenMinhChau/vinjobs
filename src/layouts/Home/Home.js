import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import styles from './Home.module.css';
import {
	ButtonCus,
	ContentOne,
	ContentTwo,
	OwnerItem,
	SliderHome,
} from '../../components';
import { routers } from '../../routers';
import { Link } from 'react-router-dom';
import LOGO_COMPANY from '../../assets/images/logo-company.png';

const cx = className.bind(styles);

export default function Home() {
	useEffect(() => {
		document.title = `Trang chủ | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHome
				urlImage="https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8am9ic3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000"
				title1="VINJOB © "
				title2="AIKING GROUP"
				desc="Block A, Tòa nhà RiverGate, 151-155 Bến Vân Đồn, Phường
                        6, Quận 4,TP.HCM"
				btnText="Xem trên Map"
				urlBtn="https://goo.gl/maps/AXDCkXAcn9nvQp226"
			/>
			<div className={`${cx('wrapper-content')}`}>
				<ContentOne
					// textVerticle="Chúng tôi là ai?"
					title1="VINJOB "
					title2="MASKS"
					desc={[
						'Immortal Masks is the leader in Silicone Masks and Custom Creatures created by REAL Hollywood FX Artists! Our Hyper Realistic Silicone Masks are created with our amazing FLEX FUSION SYSTEM to ensure the most durable silicone masks in the industry.',
						'From Silicone Masks, Custom Props, Full Character Creations, Creature Suits, Full Hair Punching or a completely Custom Project, Immortal is your only choice for quality & professional products!',
					]}
					btnText="Về chúng tôi"
					urlBtn={routers.home}
					urlImage={LOGO_COMPANY}
				/>
				<ContentTwo
					titleHeader="NOW LAUNCHED!"
					// textVerticle="NEW THREADS"
					title1="VINJOB"
					title2="THREADS"
					desc={[
						'Our new Immortal Threads product line has launched! The highest possible quality costumes to go along with your Immortal Mask!',
					]}
					urlImage={LOGO_COMPANY}
				>
					<Link to="/" className={`${cx('link')}`}>
						Take a look!
					</Link>
				</ContentTwo>
				<div
					className={`${cx('list-owner-container')} mt50`}
					data-aos="flip-right"
				>
					<div className={`${cx('title-header')}`}>
						GẶP GỠ{' '}
						<span className={`${cx('text-primary')}`}>CEO</span> CỦA
						CHÚNG TÔI
					</div>
					<div className={`${cx('list-container')}`}>
						<OwnerItem
							urlImage={LOGO_COMPANY}
							urlBtn="/"
							nameOwner="ANDREW FREEMAN"
							positionOwner="CO-OWNER/FOUNDER"
						/>
						<OwnerItem
							urlImage={LOGO_COMPANY}
							urlBtn="/"
							nameOwner="ANDREW FREEMAN"
							positionOwner="CO-OWNER/FOUNDER"
						/>
						<OwnerItem
							urlImage={LOGO_COMPANY}
							urlBtn="/"
							nameOwner="ANDREW FREEMAN"
							positionOwner="CO-OWNER/FOUNDER"
						/>
					</div>
				</div>
				<div
					className={`${cx('get-around-container')} mt50`}
					data-aos="flip-down"
				>
					<div className={`${cx('title-header')}`}>
						ĐỒNG HÀNH CÙNG{' '}
						<span className={`${cx('text-primary')}`}>VINJOB</span>
					</div>
					<div className={`${cx('list-get-around-container')}`}>
						<Swiper
							slidesPerView={3}
							spaceBetween={10}
							// centeredSlides={true}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							pagination={{
								clickable: true,
							}}
							// navigation={true}
							modules={[Autoplay]}
							className={`${cx('mySwiper')}`}
						>
							<SwiperSlide>
								<div className={`${cx('item-get-around')}`}>
									<div
										className={`${cx('image-get-around')}`}
										style={{
											backgroundImage: `url(${LOGO_COMPANY})`,
										}}
									></div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${cx('item-get-around')}`}>
									<div
										className={`${cx('image-get-around')}`}
										style={{
											backgroundImage: `url(${LOGO_COMPANY})`,
										}}
									></div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${cx('item-get-around')}`}>
									<div
										className={`${cx('image-get-around')}`}
										style={{
											backgroundImage: `url(${LOGO_COMPANY})`,
										}}
									></div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${cx('item-get-around')}`}>
									<div
										className={`${cx('image-get-around')}`}
										style={{
											backgroundImage: `url(${LOGO_COMPANY})`,
										}}
									></div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${cx('item-get-around')}`}>
									<div
										className={`${cx('image-get-around')}`}
										style={{
											backgroundImage: `url(${LOGO_COMPANY})`,
										}}
									></div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${cx('item-get-around')}`}>
									<div
										className={`${cx('image-get-around')}`}
										style={{
											backgroundImage: `url(${LOGO_COMPANY})`,
										}}
									></div>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
				<ContentTwo
					titleHeader="NOW LAUNCHED!"
					// textVerticle="VINJOB"
					title1="VINJOB"
					title2="THREADS"
					left="-30px"
					top="30px"
				>
					<div className={`${cx('line')}`}>
						<span className="fwb fz16">Địa chỉ:</span> BLOCK A, TÒA
						NHÀ RIVERGATE, 151-155 BẾN VÂN ĐỒN, PHƯỜNG 6, QUẬN
						4,TP.HCM.
					</div>
					<div className={`${cx('line')}`}>
						<span className="fwb fz16">Số điện thoại:</span>{' '}
						<a href="tel:0345335422">0345 335 422</a>
					</div>
					<div className={`${cx('line')}`}>
						<span className="fwb fz16">Email:</span>{' '}
						<a href="mailto:support@vinjob.com.vn">
							support@vinjob.com.vn
						</a>
					</div>
					<div className="flex-center mt30">
						<ButtonCus
							urlBtn="mailto:support@vinjob.com.vn"
							btnText="Gửi mail cho chúng tôi"
							className={`${cx('btn-cus')}`}
						/>
					</div>
				</ContentTwo>
			</div>
		</div>
	);
}
