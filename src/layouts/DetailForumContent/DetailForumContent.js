/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './DetailForumContent.module.css';
import { SliderHeader, SnackbarCp } from '../../components';
import moment from 'moment';
import { useAppContext } from '../../utils';
import { getJobByIdSV } from '../../services/admin';
import LOGO_COMPANY from '../../assets/images/logo-company.png';

const cx = className.bind(styles);

function DetailForumContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		setItem: { idItem, dataItem },
	} = state.set;
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const { idForum } = useParams();
	const getForumById = () => {
		getJobByIdSV({
			id_post: idForum,
			setSnackbar,
			dispatch,
			state,
		});
	};
	useEffect(() => {
		// getForumById();
		document.title = `Chi tiết diễn đàn | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	const URL = process.env.REACT_APP_URL_IMAGE;

	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				bgiClassName={'bgi_custom_filter_brightness_60'}
				classContainer={`${cx('slider_header_custom')}`}
				urlImage={`${URL}${dataItem?.thumbnail}`}
				title={`<b>${dataItem?.namePost || '---'}</b>`}
				animateName="animate__bounceInUp"
			/>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className={`${cx('detail_container')}`}>
				<div className={`${cx('list_item')}`}>
					<div className={`${cx('top_container')}`}>
						<div className={`${cx('content_container')}`}>
							<div
								className={`${cx('content_forum_container')}`}
								dangerouslySetInnerHTML={{
									__html: dataItem?.content,
								}}
							></div>
						</div>
					</div>
					<div className={`${cx('bottom_container')}`}>
						<div className={`${cx('actions_item')}`}>
							<i class="bx bx-like bx-tada"></i>{' '}
							<span>Thích</span>
						</div>
						<div className={`${cx('actions_item')}`}>
							<i class="bx bx-chat bx-tada"></i>{' '}
							<span>Bình luận</span>
						</div>
						<div className={`${cx('actions_item')}`}>
							<i class="bx bx-share bx-tada"></i>{' '}
							<span>Chia sẻ</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailForumContent;
