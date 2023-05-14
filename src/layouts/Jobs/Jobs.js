import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Jobs.module.css';
import { SkeletonCP, SliderHeader } from '../../components';
import LOGO_SLIDER_HEADER from '../../assets/images/job_page_bgc.gif';

const cx = className.bind(styles);

export default function Jobs() {
	useEffect(() => {
		document.title = `Việc làm | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage={LOGO_SLIDER_HEADER}
				title={`<b>VIỆC LÀM</b>`}
				animateName="animate__bounceInUp"
			/>
			<SkeletonCP />
		</div>
	);
}
