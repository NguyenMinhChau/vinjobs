/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './DetailJobContent.module.css';
import { SliderHeader, SnackbarCp } from '../../components';
import moment from 'moment';
import { useAppContext } from '../../utils';
import { getJobByIdSV } from '../../services/admin';
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
	const getJobById = () => {
		getJobByIdSV({
			id_post: idContent,
			setSnackbar,
			dispatch,
			state,
		});
	};
	useEffect(() => {
		getJobById();
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
							Vị trí tuyển dụng: {dataItem?.post?.namePost}
						</p>
						<p
							className={`${cx('subtitle_job')}`}
							style={{ marginBottom: '8px' }}
						>
							{moment(dataItem?.post?.createdAt).format(
								'DD/MM/YYYY',
							)}{' '}
							- {dataItem?.post?.description} -{' '}
							{dataItem?.post?.wage}
						</p>
						<div
							className={`${cx(
								'subtitle_job',
								'subtitle_job_location',
							)}`}
						>
							<span>Khu vực:</span>{' '}
							<div className={`${cx('list_location')}`}>
								{dataItem?.post?.location?.map(
									(location, index) => {
										return (
											<div
												className={`${cx(
													'location_bage',
													'location_item',
												)}`}
												key={index}
											>
												{location}
											</div>
										);
									},
								)}
							</div>
						</div>
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
