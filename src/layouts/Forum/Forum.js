import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Forum.module.css';
import { SkeletonCP, SliderHeader } from '../../components';

const cx = className.bind(styles);

export default function Forum() {
	useEffect(() => {
		document.title = `Diễn đàn | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage="https://images.unsplash.com/photo-1504670073073-6123e39e0754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGpvYnN8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000"
				title1="DIỄN"
				title2="ĐÀN"
				animateName="animate__fadeInBottomLeft"
			/>
			<SkeletonCP />
		</div>
	);
}
