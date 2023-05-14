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
				urlImage={LOGO_SLIDER_HEADER}
				title={`<b>DIỄN ĐÀN</b>`}
				animateName="animate__fadeInBottomLeft"
			/>
			<SkeletonCP />
		</div>
	);
}
