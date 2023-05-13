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
	SliderHome,
} from '../../components';
import LOGO_COMPANY from '../../assets/images/logo-company.png';
import LOGO_FAPV from '../../assets/images/fapv_logo.png';

const cx = className.bind(styles);

export default function Home() {
	useEffect(() => {
		document.title = `Chúng tôi | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHome
				urlImage="https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8am9ic3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000"
				title={`VINJOB © <a class='text-primary' href='https://fiam.vn/' target='_blank'>AIKING GROUP</a>`}
			/>
			<div className={`${cx('wrapper-content')}`}>
				<ContentOne
					title={`<b><span class='text-primary'>VINJOB</span> là nơi...</b>`}
					desc={[
						`- VINJOB cung cấp dịch vụ tuyển dụng <b>MỌI VỊ TRÍ</b> nhanh chóng, hiệu quả.`,
						`- Hỗ trợ doanh nghiệp/ công ty/ nhà máy tuyển dụng mọi lúc mọi nơi...`,
						`- Nơi kết nối doanh nghiệp với ứng viên <b>TOÀN QUỐC</b>. `,
						`- Nơi nào thiếu ứng viên nơi đó có <b>VINJOB</b>.`,
					]}
					urlImage={LOGO_COMPANY}
				/>
				<ContentTwo
					title={`<b>VÌ SAO <span class='text-primary'>VINJOB</span> MANG ĐẾN HIỆU QUẢ CHO DOANH NGHIỆP CỦA BẠN?</b>`}
					desc={[
						`- Đội ngũ hơn 50 chuyên viên Nhân Sự với hơn 10 năm kinh nghiệm trong ngành, đội ngũ chuyên nghiệp năng động giúp cho công ty của bạn bổ sung <b>Ngay Và Liền</b> các vị trí cần tìm.`,
						`- <span class='text-primary'>VINJOB</span> được điều hành bởi các chuyên gia hàng đầu trong lĩnh vực <b>NHÂN SỰ</b>.`,
						`- Đội ngũ <b>Chăm Sóc Khách Hàng</b> được đào tạo bài bản chuyên nghiệp. Hỗ trợ <b>24/7</b> tận tâm, ân cần, chu đáo.`,
					]}
					urlImage={LOGO_COMPANY}
				></ContentTwo>
				<ContentOne
					title={`<b>VÌ SAO <span class='text-primary'>VINJOB</span> LUÔN SÁT CÁNH CÙNG DOANH NGHIỆP CỦA BẠN NHỈ?</b>`}
					desc={[
						`- <b>Sứ mệnh</b>: <span class='text-primary'>VINJOB</span> cam kết không ngừng nâng cao, chất lượng sản phẩm, dịch vụ để mang đến lợi ích tốt nhất cho khách hàng.`,
						`- <b>Tầm nhìn</b>: Trở thành biểu tượng uy tín hàng đầu Việt Nam về cung cấp Dịch vụ tuyển dụng.`,
						`- <b>Giá trị cốt lõi</b>: `,
						`+ <b>Uy tín</b>: Luôn đặt chữ tín lên hàng đầu không ngừng hoàn thiện để đáp ứng đúng và cao hơn những cam kết.`,
						`+ <b>Trách nhiệm</b>: <span class='text-primary'>VINJOB</span> luôn đặt trách nhiệm lên hàng đầu với khách hàng, đối tác và toàn thể nhân viên.`,
					]}
					urlImage={LOGO_COMPANY}
				/>
				{/* <div
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
					</div>
				</div> */}
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
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							pagination={{
								clickable: true,
							}}
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
											backgroundImage: `url(${LOGO_FAPV})`,
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
					classContainer={'flex-row-reverse mb-flex-column-reverse'}
					fontSizeTitle="18px"
					title={`<b>Còn chần chờ gì nữa mà không nhấc máy lên liên hệ ngay với <span class='text-primary'>VINJOB</span> để doanh nghiệp của bạn có một đối tác tuyệt vời…</b>`}
				>
					<div className={`${cx('line')}`}>
						<span className="fwb fz16">
							Địa chỉ đăng ký kinh doanh:
						</span>{' '}
						Block A, Tòa nhà Rivergate, 151-155 Bến Vân Đồn, Phường
						6, Quận 4, Thành phố Hồ Chí Minh.
					</div>
					<div className={`${cx('line')}`}>
						<span className="fwb fz16">Địa chỉ trụ sở chính:</span>{' '}
						The River Thủ Thiêm, 23 Đ. Trần Bạch Đằng, An Khánh,
						Quận 2, Thành phố Hồ Chí Minh
					</div>
					<div className={`${cx('line')}`}>
						<span className="fwb fz16">Số điện thoại:</span>{' '}
						<a href="tel:0345335422">0345 335 422 (Ms.Thắm)</a>
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
