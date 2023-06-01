/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Contact.module.css';
import { FormInput, SkeletonCP, SliderHeader, Button } from '../../components';
import { TextareaAutosize } from '@mui/material';
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
				title={`<div><b>HOTLINE: <a href='tel:0345335422'>0345.335.422</a></b></div>
						<div><b>EMAIL: <a href='mailto:support@vinjob.com.vn'>support@vinjob.com.vn</a></b></div>`}
				animateName="animate__fadeInBottomRight"
			/>
			<div className={`${cx('container_content')}`}>
				<h1 className={`${cx('title_form')}`}>Liên hệ hợp tác</h1>
				<div className={`${cx('form_container')}`}>
					<FormInput
						placeholder="Nhập họ và tên..."
						name="username"
						classNameInput={`${cx('input_custom')}`}
					/>
					<FormInput
						placeholder="Nhập số điện thoại..."
						name="phone"
						classNameInput={`${cx('input_custom')}`}
					/>

					<FormInput
						placeholder="Nhập email..."
						name="email"
						classNameInput={`${cx('input_custom')}`}
					/>
					<TextareaAutosize
						minRows={5}
						maxRows={8}
						placeholder="Nội dung liên hệ?"
						// value={content}
						// onChange={handleChangeTextAreae}
						name="content"
						className={`${cx('textarea')}`}
					/>
					<Button className={`${cx('btn')} confirmbgc`}>Liên hệ</Button>
				</div>
			</div>
		</div>
	);
}
