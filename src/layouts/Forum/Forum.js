/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import className from 'classnames/bind';
import styles from './Forum.module.css';
import {
	FormInput,
	Modal,
	SkeletonCP,
	SliderHeader,
	SnackbarCp,
	Button,
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
import Tooltip from '@mui/material/Tooltip';
import Picker from 'emoji-picker-react';
import { getAllJobContentSV } from '../../services/admin';
import { setStore, getStore } from '../../utils/localStore/localStore';
import fb, { Comments, Likes } from '../../firebase';

const cx = className.bind(styles);
// HELLO
export default function Forum() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		comment,
		pagination: { page, show },
		data: { dataJobs, dataForum, dataUser },
		searchValue: { forumSearch },
		setItem: { dataItem },
	} = state.set;
	const [modalDetail, setModalDetail] = useState(false);
	const [modalComment, setModalComment] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	const [openEmoji, setOpenEmoji] = useState(false);
	const [modalDeleteComment, setModalDeleteComment] = useState(false);
	const [isProcessComment, setIsProcessComment] = useState(false);
	const [isProcessUpdateComment, setIsProcessUpdateComment] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [idUpdate, setIdUpdate] = useState(null);
	const [isReplies, setIsReplies] = useState(false);
	const [idReplies, setIdReplies] = useState(null);
	const [isProcessDelComment, setIsProcessDelComment] = useState(false);
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState([]);
	const [idItem, setIdItem] = useState(null);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const textAreaRef = useRef();
	const getAllComments = async () => {
		const snapshot = await Comments.get();
		snapshot.forEach((doc) => {
			setComments((prev) => [...prev, doc.data()]);
		});
	};
	const getAllLikes = async () => {
		const snapshot = await Likes.get();
		snapshot.forEach((doc) => {
			setLikes((prev) => [...prev, doc.data()]);
		});
	};
	const timestamp = fb.firestore.Timestamp.now();
	const uniqueComments = [
		...new Map(comments.map((item) => [item.id, item])).values(),
	];
	const uniqueLikes = [
		...new Map(likes.map((item) => [item.idPost, item])).values(),
	];
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const closeModalDetail = (e) => {
		e.stopPropagation();
		setModalDetail(false);
	};
	const openModalDetail = (e, item) => {
		e.stopPropagation();
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
	const closeModalComment = (e) => {
		e.stopPropagation();
		setModalComment(false);
		setIsUpdate(false);
		setIsReplies(false);
		dispatch(actions.setData({ comment: '' }));
	};
	const openModalComment = (e) => {
		e.stopPropagation();
		if (!currentUser) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn phải đăng nhập để bình luận',
			});
		} else if (currentUser?.rule === 'user') {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn không có quyền bình luận',
			});
		} else {
			setModalComment(true);
		}
	};
	const openModalDeleteComment = async (e, idDelete) => {
		e.stopPropagation();
		setModalDeleteComment(true);
		await setStore({
			...currentUser,
			idData: idDelete,
		});
		await dispatch(
			actions.setData({
				currentUser: getStore(),
			}),
		);
	};
	const closeModalDeleteComment = (e) => {
		e.stopPropagation();
		setModalDeleteComment(false);
	};
	const toggleShare = (id) => {
		setIdItem(id);
		setOpenShare(!openShare);
	};
	const toggleEmoji = () => {
		setOpenEmoji(!openEmoji);
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
		getAllComments();
		getAllLikes();
		document.title = `Diễn đàn | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	let showPage = 5;
	const start = (page - 1) * showPage + 1;
	const end = start + showPage - 1;
	let DATA_FORUM = dataJobs;
	let DATA_FORUMS_FLAG = DATA_FORUM?.filter((row, index) => {
		if (index + 1 >= start && index + 1 <= end) return true;
	});
	const DATA_COMMENT = uniqueComments || [];
	const getCommentParent = () => {
		return DATA_COMMENT.filter((row) => {
			return row.parentId === null && row.idPost === currentUser?.idPost;
		});
	};
	const getCommentChild = (idParent) => {
		return DATA_COMMENT.filter((row) => {
			return row.parentId === idParent;
		});
	};
	const forumSearchDebounce = useDebounce(forumSearch, 300);
	if (forumSearchDebounce) {
		DATA_FORUMS_FLAG = DATA_FORUM?.filter((row, index) => {
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
		: DATA_FORUM.length;
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
	const handleLikePost = (idPost) => {
		if (!currentUser) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Bạn phải đăng nhập để thích bài viết',
			});
		} else {
			Likes.doc(idPost)
				.get()
				.then((doc) => {
					if (doc.exists) {
						const data = doc.data();
						if (data.likes.includes(currentUser?.id)) {
							Likes.doc(idPost).update({
								likes: data.likes.filter((item) => {
									return item !== currentUser?.id;
								}),
							});
						} else {
							Likes.doc(idPost).update({
								likes: [...data.likes, currentUser?.id],
							});
						}
					} else {
						Likes.doc(idPost).set({
							idPost: idPost,
							likes: [currentUser?.id],
						});
					}
				});
		}
	};
	const DATA_LIKES = uniqueLikes || [];
	const checkIdUserInLikes = (idUser) => {
		return DATA_LIKES.map((item) => {
			return item?.likes?.includes(idUser);
		});
	};
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
					let isLike = checkIdUserInLikes(currentUser?.id);
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
								<Tooltip
									title={
										DATA_LIKES.filter((row) => {
											return row.idPost === item?._id;
										})[0]?.likes?.length
									}
								>
									<div
										className={`${cx(
											'actions_item',
											isLike[index] && 'like',
										)}`}
										onClick={() => {
											handleLikePost(item?._id);
											getAllLikes();
										}}
									>
										<i class="bx bx-like bx-tada"></i>{' '}
										<span>
											{isLike[index]
												? 'Bỏ thích'
												: 'Thích'}
										</span>
									</div>
								</Tooltip>
								<Tooltip
									title={
										DATA_COMMENT.filter((row) => {
											return (
												row.parentId === null &&
												row.idPost === item?._id
											);
										}).length
									}
								>
									<div
										className={`${cx('actions_item')}`}
										onClick={async (e) => {
											openModalComment(e);
											await setStore({
												...currentUser,
												idPost: item?._id,
											});
											await dispatch(
												actions.setData({
													currentUser: getStore(),
												}),
											);
										}}
									>
										<i class="bx bx-chat bx-tada"></i>{' '}
										<span>Bình luận</span>
									</div>
								</Tooltip>
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
	const clickRepliesComment = (idReplies) => {
		textAreaRef.current.focus();
		setIsReplies(true);
		setIdReplies(idReplies);
	};
	const clickUpdateComment = (item) => {
		setIsUpdate(true);
		setIsReplies(false);
		dispatch(
			actions.setData({
				comment: item?.comment,
			}),
		);
		textAreaRef.current.focus();
		setIdUpdate(item?.id);
	};
	const RenderCommentItem = ({ item, noReply }) => {
		return (
			<div className={`${cx('comment')}`}>
				<div className={`${cx('comment_image_container')}`}>
					<img
						src={LOGO_COMPANY}
						alt=""
						className={`${cx('avatar_comment')}`}
					/>
				</div>
				<div className={`${cx('comment_infomation')}`}>
					<div className={`${cx('name_timer_container')}`}>
						<p className={`${cx('name')}`}>{item?.username}</p>
						<p
							className={`${cx('timer')}`}
							title={moment(item?.createdAt?.toDate()).format(
								'DD/MM/YYYY HH:mm:ss',
							)}
						>
							{moment(item?.createdAt?.toDate()).fromNow()}
						</p>
					</div>
					<div
						className={`${cx('content_comment_container')}`}
						dangerouslySetInnerHTML={{
							__html: item?.comment,
						}}
					></div>
					<div className={`${cx('actions_comment_container')}`}>
						{!noReply && (
							<div
								className={`${cx('actions_comment_item')}`}
								onClick={() => clickRepliesComment(item?.id)}
							>
								Trả lời
							</div>
						)}
						<div
							className={`${cx('actions_comment_item')}`}
							onClick={() => clickUpdateComment(item)}
						>
							Sửa
						</div>
						<div
							className={`${cx('actions_comment_item')}`}
							onClick={(e) => {
								openModalDeleteComment(e, item?.id);
							}}
						>
							Xóa
						</div>
					</div>
				</div>
			</div>
		);
	};
	const handleSendComment = () => {
		setIsProcessComment(true);
		const id = Comments.doc().id;
		Comments.doc(id)
			.set({
				id: id,
				idPost: currentUser?.idPost,
				username: currentUser?.username,
				comment: comment,
				userId: currentUser?.id,
				parentId: null,
				createdAt: timestamp,
				updatedAt: timestamp,
			})
			.then((docRef) => {
				getAllComments();
				setIsProcessComment(false);
				dispatch(actions.setData({ comment: '' }));
			})
			.catch((err) => {
				setIsProcessComment(false);
				setSnackbar({
					open: true,
					message: 'Bình luận thất bại!',
					type: 'error',
				});
			});
	};
	const handleRepliesComment = () => {
		setIsProcessComment(true);
		const id = Comments.doc().id;
		Comments.doc(id)
			.set({
				id: id,
				username: currentUser?.username,
				comment: comment,
				userId: currentUser?.id,
				parentId: idReplies,
				createdAt: timestamp,
				updatedAt: timestamp,
			})
			.then((docRef) => {
				getAllComments();
				setIsProcessComment(false);
				setIsReplies(false);
				dispatch(actions.setData({ comment: '' }));
			})
			.catch((err) => {
				setIsProcessComment(false);
				setSnackbar({
					open: true,
					message: 'Trả lời bình luận thất bại!',
					type: 'error',
				});
			});
	};
	const handleUpdateComment = (e, id) => {
		setIsProcessUpdateComment(true);
		Comments.doc(id)
			.update({
				comment: comment,
				updatedAt: timestamp,
			})
			.then((docRef) => {
				getAllComments();
				setIsProcessUpdateComment(false);
				setIsUpdate(false);
				dispatch(actions.setData({ comment: '' }));
			})
			.catch((err) => {
				console.log(err);
				setIsProcessUpdateComment(false);
				setSnackbar({
					open: true,
					message: 'Sửa bình luận thất bại!',
					type: 'error',
				});
			});
	};
	const handleDeleteComment = () => {
		setIsProcessDelComment(true);
		Comments.doc(currentUser?.idData)
			.delete()
			.then((docRef) => {
				getAllComments();
				setIsProcessDelComment(false);
				setModalDeleteComment(false);
			})
			.catch((err) => {
				setIsProcessDelComment(false);
				setSnackbar({
					open: true,
					message: 'Xóa bình luận thất bại!',
					type: 'error',
				});
			});
	};
	const handleCancelUpdate = () => {
		setIsUpdate(false);
		setIsReplies(false);
		dispatch(actions.setData({ comment: '' }));
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
			{modalComment && (
				<Modal
					titleHeader={'Bình luận'}
					openModal={openModalComment}
					closeModal={closeModalComment}
				>
					<div className={`${cx('content_emoji_container')}`}>
						<textarea
							className={`${cx('textarea')}`}
							rows={3}
							placeholder="Bạn đang nghĩ gì?"
							onChange={(e) => {
								dispatch(
									actions.setData({
										comment: e.target.value,
									}),
								);
							}}
							ref={textAreaRef}
							value={comment}
						></textarea>
						<div
							className={`${cx('icon_emoji_toggle')}`}
							onClick={toggleEmoji}
						>
							<i
								class="bx bx-smile bx-tada"
								style={{ color: '#157bfb' }}
							></i>
						</div>
						{openEmoji && (
							<div className={`${cx('comment_emoji_container')}`}>
								<Picker
									onEmojiClick={(emojiObject, e) => {
										dispatch(
											actions.setData({
												comment:
													comment + emojiObject.emoji,
											}),
										);
									}}
								/>
							</div>
						)}
					</div>
					<Button
						className={`${cx('btn_custom')}`}
						onClick={
							isReplies ? handleRepliesComment : handleSendComment
						}
						disabled={isProcessComment || !comment || isUpdate}
						isProcess={isProcessComment}
					>
						{isReplies ? 'Trả lời bình luận' : 'Bình luận'}
					</Button>
					{isUpdate && (
						<div className="flex-row">
							<Button
								className={`${cx(
									'btn_custom',
								)} warningbgc ml0 mt8 mr4`}
								onClick={(e) =>
									handleUpdateComment(e, idUpdate)
								}
								disabled={isProcessUpdateComment || !comment}
								isProcess={isProcessUpdateComment}
							>
								Cập nhật
							</Button>
							<Button
								className={`${cx(
									'btn_custom',
								)} confirmbgc mt8 ml4`}
								onClick={handleCancelUpdate}
							>
								Hủy bỏ
							</Button>
						</div>
					)}
					<div className={`${cx('divider')}`}></div>

					{getCommentParent().length > 0 ? (
						<>
							<p className="italic mb8">
								{autoFormatNumberInputChange(
									getCommentParent().length,
								)}{' '}
								bình luận
							</p>
							<div className={`${cx('list_comment_container')}`}>
								{getCommentParent().map((item, index) => {
									return (
										<div
											className={`${cx('comment_item')}`}
											key={index}
										>
											<RenderCommentItem item={item} />
											{getCommentChild(item?.id)?.map(
												(itemChild, indexChild) => {
													return (
														<div
															key={indexChild}
															className={`${cx(
																'content_item_child',
															)}`}
														>
															<RenderCommentItem
																noReply
																item={itemChild}
															/>
														</div>
													);
												},
											)}
										</div>
									);
								})}
							</div>
						</>
					) : (
						<p className="text-center italic">
							Hiện chưa có bình luận nào.
						</p>
					)}
				</Modal>
			)}
			{modalDeleteComment && (
				<Modal
					titleHeader="Xóa bình luận"
					openModal={openModalDeleteComment}
					closeModal={closeModalDeleteComment}
					actionButtonText="Xóa"
					classNameButton={'cancelbgc'}
					disabled={isProcessDelComment}
					isProcess={isProcessDelComment}
					onClick={handleDeleteComment}
				>
					<p>Bạn có chắc muốn xóa bình luận này?</p>
				</Modal>
			)}
		</div>
	);
}
