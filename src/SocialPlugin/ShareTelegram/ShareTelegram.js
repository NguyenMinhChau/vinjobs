import React from 'react';
import className from 'classnames/bind';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import styles from './ShareTelegram.module.css';

const cx = className.bind(styles);

function ShareTelegram({ slug, name, desc, page }) {
	return (
		<div className={`${cx('share-linkedln')} ml8 mb8`}>
			<TelegramShareButton
				title={name}
				summary="blabla"
				url={`https://vinjob.com.vn/${page}/detail/${slug}`}
				className="flex-start"
			>
				<TelegramIcon style={{ height: '25px', width: '25px' }} />
				<p className={`${cx('name_social_share')} ml8`}>Telegram</p>
			</TelegramShareButton>
		</div>
	);
}

export default ShareTelegram;
