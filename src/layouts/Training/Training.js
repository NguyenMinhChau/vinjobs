import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Training.module.css';
import { SliderHeader } from '../../components';

const cx = className.bind(styles);

export default function Training() {
	useEffect(() => {
		document.title = `Đào tạo | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGpvYnN8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000"
				title1="ĐÀO"
				title2="TẠO"
				animateName="animate__bounceInUp"
			/>
		</div>
	);
}
