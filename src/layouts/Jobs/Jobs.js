/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Jobs.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FormInput, SliderHeader, SnackbarCp } from '../../components';
import LOGO_COMPANY from '../../assets/images/logo-company.png';
import { routers } from '../../routers';
import moment from 'moment';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';
import { autoFormatNumberInputChange } from '../../utils/format/NumberFormat';
import { getAllJobContentSV } from '../../services/admin';
import { getFirstXLines } from '../../utils/getStringHTML';
import useDebounce from '../../utils/hooks/useDebounce';
import Typed from 'react-typed';

const cx = className.bind(styles);

export default function Jobs() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		pagination: { page, show },
		data: { dataJobs, dataUser },
		searchValue: { jobSearch },
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
	const getAllJobsSV = () => {
		getAllJobContentSV({
			setSnackbar,
			dispatch,
			state,
		});
	};
	useEffect(() => {
		getAllJobsSV();
		document.title = `Việc làm | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	let showPage = 5;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	let DATA_JOB = dataJobs;
	let DATA_JOBS_FLAG = DATA_JOB?.filter((row, index) => {
		if (index + 1 >= start && index + 1 <= end) return true;
	});
	const jobSearchDebounce = useDebounce(jobSearch, 300);
	if (jobSearchDebounce) {
		DATA_JOBS_FLAG = DATA_JOB?.filter((row, index) => {
			return (
				row?.namePost
					?.toLowerCase()
					.includes(jobSearchDebounce.toLowerCase()) ||
				row?.description
					?.toLowerCase()
					.includes(jobSearchDebounce.toLowerCase()) ||
				row?.wage
					?.toLowerCase()
					.includes(jobSearchDebounce.toLowerCase()) ||
				moment(row?.createdAt)
					.format('DD/MM/YYYY')
					?.toLowerCase()
					.includes(jobSearchDebounce.toLowerCase()) ||
				row?.location?.includes(jobSearchDebounce)
			);
		});
	}
	const totalData = jobSearchDebounce
		? DATA_JOBS_FLAG.length
		: DATA_JOB.length;
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
	const handleChangeSearch = (e) => {
		const { name, value } = e.target;
		dispatch(
			actions.setData({
				searchValue: {
					...state.set.searchValue,
					[name]: value,
				},
			}),
		);
	};
	const URL = process.env.REACT_APP_URL_IMAGE;
	const RenderItemJob = ({ data }) => {
		return (
			<>
				{data?.map((item, index) => {
					let count = (item?.content?.match(/(\n|<br>)/g) || [])
						.length;
					let content = '';
					if (count > 10) {
						content = getFirstXLines(item?.content, 10) + '...';
					} else {
						content = item?.content;
					}
					const location = item?.location?.join(', ');
					return (
						<div className={`${cx('list_item')}`} key={index}>
							<div className={`${cx('header')}`}>
								<img
									src={`${URL}${item?.thumbnail}`}
									alt=""
									onError={(e) =>
										(e.target.src = `${LOGO_COMPANY}`)
									}
									className={`${cx(
										'header_image_thumbnail',
									)}`}
								/>
								<div className={`${cx('header_right')}`}>
									<p className={`${cx('title_job')}`}>
										{item?.namePost}
									</p>
									<p
										className={`${cx('subtitle_job')}`}
										style={{ marginBottom: '8px' }}
									>
										Công ty: {item?.description}
									</p>
								</div>
							</div>

							<p
								className={`${cx('subtitle_job')}`}
								style={{ marginBottom: '8px' }}
							>
								Ngày đăng bài:{' '}
								{moment(item?.createdAt).format('DD/MM/YYYY')}
							</p>

							<p
								className={`${cx('subtitle_job')}`}
								style={{ marginBottom: '8px' }}
							>
								Lương: {item?.wage}
							</p>
							<div
								className={`${cx(
									'subtitle_job',
									'subtitle_job_location',
								)}`}
							>
								Khu vực tuyển dụng:{' '}
								<span className={`${cx('bage')}`}>
									{location}
								</span>
							</div>
							<div className={`${cx('divider')}`}></div>
							<div className={`${cx('content_container')}`}>
								<div
									className={`${cx('desc_job')}`}
									dangerouslySetInnerHTML={{
										__html: content,
									}}
								></div>
								<div className={`${cx('link_container')}`}>
									<Link
										to={`${routers.jobs}${routers.detail}/${item?._id}`}
										className={`${cx('link')}`}
										onClick={() => handleViewDetail(item)}
									>
										Xem chi tiết
									</Link>
								</div>
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
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className={`${cx('container_jobs')}`}>
				<div className={`${cx('content_header_container')}`}>
					<p className={`${cx('count_text')}`}>
						<i
							className="bx bxs-bell-ring bx-tada"
							style={{ color: '#157bfb' }}
						></i>{' '}
						{autoFormatNumberInputChange(totalData)} việc làm đang
						chờ bạn
					</p>
					<Typed
						strings={[
							'Tìm kiếm việc làm',
							'Đầy đủ các lĩnh vực',
							'Nhanh chóng, tiện lợi và hiệu quả',
						]}
						typeSpeed={60}
						backSpeed={30}
						showCursor={false}
						loop
						attr="placeholder"
						className={`${cx('content_search')}`}
					>
						<FormInput
							name="jobSearch"
							value={jobSearch}
							onChange={handleChangeSearch}
						/>
					</Typed>
				</div>
				<div className={`${cx('list_jobs')}`}>
					<RenderItemJob data={DATA_JOBS_FLAG} />
				</div>
				<div className={`${cx('pagination-countpage')}`}>
					{DATA_JOBS_FLAG.length > 0 ? (
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
									parseInt(Math.ceil(totalData / showPage)) ||
									0
								}
								variant="outlined"
								shape="rounded"
							/>
						</Stack>
					) : (
						<div className={`${cx('noda_text')}`}>
							{jobSearchDebounce ? (
								<span>
									Không tìm thấy việc làm:{' '}
									<b>{jobSearchDebounce}</b>
								</span>
							) : (
								<span>
									Hiện tại không có việc làm. Bạn vui lòng
									quay lại sau nhé!
								</span>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
