import React from 'react';
import className from 'classnames/bind';
import styles from './ContentTwo.module.css';
import FormInput from '../FormInput/FormInput';
import ButtonCus from '../ButtonCus/ButtonCus';

const cx = className.bind(styles);

export default function ContentTwo({
	titleHeader,
	title,
	desc = [],
	urlImage,
	children,
	fontSizeTitle,
}) {
	return (
		<div className={`${cx('content-container')}`} data-aos="fade-right">
			{urlImage ? (
				<div className={`${cx('content-left')}`}>
					<div
						className={`${cx('left_img')}`}
						style={{
							backgroundImage: `url('${urlImage}')`,
						}}
					></div>
				</div>
			) : (
				<div className={`${cx('form')}`}>
					<div className={`${cx('top')}`}>
						<FormInput
							placeholder="Họ và tên"
							type="text"
							name="username"
							classNameField={`${cx('input-cus')}`}
						/>
						<FormInput
							placeholder="Số điện thoại"
							type="text"
							name="phone"
							classNameField={`${cx('input-cus')}`}
						/>
					</div>
					<div className={`${cx('bottom')}`}>
						<textarea
							rows="6"
							className={`${cx('textarea')}`}
							placeholder="Bạn đang nghĩ gì?"
						></textarea>
					</div>
					<ButtonCus
						btnText="Gửi"
						className={`${cx('btn-cus')} mt12`}
					/>
				</div>
			)}
			<div className={`${cx('content-right-container')}`}>
				{titleHeader && (
					<div className={`${cx('title-header')} mb12`}>
						{titleHeader}
					</div>
				)}
				<div className={`${cx('content-right')}`}>
					<div className={`${cx('middle')}`}>
						<div className={`${cx('middle_title')} mb12`}>
							<div
								style={{ fontSize: fontSizeTitle }}
								className={`${cx('title')}`}
								dangerouslySetInnerHTML={{ __html: title }}
							></div>
						</div>
						<div className={`${cx('middle_desc')}`}>
							{desc.map((item, index) => (
								<div
									className={`${cx('middle_desc_text')}`}
									key={index}
									dangerouslySetInnerHTML={{ __html: item }}
								></div>
							))}
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
