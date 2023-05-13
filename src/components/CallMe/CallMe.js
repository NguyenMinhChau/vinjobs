import React from 'react';
import className from 'classnames/bind';
import styles from './CallMe.module.css';

const cx = className.bind(styles);

function CallMe({ bottom, left }) {
	return (
		<div
			className={`${cx('hotline-phone-ring-wrap')}`}
			style={{ bottom: bottom, left: left }}
		>
			<div className={`${cx('hotline-phone-ring')}`}>
				<div className={`${cx('hotline-phone-ring-circle')}`}></div>
				<div
					className={`${cx('hotline-phone-ring-circle-fill')}`}
				></div>
				<div className={`${cx('hotline-phone-ring-img-circle')}`}>
					<a href="tel:0345335422" className={`${cx('pps-btn-img')}`}>
						<img
							src="https://nguyenhung.net/wp-content/uploads/2019/05/icon-call-nh.png"
							alt="Gọi điện thoại"
							width="50"
						/>
					</a>
				</div>
			</div>
			<div className={`${cx('hotline-bar')}`}>
				<a href="tel:0345335422">
					<span className={`${cx('text-hotline')}`}>
						0345.335.422
					</span>
				</a>
			</div>
		</div>
	);
}

export default CallMe;
