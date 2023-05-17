/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './DetailJobContent.module.css';
import { SliderHeader, SnackbarCp } from '../../components';
import moment from 'moment';
import { useAppContext } from '../../utils';
import { getJobByIdSV } from '../../services/admin';
import { useState } from 'react';
import requestRefreshToken from '../../utils/axios/refreshToken';
import { actions } from '../../app/';

const cx = className.bind(styles);

function DetailJobContent() {
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
	const { idContent } = useParams();
	const getJobById = (dataToken) => {
		getJobByIdSV({
			id_post: idContent,
			setSnackbar,
			dispatch,
			state,
			token: dataToken?.token,
		});
	};
	useEffect(() => {
		requestRefreshToken(currentUser, getJobById, state, dispatch, actions);
		document.title = `Chi tiết việc làm | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	const URL = process.env.REACT_APP_URL_IMAGE;
	console.log(dataItem);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				bgiClassName={'bgi_custom_filter_brightness_80'}
				classContainer={`${cx('slider_header_custom')}`}
				urlImage={`${URL}${dataItem?.post?.thumbnail}`}
				title={`<b>${dataItem?.post?.namePost || '---'}  - ${
					dataItem?.post?.description || '---'
				}</b>`}
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
					<div className={`${cx('list_item_text')}`}>
						<p className={`${cx('title_job')}`}>
							{dataItem?.post?.namePost}
						</p>
						<p className={`${cx('subtitle_job')}`}>
							{moment(dataItem?.post?.createdAt).format(
								'DD/MM/YYYY',
							)}{' '}
							- {dataItem?.post?.description} -{' '}
							{dataItem?.post?.type}
						</p>
						<div className={`${cx('divider')}`}></div>
						<div
							className={`${cx('desc_job')}`}
							dangerouslySetInnerHTML={{
								__html: dataItem?.post?.content,
							}}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailJobContent;
