import React from 'react';
import className from 'classnames/bind';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';
import styles from './ShareLinkedln.module.css';

const cx = className.bind(styles);

function ShareLinkedln({ slug, name, desc, page }) {
	return (
		<div className={`${cx('share-linkedln')} ml8 mb8`}>
			<LinkedinShareButton
				title={name}
				summary="blabla"
				url={`https://vinjob.com.vn/${page}/detail/${slug}`}
				className="flex-start w100"
			>
				<LinkedinIcon
					style={{
						height: '25px',
						width: '25px',
						borderRadius: '50%',
					}}
				/>
				<p className={`${cx('name_social_share')} ml8`}>Linkedln</p>
			</LinkedinShareButton>
		</div>
	);
}

export default ShareLinkedln;
