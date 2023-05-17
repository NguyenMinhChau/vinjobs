/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Jobs.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SliderHeader } from '../../components';
import LOGO_SLIDER_HEADER from '../../assets/images/logo-company.png';
import { routers } from '../../routers';
import moment from 'moment';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';
import { autoFormatNumberInputChange } from '../../utils/format/NumberFormat';

const cx = className.bind(styles);

export default function Jobs() {
	const { state, dispatch } = useAppContext();
	const {
		pagination: { page, show },
	} = state.set;
	useEffect(() => {
		document.title = `Việc làm | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	let showPage = 5;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	let DATA_JOB = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	let DATA_JOBS_FLAG = DATA_JOB?.filter((row, index) => {
		if (index + 1 >= start && index + 1 <= end) return true;
	});
	const totalData = DATA_JOB.length;
	const handleChangePage = (e, value) => {
		dispatch(
			actions.setData({
				pagination: {
					...state.set.pagination,
					page: parseInt(value),
				},
			}),
		);
	};
	const handleViewDetail = (item) => {
		dispatch(
			actions.setData({
				setItem: {
					idItem: item,
					dataItem: item,
				},
			}),
		);
	};
	const RenderItemJob = ({ data }) => {
		return (
			<>
				{data?.map((item, index) => {
					return (
						<div className={`${cx('list_item')}`} key={index}>
							<div className={`${cx('list_item_text')}`}>
								<p className={`${cx('title_job')}`}>
									Tiêu đề tuyển dụng {item}
								</p>
								<p className={`${cx('subtitle_job')}`}>
									{moment(new Date()).format('DD/MM/YYYY')} -
									Tên công ty - Lương bổng
								</p>
								<div className={`${cx('divider')}`}></div>
								<p className={`${cx('desc_job')}`}>
									HTML is the foundation of the web, and it
									provides various tags and attributes to
									enhance the performance and user experience
									of a website.
								</p>
								<div className={`${cx('link_container')}`}>
									<Link
										to={`${routers.jobs}${routers.detail}/${item}`}
										className={`${cx('link')}`}
										onClick={() => handleViewDetail(item)}
									>
										Xem chi tiết
									</Link>
								</div>
							</div>
							<div className={`${cx('list_item_image')}`}>
								<img
									src={LOGO_SLIDER_HEADER}
									alt=""
									className={`${cx('image_thumbnail')}`}
								/>
							</div>
						</div>
					);
				})}
			</>
		);
	};
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage={
					'https://images.unsplash.com/photo-1598257006675-0aaec40301f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fHJlY3J1aXRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=2000'
				}
				title={`<b>VIỆC LÀM</b>`}
				animateName="animate__bounceInUp"
			/>
			<div className={`${cx('container_jobs')}`}>
				<p className={`${cx('count_text')}`}>
					<i
						className="bx bxs-bell-ring bx-tada"
						style={{ color: '#157bfb' }}
					></i>{' '}
					{autoFormatNumberInputChange(totalData)} việc làm đang chờ
					bạn
				</p>
				<div className={`${cx('list_jobs')}`}>
					<RenderItemJob data={DATA_JOBS_FLAG} />
				</div>
				<div className={`${cx('pagination-countpage')}`}>
					<Stack
						spacing={2}
						className={`${cx('pagination-container')}`}
					>
						<Pagination
							onChange={handleChangePage}
							page={page}
							showFirstButton
							showLastButton
							count={
								parseInt(Math.ceil(totalData / showPage)) || 0
							}
							variant="outlined"
							shape="rounded"
						/>
					</Stack>
				</div>
			</div>
		</div>
	);
}
