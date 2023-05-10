import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Jobs.module.css';
import { SkeletonCP, SliderHeader } from '../../components';

const cx = className.bind(styles);

export default function Jobs() {
	useEffect(() => {
		document.title = `Việc làm | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGpvYnN8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000"
				title1="VIỆC"
				title2="LÀM"
				animateName="animate__bounceInUp"
			/>
			<SkeletonCP />
		</div>
	);
}
