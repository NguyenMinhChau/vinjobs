/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Forum.module.css';
import { SkeletonCP, SliderHeader } from '../../components';
import LOGO_SLIDER_HEADER from '../../assets/images/forum_page_bgc.gif';

const cx = className.bind(styles);

export default function Forum() {
	useEffect(() => {
		document.title = `Diễn đàn | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage={
					'https://images.unsplash.com/photo-1468971050039-be99497410af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fHJlY3J1aXRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=2000'
				}
				title={`<b>DIỄN ĐÀN</b>`}
				animateName="animate__fadeInBottomLeft"
			/>
			<SkeletonCP />
		</div>
	);
}
