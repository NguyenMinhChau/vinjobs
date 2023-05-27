/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './DetailForumContent.module.css';
import { SliderHeader, SnackbarCp, Button, Modal } from '../../components';
import moment from 'moment';
import { useAppContext } from '../../utils';
import { getJobByIdSV } from '../../services/admin';
import LOGO_COMPANY from '../../assets/images/logo-company.png';
import Tooltip from '@mui/material/Tooltip';
import {
	ShareFB,
	ShareLinkedln,
	ShareTelegram,
	LikeFB,
} from '../../SocialPlugin';
import { autoFormatNumberInputChange } from '../../utils/format/NumberFormat';
import { actions } from '../../app/';
import Picker from 'emoji-picker-react';
import { setStore, getStore } from '../../utils/localStore/localStore';
import fb, { Comments, Likes } from '../../firebase';

const cx = className.bind(styles);

function DetailForumContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		comment,
		setItem: { dataItem },
	} = state.set;
	const textAreaRef = useRef();
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
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
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState([]);
	const [idItem, setIdItem] = useState(null);
	const [isProcessDelComment, setIsProcessDelComment] = useState(false);
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
	const toggleShare = () => {
		setOpenShare(!openShare);
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
	const toggleEmoji = () => {
		setOpenEmoji(!openEmoji);
	};
	const getForumById = () => {
		getJobByIdSV({
			id_post: idForum,
			setSnackbar,
			dispatch,
			state,
		});
	};
	useEffect(() => {
		getForumById();
		getAllComments();
		getAllLikes();
		document.title = `Chi tiết diễn đàn | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	const URL = process.env.REACT_APP_URL_IMAGE;
	const DATA_COMMENT = uniqueComments || [];
	const getCommentParent = () => {
		return DATA_COMMENT.filter((row) => {
			return row.parentId === null && row.idPost === dataItem?.post?._id;
		});
	};
	const getCommentChild = (idParent) => {
		return DATA_COMMENT.filter((row) => {
			return row.parentId === idParent;
		});
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
		return DATA_LIKES.filter((item) => {
			return item.idPost === dataItem?.post?._id;
		})[0]?.likes?.includes(idUser);
	};
	const isLike = checkIdUserInLikes(currentUser?.id);
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
				bgiClassName={'bgi_custom_filter_brightness_60'}
				classContainer={`${cx('slider_header_custom')}`}
				urlImage={`${URL}${dataItem?.post?.thumbnail}`}
				title={`<b>${dataItem?.post?.namePost || '---'}</b>`}
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
									__html: dataItem?.post?.content,
								}}
							></div>
						</div>
					</div>
					<div className={`${cx('bottom_container')}`}>
						<Tooltip
							title={
								DATA_LIKES.filter((row) => {
									return row.idPost === dataItem?.post?._id;
								})[0]?.likes?.length
							}
						>
							<div
								className={`${cx(
									'actions_item',
									isLike && 'like',
								)}`}
								onClick={() => {
									handleLikePost(dataItem?.post?._id);
									getAllLikes();
								}}
							>
								<i class="bx bx-like bx-tada"></i>{' '}
								<span>{isLike ? 'Bỏ thích' : 'Thích'}</span>
							</div>
						</Tooltip>
						<Tooltip
							title={
								DATA_COMMENT.filter((row) => {
									return (
										row.parentId === null &&
										row.idPost === dataItem?.post?._id
									);
								}).length
							}
						>
							<div
								className={`${cx('actions_item')}`}
								onClick={async (e) => {
									openModalComment(e);
									if (currentUser) {
										await setStore({
											...currentUser,
											idPost: dataItem?.post?._id,
										});
										await dispatch(
											actions.setData({
												currentUser: getStore(),
											}),
										);
									}
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
							onClick={toggleShare}
						>
							<i class="bx bx-share bx-tada"></i>{' '}
							<span>Chia sẻ</span>
							{openShare && (
								<div
									className={`${cx('actions_item_absolute')}`}
								>
									<ShareFB
										slug={dataItem?.post?._id}
										name={dataItem?.post?.namePost}
										desc={dataItem?.post?.description}
										page="forum"
									/>
									<ShareLinkedln
										slug={dataItem?.post?._id}
										name={dataItem?.post?.namePost}
										desc={dataItem?.post?.description}
										page="forum"
									/>
									<ShareTelegram
										slug={dataItem?.post?._id}
										name={dataItem?.post?.namePost}
										desc={dataItem?.post?.description}
										page="forum"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
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

export default DetailForumContent;
