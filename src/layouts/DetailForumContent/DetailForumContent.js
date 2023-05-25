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

const cx = className.bind(styles);

function DetailForumContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		comment,
		setItem: { idItem, dataItem },
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
	const [isProcessComment, setIsProcessComment] = useState(false);
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
	const toggleShare = () => {
		setOpenShare(!openShare);
	};
	const closeModalComment = (e) => {
		e.stopPropagation();
		setModalComment(false);
	};
	const openModalComment = (e, item) => {
		e.stopPropagation();
		setModalComment(true);
		// dispatch(
		// 	actions.setData({
		// 		setItem: {
		// 			idItem: item,
		// 			dataItem: item,
		// 		},
		// 	}),
		// );
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
		document.title = `Chi tiết diễn đàn | ${process.env.REACT_APP_TITLE_WEB}`;
	}, [comment, openEmoji, modalComment]);
	const URL = process.env.REACT_APP_URL_IMAGE;
	const DATA_COMMENT = [
		{ id: 1, children: [{}, {}, {}] },
		{ id: 2, children: [{}, {}] },
		{ id: 3, children: [{}, {}, {}, {}] },
		{ id: 4, children: [{}] },
		{ id: 5, children: [] },
	];
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
						<p className={`${cx('name')}`}>Vinjob</p>
						<p className={`${cx('timer')}`}>
							{moment(new Date()).format('DD/MM/YYYY HH:mm:ss')}
						</p>
					</div>
					<div
						className={`${cx('content_comment_container')}`}
						dangerouslySetInnerHTML={{
							__html: `Bình luận đầu tiên`,
						}}
					></div>
					{!noReply && (
						<div className={`${cx('actions_comment_container')}`}>
							<div
								className={`${cx('actions_comment_item')}`}
								onClick={() => {
									textAreaRef.current.focus();
								}}
							>
								Trả lời
							</div>
						</div>
					)}
				</div>
			</div>
		);
	};
	const handleSendComment = () => {
		setIsProcessComment(true);
		setTimeout(() => {
			setModalComment(false);
			setIsProcessComment(false);
			setSnackbar({
				open: true,
				message: `Bạn đã bình luận: ${comment}. Chức năng đang phát triển!`,
				type: 'success',
			});
		}, 3000);
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
						<Tooltip title={autoFormatNumberInputChange(1762882)}>
							<div className={`${cx('actions_item')}`}>
								<i class="bx bx-like bx-tada"></i>{' '}
								<span>Thích</span>
							</div>
						</Tooltip>
						<Tooltip title={autoFormatNumberInputChange(792)}>
							<div
								className={`${cx('actions_item')}`}
								onClick={(e) => openModalComment(e, dataItem)}
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
						onClick={handleSendComment}
						disabled={isProcessComment || !comment}
						isProcess={isProcessComment}
					>
						Bình luận
					</Button>
					<div className={`${cx('divider')}`}></div>
					<div className={`${cx('list_comment_container')}`}>
						{DATA_COMMENT.map((item, index) => {
							return (
								<div
									className={`${cx('comment_item')}`}
									key={index}
								>
									<RenderCommentItem />
									{item?.children?.map(
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
													/>
												</div>
											);
										},
									)}
								</div>
							);
						})}
					</div>
				</Modal>
			)}
		</div>
	);
}

export default DetailForumContent;
