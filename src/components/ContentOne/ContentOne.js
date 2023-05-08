import React from 'react';
import className from 'classnames/bind';
import styles from './ContentOne.module.css';
import ButtonCus from '../ButtonCus/ButtonCus';

const cx = className.bind(styles);

export default function ContentOne({
	textVerticle,
	title1,
	title2,
	desc = [],
	btnText,
	urlBtn,
	urlImage,
	children,
	left,
	top,
}) {
	return (
		<div className={`${cx('content-container')}`} data-aos="fade-up">
			<div className={`${cx('content-left')}`}>
				<div
					className={`${cx('left')}`}
					style={{ top: top, left: left }}
				>
					{textVerticle}
				</div>
				<div className={`${cx('middle')}`}>
					<div className={`${cx('middle_title')} mb12`}>
						{title1}
						<span className={`${cx('title2')}`}>{title2}</span>
					</div>
					<div className={`${cx('middle_desc')}`}>
						{desc.map((item, index) => (
							<p
								className={`${cx('middle_desc_text')}`}
								key={index}
							>
								{item}
							</p>
						))}
						{children}
					</div>
					<ButtonCus
						urlBtn={urlBtn}
						btnText={btnText}
						className={`${cx('btn-cus')}`}
						classNameWrapper="flex-center mt30"
					/>
				</div>
			</div>
			<div className={`${cx('content-right')}`}>
				<div
					className={`${cx('right_img')}`}
					style={{
						backgroundImage: `url('${urlImage}')`,
					}}
				></div>
			</div>
		</div>
	);
}
