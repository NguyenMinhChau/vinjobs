import React from 'react';
import className from 'classnames/bind';
import styles from './ContentOne.module.css';
import ButtonCus from '../ButtonCus/ButtonCus';

const cx = className.bind(styles);

export default function ContentOne({
	textVerticle,
	title,
	desc = [],
	btnText,
	urlBtn,
	urlImage,
	children,
}) {
	return (
		<div className={`${cx('content-container')}`} data-aos="fade-up">
			<div className={`${cx('content-left')}`}>
				<div className={`${cx('left')}`}>{textVerticle}</div>
				<div className={`${cx('middle')}`}>
					<div className={`${cx('middle_title')} mb12`}>
						<div
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
					{btnText && (
						<ButtonCus
							urlBtn={urlBtn}
							btnText={btnText}
							className={`${cx('btn-cus')}`}
							classNameWrapper="flex-center mt30"
						/>
					)}
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
