/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Contact.module.css';
import { SkeletonCP, SliderHeader } from '../../components';
import LOGO_SLIDER_HEADER from '../../assets/images/contact_page_bgc.png';

const cx = className.bind(styles);

export default function Contact() {
	useEffect(() => {
		document.title = `Liên hệ hợp tác | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage={LOGO_SLIDER_HEADER}
				title={`<div><b>HOTLINE: <a href='tel:0345335422' class='text-primary'>0345.335.422</a></b></div>
						<div><b>EMAIL: <a href='mailto:support@vinjob.com.vn' class='text-primary'>support@vinjob.com.vn</a></b></div>`}
				animateName="animate__fadeInBottomRight"
			/>
			<SkeletonCP />
		</div>
	);
}
