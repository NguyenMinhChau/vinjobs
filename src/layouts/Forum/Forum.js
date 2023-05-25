/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Forum.module.css';
import {
	FormInput,
	Modal,
	SkeletonCP,
	SliderHeader,
	SnackbarCp,
} from '../../components';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import LOGO_COMPANY from '../../assets/images/logo-company.png';
import { useAppContext } from '../../utils';
import { autoFormatNumberInputChange } from '../../utils/format/NumberFormat';
import { routers } from '../../routers';
import moment from 'moment';
import useDebounce from '../../utils/hooks/useDebounce';
import { actions } from '../../app/';
import { getFirstXLines } from '../../utils/getStringHTML';
import Typed from 'react-typed';
import {
	ShareFB,
	ShareLinkedln,
	ShareTelegram,
	LikeFB,
} from '../../SocialPlugin';

const cx = className.bind(styles);
// HELLO
export default function Forum() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		pagination: { page, show },
		data: { dataJobs, dataForum, dataUser },
		searchValue: { forumSearch },
		setItem: { dataItem },
	} = state.set;
	const [modalDetail, setModalDetail] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	const [idItem, setIdItem] = useState(null);
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
	const closeModalDetail = () => {
		setModalDetail(false);
	};
	const openModalDetail = (item) => {
		setModalDetail(true);
		dispatch(
			actions.setData({
				setItem: {
					idItem: item,
					dataItem: item,
				},
			}),
		);
	};
	const toggleShare = (id) => {
		setIdItem(id);
		setOpenShare(!openShare);
	};
	useEffect(() => {
		document.title = `Diễn đàn | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	let showPage = 5;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	let DATA_JOB = dataJobs;
	let DATA_FORUMS_FLAG = DATA_JOB?.filter((row, index) => {
		if (index + 1 >= start && index + 1 <= end) return true;
	});
	const forumSearchDebounce = useDebounce(forumSearch, 300);
	if (forumSearchDebounce) {
		DATA_FORUMS_FLAG = DATA_JOB?.filter((row, index) => {
			return (
				row?.namePost
					?.toLowerCase()
					.includes(forumSearchDebounce.toLowerCase()) ||
				row?.description
					?.toLowerCase()
					.includes(forumSearchDebounce.toLowerCase()) ||
				moment(row?.createdAt)
					.format('DD/MM/YYYY')
					?.toLowerCase()
					.includes(forumSearchDebounce.toLowerCase())
			);
		});
	}
	const totalData = forumSearchDebounce
		? DATA_FORUMS_FLAG.length
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
	const URL = process.env.REACT_APP_URL_IMAGE;
	const RenderItemForum = ({ data }) => {
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
					return (
						<div className={`${cx('list_item')}`} key={index}>
							<div className={`${cx('top_container')}`}>
								<Link
									to={`${routers.forum}${routers.detail}/${item?._id}`}
									className={`${cx('image_container')}`}
									onClick={() => handleViewDetail(item)}
								>
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
								</Link>
								<div className={`${cx('content_container')}`}>
									<Link
										to={`${routers.forum}${routers.detail}/${item?._id}`}
										className={`${cx('title_forum')}`}
										onClick={() => handleViewDetail(item)}
									>
										{item?.namePost}
									</Link>
									<div
										className={`${cx(
											'content_forum_container',
										)}`}
										dangerouslySetInnerHTML={{
											__html: content,
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
								<div
									className={`${cx(
										'actions_item',
										'actions_item_relative',
									)}`}
									onClick={() => toggleShare(item?._id)}
								>
									<i class="bx bx-share bx-tada"></i>{' '}
									<span>Chia sẻ</span>
									{openShare && item?._id === idItem && (
										<div
											className={`${cx(
												'actions_item_absolute',
											)}`}
										>
											<ShareFB
												slug={item?._id}
												name={item?.namePost}
												desc={item?.description}
												page="forum"
											/>
											<ShareLinkedln
												slug={item?._id}
												name={item?.namePost}
												desc={item?.description}
												page="forum"
											/>
											<ShareTelegram
												slug={item?._id}
												name={item?.namePost}
												desc={item?.description}
												page="forum"
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</>
		);
	};
	const RenderForumDetail = ({ item }) => {
		return (
			<div
				className={`${cx('content_forum_container')} mt0`}
				dangerouslySetInnerHTML={{
					__html: item?.content,
				}}
			></div>
		);
	};
	return (
		<div className={`${cx('container')}`}>
			<SliderHeader
				urlImage={
					'https://images.unsplash.com/photo-1468971050039-be99497410af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fHJlY3J1aXRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=2000'
				}
				title={`<b>DIỄN ĐÀN</b>`}
				animateName="animate__fadeInBottomLeft"
			/>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<div className={`${cx('container_forum')}`}>
				<div className={`${cx('content_header_container')}`}>
					<p className={`${cx('count_text')}`}>
						<i
							class="bx bx-news bx-tada"
							style={{ color: '#157bfb' }}
						></i>{' '}
						{DATA_FORUMS_FLAG.length > 0
							? `${autoFormatNumberInputChange(
									totalData,
							  )} tin tức mới nhất`
							: 'Hiện chưa có tin tức nào'}
					</p>
					<Typed
						strings={[
							'Tìm kiếm tin tức',
							'Luôn cập nhật những tin tức mới nhất',
							'Mang đến cho khách hàng thông tin chính xác nhất',
						]}
						typeSpeed={60}
						backSpeed={30}
						showCursor={false}
						loop
						attr="placeholder"
						className={`${cx('content_search')}`}
					>
						<FormInput
							name="forumSearch"
							value={forumSearch}
							onChange={handleChangeSearch}
						/>
					</Typed>
				</div>
				<div className={`${cx('list_forums_topics')}`}>
					<div className={`${cx('list_forums')}`}>
						<RenderItemForum data={DATA_FORUMS_FLAG} />
					</div>
					{DATA_FORUMS_FLAG.length > 0 && (
						<div className={`${cx('list_topics')}`}>
							<div className={`${cx('topics_container')}`}>
								<div className={`${cx('topic_title')}`}>
									<span>Chủ đề nóng</span>{' '}
									<span className={`${cx('line')}`}></span>
								</div>
								<div className={`${cx('ul_topics')}`}>
									<Link
										className={`${cx('li_topics')}`}
										to="##"
									>
										Công nghệ
									</Link>
									<Link
										className={`${cx('li_topics')}`}
										to="##"
									>
										Nhân sự
									</Link>
									<Link
										className={`${cx('li_topics')}`}
										to="##"
									>
										Tài chính
									</Link>
									<Link
										className={`${cx('li_topics')}`}
										to="##"
									>
										Dịch vụ
									</Link>
									<Link
										className={`${cx('li_topics')}`}
										to="##"
									>
										Chứng khoán
									</Link>
									<Link
										className={`${cx('li_topics')}`}
										to="##"
									>
										Cổ phiếu
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className={`${cx('pagination-countpage')}`}>
					{DATA_FORUMS_FLAG.length > 0 ? (
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
							{forumSearchDebounce ? (
								<span>
									Không tìm thấy tin tức:{' '}
									<b>{forumSearchDebounce}</b>
								</span>
							) : (
								<span>
									Hiện tại không có tin tức. Bạn vui lòng quay
									lại sau nhé!
								</span>
							)}
						</div>
					)}
				</div>
			</div>
			{modalDetail && (
				<Modal
					titleHeader={dataItem?.namePost || 'Chi tiết diễn đàn'}
					openModal={openModalDetail}
					closeModal={closeModalDetail}
				>
					<RenderForumDetail item={dataItem} />
				</Modal>
			)}
		</div>
	);
}
