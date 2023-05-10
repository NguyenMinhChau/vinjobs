import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Contact.module.css';
import { SkeletonCP, SliderHeader } from '../../components';

const cx = className.bind(styles);

export default function Contact() {
	useEffect(() => {
		document.title = `Liên hệ hợp tác | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGNvbnRhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=2000"
				title1="HOTLINE:"
				title2="0345.335.422"
				title3="EMAIL:"
				title4="vinjob@aiking.vn"
				animateName="animate__fadeInBottomRight"
			/>
			<SkeletonCP />
		</div>
	);
}
