/* eslint-disable no-unused-vars */
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
				urlImage={
					'https://images.unsplash.com/photo-1598257006675-0aaec40301f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fHJlY3J1aXRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=2000'
				}
				title={`<b>VIỆC LÀM</b>`}
				animateName="animate__bounceInUp"
			/>
			<SkeletonCP />
		</div>
	);
}
