/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import className from 'classnames/bind';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './JobsContent.module.css';
import { requestRefreshToken, useAppContext } from '../../utils';
import {
	Button,
	EditorTiny,
	FormInput,
	MultipleUpload,
	SelectMultiple,
	SelectValue,
	SingleUpload,
	SnackbarCp,
} from '../../components';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import DataTopicContent from '../../utils/FakeData/TopicContent';
import LOGO_COMPANY from '../../assets/images/logo_company.png';
import {
	addJobContentSV,
	getJobByIdSV,
	updateJobContentSV,
	updateThumbnailSV,
} from '../../services/admin';
import DataAreaContent from '../../utils/FakeData/AreaContent';

const cx = className.bind(styles);

function CreateJobsContent() {
	const { state, dispatch } = useAppContext();
	const {
		currentUser,
		multipleFile,
		singleFile,
		editor: { title, subTitle, topic, salary, area },
		searchValues: { topicSearch, areaSearch },
		edit: { itemData },
	} = state.set;
	const { idJobsContent } = useParams();
	const editorJobsRef = useRef(null);
	const [isProcess, setIsProcess] = useState(false);
	const [isProcessThumbnail, setIsProcessThumbnail] = useState(false);
	const [toggleSelectTopic, setToggleSelectTopic] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const history = useNavigate();
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
	const getJobById = (dataToken) => {
		getJobByIdSV({
			id_post: idJobsContent,
			setSnackbar,
			dispatch,
			state,
			token: dataToken?.token,
		});
	};
	useEffect(() => {
		document.title = `Bài đăng việc làm | ${process.env.REACT_APP_TITLE_WEB}`;
		if (idJobsContent) {
			// requestRefreshToken(
			// 	currentUser,
			// 	getJobById,
			// 	state,
			// 	dispatch,
			// 	actions,
			// );
			getJobById();
		}
	}, []);
	useEffect(() => {
		dispatch(
			actions.setData({
				multipleFiles: [],
				singleFile: [],
				editor: {
					title: '',
					subTitle: '',
					topic: '',
					salary: '',
					area: [],
				},
				searchValues: { topicSearch: '' },
			}),
		);
		// editorJobsRef?.current?.setContent('');
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
	const handleClickSelectTopic = (item) => {
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
		addJobContentSV({
			id_user: currentUser?.id,
			setSnackbar,
			dispatch,
			state,
			token: dataToken?.token,
			title,
			desc: subTitle,
			content: editorJobsRef?.current?.getContent(),
			statements: multipleFile,
			thumbnail: singleFile[0],
			wage: salary,
			location: area,
			type: topic?.type,
			history,
			setIsProcess,
			editorJobsRef,
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
	// console.log(area);
	const updateThumbnail = (dataToken) => {
		updateThumbnailSV({
			id_post: idJobsContent,
			setSnackbar,
			dispatch,
			state,
			setIsProcessThumbnail,
			thumbnail: singleFile[0],
			token: dataToken?.token,
			history,
		});
	};
	const handleUpdateThumbnail = () => {
		setIsProcessThumbnail(true);
		requestRefreshToken(
			currentUser,
			updateThumbnail,
			state,
			dispatch,
			actions,
		);
	};
	const updateJobContent = (dataToken) => {
		updateJobContentSV({
			id_post: idJobsContent,
			setSnackbar,
			dispatch,
			state,
			setIsProcess,
			title,
			desc: subTitle,
			content: editorJobsRef?.current?.getContent(),
			statements: multipleFile,
			wage: salary,
			location: area,
			type: topic?.type,
			token: dataToken?.token,
			history,
		});
	};
	const handleUpdateJobContent = () => {
		setIsProcess(true);
		requestRefreshToken(
			currentUser,
			updateJobContent,
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
	let urlMultipleImages = [];
	if (multipleFile.length > 0) {
		urlMultipleImages = multipleFile.map((item) => {
			return window.URL.createObjectURL(item);
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
				label="Tiêu đề tuyển dụng"
				type="text"
				placeholder="Nhập vị trí tuyển dụng..."
				name="title"
				onChange={handleChangeInput}
				value={title}
				labelClass="confirm"
			/>
			<FormInput
				label="Tên công ty"
				type="text"
				placeholder="Nhập tên công ty..."
				name="subTitle"
				onChange={handleChangeInput}
				value={subTitle}
				labelClass="confirm"
			/>
			<FormInput
				label="Mức lương"
				type="text"
				placeholder="Nhập mức lương (VD: 8.000.000 - 10.000.000 hoặc Thỏa thuận)"
				name="salary"
				value={salary}
				onChange={handleChangeInput}
				labelClass="confirm"
			/>
			<SelectMultiple
				data={DataAreaContent}
				placeholder="Chọn khu vực..."
				labelClass="confirm"
			/>
			<SelectValue
				label="Lĩnh vực"
				placeholder="Chọn lĩnh vực..."
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
				onClick={handleClickSelectTopic}
				labelClass="confirm"
			/>
			<label className={`${cx('label')}`}>Nội dung</label>
			<EditorTiny
				textInitial="Nội dung trang việc làm..."
				ref={editorJobsRef}
				value={itemData?.post?.content}
			/>
			<label className={`${cx('label')}`}>Hình ảnh</label>
			<div className={`${cx('single_upload_container')}`}>
				<SingleUpload width={'100%'} />
				{(singleFile.length > 0 || itemData?.post?.thumbnail) && (
					<img
						src={
							`${urlImageSingle}` ||
							`${URL}${itemData?.post?.thumbnail}`
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
				{urlMultipleImages.length > 0 && (
					<div className={`${cx('image_multiple_container')}`}>
						{urlMultipleImages.map((url, index) => {
							return (
								<img
									key={index}
									src={url}
									alt=""
									className={`${cx('image_multiple_item')}`}
									onError={(e) =>
										(e.target.src = LOGO_COMPANY)
									}
								/>
							);
						})}
					</div>
				)}
			</div> */}
			<div className={`${cx('button_container')}`}>
				<Button
					className={`${cx('btn')} cancelbgc text-center`}
					to={`${routers.content}`}
				>
					Hủy bỏ
				</Button>
				<Button
					className={`${cx('btn')} probgc text-center`}
					isProcess={isProcess}
					onClick={
						!idJobsContent
							? handleCreateContent
							: handleUpdateJobContent
					}
					disabled={
						isProcess ||
						!title ||
						!subTitle ||
						!salary ||
						area.length === 0 ||
						!topic
					}
				>
					Gửi
				</Button>
				{idJobsContent && (
					<Button
						className={`${cx('btn')} vipbgc text-center`}
						isProcess={isProcessThumbnail}
						onClick={handleUpdateThumbnail}
						disabled={isProcessThumbnail || singleFile.length === 0}
					>
						Cập nhật ảnh
					</Button>
				)}
			</div>
		</div>
	);
}

export default CreateJobsContent;
