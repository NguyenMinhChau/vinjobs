/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './DetailJobContent.module.css';
import { SliderHeader } from '../../components';
import moment from 'moment';
import { useAppContext } from '../../utils';

const cx = className.bind(styles);

function DetailJobContent() {
	const { state } = useAppContext();
	const {
		setItem: { idItem, dataItem },
	} = state.set;
	const { idContent } = useParams();
	useEffect(() => {
		document.title = `Chi tiết việc làm | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage={
					'https://images.unsplash.com/photo-1598257006675-0aaec40301f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fHJlY3J1aXRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=2000'
				}
				title={`<b>TIÊU ĐỀ TUYỂN DỤNG ${
					idItem || idContent
				} - TÊN CÔNG TY</b>`}
				animateName="animate__bounceInUp"
			/>
			<div className={`${cx('detail_container')}`}>
				<div className={`${cx('list_item')}`}>
					<div className={`${cx('list_item_text')}`}>
						<p className={`${cx('title_job')}`}>
							Tiêu đề tuyển dụng {idItem || idContent}
						</p>
						<p className={`${cx('subtitle_job')}`}>
							{moment(new Date()).format('DD/MM/YYYY')} - Tên công
							ty - Lương bổng
						</p>
						<div className={`${cx('divider')}`}></div>
						<p className={`${cx('desc_job')}`}>
							HTML is the foundation of the web, and it provides
							various tags and attributes to enhance the
							performance and user experience of a website.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailJobContent;
