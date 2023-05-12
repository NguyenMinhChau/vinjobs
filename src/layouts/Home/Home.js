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
import LOGO_COMPANY from '../../assets/images/logo-company.png';

const cx = className.bind(styles);

export default function Home() {
	useEffect(() => {
		document.title = `Chúng tôi | ${process.env.REACT_APP_TITLE_WEB}`;
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
					title1="Giới thiệu "
					title2="VINJOB"
					desc={[
						`Vinjob là công ty tuyển dụng nhân sự chuyên nghiệp thuộc tập đoàn <b><a href='https://fiam.vn/' target="_blank">AIKING GROUP</a></b> - một trong những tập mới được thành lập đầy trẻ trung và nhiệt huyết tại Việt Nam. Với sứ mệnh giúp đỡ các doanh nghiệp và cá nhân tìm kiếm và sử dụng nguồn nhân lực chất lượng, Vinjob tự hào là đối tác tin cậy của nhiều công ty lớn trên toàn quốc.`,
						`Đội ngũ các nhà tuyển dụng trẻ trung đầy nhiệt huyết của chúng tôi luôn tận tâm cung cấp các giải pháp tuyển dụng tùy chỉnh phù hợp với nhu cầu cụ thể. Chúng tôi hiểu rằng mọi doanh nghiệp đều khác nhau và đó là lý do tại sao chúng tôi dành thời gian để tìm hiểu về công ty, văn hóa và yêu cầu tuyển của từng công ty.`,
					]}
					urlImage={LOGO_COMPANY}
				/>
				<ContentTwo
					title1="CAM KẾT CỦA "
					title2="VINJOB"
					desc={[
						`Vinjob cam kết đem đến các giải pháp tuyển dụng toàn diện và đáp ứng được nhu cầu của khách hàng. Chúng tôi cung cấp dịch vụ tuyển dụng cho nhiều lĩnh vực khác nhau, từ các công ty mới thành lập đến các doanh nghiệp lớn, từ các lĩnh vực công nghệ đến các lĩnh vực tài chính,quản lý dự án, đến lĩnh vực như kỹ thuật, công nghệ, y tế, giáo dục và nghệ thuật.`,
						`Chúng tôi hiểu rõ rằng tuyển dụng nhân sự là một phần quan trọng của thành công kinh doanh. Do đó, chúng tôi luôn sẵn sàng lắng nghe và hiểu rõ nhu cầu tuyển dụng của khách hàng và cung cấp các giải pháp tuyển dụng phù hợp nhất. Vinjob không chỉ đưa ra những giải pháp tuyển dụng tối ưu nhất, mà còn hỗ trợ các ứng viên với tư vấn nghề nghiệp và phát triển kỹ năng chuyên môn để họ có thể trở thành những nhân tài đáng giá. Với tinh thần nhiệt huyết và sự sáng tạo, Vinjob sẽ không ngừng nỗ lực để đem đến sự hài lòng và tin tưởng từ khách hàng.`,
					]}
					urlImage={LOGO_COMPANY}
				>
					{/* <Link to="/" className={`${cx('link')}`}>
						Take a look!
					</Link> */}
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
						<p className={`${cx('text_desc')}`}>
							Nếu bạn đang tìm kiếm một đối tác tuyển dụng nhân sự
							đáng tin cậy, hãy liên hệ với chúng tôi. Chúng tôi
							sẵn sàng hỗ trợ bạn trong mọi nhu cầu tuyển dụng của
							bạn.
						</p>
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
				<ContentTwo title1="LIÊN HỆ VỚI " title2="VINJOB">
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
