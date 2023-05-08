import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Recruitment.module.css';
import { SliderHeader } from '../../components';

const cx = className.bind(styles);

export default function Recruitment() {
	useEffect(() => {
		document.title = `Tuyển dụng | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage="https://images.unsplash.com/photo-1504670073073-6123e39e0754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGpvYnN8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000"
				title1="TUYỂN"
				title2="DỤNG"
				animateName="animate__fadeInBottomLeft"
			/>
		</div>
	);
}
