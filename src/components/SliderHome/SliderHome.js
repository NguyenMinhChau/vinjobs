import React from 'react';
import className from 'classnames/bind';
// import Typed from 'react-typed';
import styles from './SliderHome.module.css';
import ButtonCus from '../ButtonCus/ButtonCus';

const cx = className.bind(styles);

export default function SliderHome({ urlImage, title, desc, btnText, urlBtn }) {
	return (
		<div className={`${cx('slider-home')}`}>
			<div
				className={`${cx('slider-image')}`}
				style={{
					backgroundImage: `url('${urlImage}')`,
				}}
			></div>
			<div className={`${cx('slider-text-container')}`}>
				<div
					className={`${cx(
						'slider-title',
					)} mb8 animate__animated animate__backInDown`}
				>
					<div
						className={`${cx('title')}`}
						dangerouslySetInnerHTML={{
							__html: title,
						}}
					></div>
					{/* <Typed
						strings={title}
						typeSpeed={50}
						backSpeed={50}
						showCursor={false}
					/> */}
				</div>
				<div
					className={`${cx(
						'slider-desc',
					)} animate__animated animate__backInUp`}
				>
					{desc}
				</div>
				{btnText && <ButtonCus urlBtn={urlBtn} btnText={btnText} />}
			</div>
		</div>
	);
}
