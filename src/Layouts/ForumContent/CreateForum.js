/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import className from 'classnames/bind';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ForumContent.module.css';
import { useAppContext, requestRefreshToken } from '../../utils';
import {
	Button,
	EditorTiny,
	FormInput,
	MultipleUpload,
	SelectValue,
	SingleUpload,
	SnackbarCp,
} from '../../components';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import DataTopicContent from '../../utils/FakeData/TopicContent';
import {
	getForumByIdSV,
	addForumContentSV,
	updateForumContentSV,
} from '../../services/admin';
import LOGO_COMPANY from '../../assets/images/logo_company.png';

const cx = className.bind(styles);

function CreateForumContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		multipleFile,
		singleFile,
		editor: { title, subTitle, topic },
		searchValues: { topicSearch },
		edit: { itemData },
	} = state.set;
	const history = useNavigate();
	const { idForumContent } = useParams();
	const editorForumRef = useRef(null);
	const [isProcess, setIsProcess] = useState(false);
	const [toggleSelectTopic, setToggleSelectTopic] = useState(false);
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
	const handleToogleSelectTopic = () => {
		setToggleSelectTopic(!toggleSelectTopic);
	};
	const getForumById = (dataToken) => {
		getForumByIdSV({
			id_post: idForumContent,
			setSnackbar,
			dispatch,
			state,
			token: dataToken?.token,
		});
	};
	useEffect(() => {
		document.title = `Bài đăng diễn đàn | ${process.env.REACT_APP_TITLE_WEB}`;
		if (idForumContent) {
			getForumById();
		}
	}, []);
	useEffect(() => {
		dispatch(
			actions.setData({
				multipleFiles: [],
				singleFile: [],
				editor: { title: '', subTitle: '', topic: '' },
				searchValues: { topicSearch: '' },
			}),
		);
	}, [dispatch]);
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		dispatch(
			actions.setData({
				editor: {
					...state.set.editor,
					[name]: value,
				},
			}),
		);
	};
	const handleChangeSearchSelect = (e) => {
		const { name, value } = e.target;
		dispatch(
			actions.setData({
				searchValues: {
					...state.set.searchValues,
					[name]: value,
				},
			}),
		);
	};
	const handleClickSelect = (item) => {
		dispatch(
			actions.setData({
				editor: {
					...state.set.editor,
					topic: item,
				},
			}),
		);
		setToggleSelectTopic(false);
	};
	const createContent = (dataToken) => {
		addForumContentSV({
			id_user: currentUser?.id,
			setSnackbar,
			dispatch,
			state,
			token: dataToken?.token,
			title,
			desc: subTitle,
			content: editorForumRef?.current?.getContent(),
			thumbnail: singleFile[0],
			type: topic?.type,
			history,
			setIsProcess,
			editorForumRef,
		});
	};
	const handleCreateContent = () => {
		setIsProcess(true);
		requestRefreshToken(
			currentUser,
			createContent,
			state,
			dispatch,
			actions,
		);
	};
	const updateForumContent = (dataToken) => {
		updateForumContentSV({
			id_post: idForumContent,
			setSnackbar,
			dispatch,
			state,
			setIsProcess,
			title,
			desc: subTitle,
			content: editorForumRef?.current?.getContent(),
			thumbnail: singleFile[0],
			type: topic?.type,
			token: dataToken?.token,
			history,
		});
	};
	const handleUpdateForumContent = () => {
		setIsProcess(true);
		requestRefreshToken(
			currentUser,
			updateForumContent,
			state,
			dispatch,
			actions,
		);
	};
	// <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
	const URL = process.env.REACT_APP_URL_IMAGE;
	const urlImageSingle =
		singleFile.length > 0
			? window.URL.createObjectURL(singleFile?.[0])
			: '';
	let urlMultipleImages = [1, 2, 3, 4, 5];
	if (multipleFile.length > 0) {
		urlMultipleImages = multipleFile.map((item) => {
			return URL.createObjectURL(item);
		});
	}
	return (
		<div className={`${cx('container')}`}>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<FormInput
				label="Tiêu đề bài viết"
				type="text"
				placeholder="Nhập tiêu đề..."
				name="title"
				onChange={handleChangeInput}
				value={title}
				labelClass="confirm"
			/>
			<FormInput
				label="Tiêu đề phụ"
				type="text"
				placeholder="Nhập tiêu đề phụ..."
				name="subTitle"
				onChange={handleChangeInput}
				value={subTitle}
				labelClass="confirm"
			/>
			<SelectValue
				label="Chủ đề"
				placeholder="Chọn chủ đề..."
				nameSearch="topicSearch"
				toggleModal={handleToogleSelectTopic}
				stateModal={toggleSelectTopic}
				valueSelect={topic?.name}
				onChangeSearch={handleChangeSearchSelect}
				dataFlag={DataTopicContent.filter(
					(x) =>
						x?.name?.includes(topicSearch) ||
						x?.desc?.includes(topicSearch) ||
						x?.type?.includes(topicSearch),
				)}
				onClick={handleClickSelect}
				labelClass="confirm"
			/>
			<label className={`${cx('label')}`}>Nội dung</label>
			<EditorTiny
				textInitial="Nội dung trang diễn đàn..."
				ref={editorForumRef}
				value={itemData?.content}
			/>
			<label className={`${cx('label')}`}>Hình ảnh</label>
			<div className={`${cx('single_upload_container')}`}>
				<SingleUpload width={'100%'} />
				{(singleFile.length > 0 || itemData?.thumbnail) && (
					<img
						src={
							`${urlImageSingle}` ||
							`${URL}${itemData?.thumbnail}`
						}
						alt=""
						className={`${cx('image_single')}`}
						onError={(e) => (e.target.src = LOGO_COMPANY)}
					/>
				)}
			</div>
			{/* <label className={`${cx('label')}`}>Hình ảnh (Tối đa 5 ảnh)</label>
			<div className={`${cx('multiple_upload_container')}`}>
				<MultipleUpload width={'100%'} />
				<div className={`${cx('image_multiple_container')}`}>
					{urlMultipleImages.map((url, index) => {
						return (
							<img
								key={index}
								src={url}
								alt=""
								className={`${cx('image_multiple_item')}`}
								onError={(e) => (e.target.src = LOGO_COMPANY)}
							/>
						);
					})}
				</div>
			</div> */}
			<div className={`${cx('button_container')}`}>
				<Button
					className="cancelbgc text-center"
					to={`${routers.content}`}
				>
					Hủy bỏ
				</Button>
				<Button
					className="probgc text-center"
					isProcess={isProcess}
					onClick={
						!idForumContent
							? handleCreateContent
							: handleUpdateForumContent
					}
					disabled={isProcess || !title || !subTitle || !topic}
				>
					{idForumContent ? 'Cập nhật' : 'Gửi'}
				</Button>
			</div>
		</div>
	);
}

export default CreateForumContent;
