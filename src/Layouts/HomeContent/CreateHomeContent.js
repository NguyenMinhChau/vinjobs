/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './HomeContent.module.css';
import { useAppContext } from '../../utils';
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
import LOGO_COMPANY from '../../assets/images/logo_company.png';

const cx = className.bind(styles);

function CreateHomeContent() {
	const { state, dispatch } = useAppContext();
	const {
		multipleFile,
		singleFile,
		editor: { title, subTitle, topic },
		searchValues: { topicSearch },
	} = state.set;
	const { idHomeContent } = useParams();
	const editorHomeRef = useRef(null);
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
	useEffect(() => {
		document.title = `Bài đăng về chúng tôi | ${process.env.REACT_APP_TITLE_WEB}`;
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
	const handleCreateContent = () => {
		console.log(
			singleFile,
			title,
			subTitle,
			topic,
			multipleFile,
			editorHomeRef?.current?.getContent(),
		);
	};
	// <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
	const urlImageSingle =
		singleFile.length > 0 ? URL.createObjectURL(singleFile[0]) : '';
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
			<p className={`${cx('header_title')}`}>Nội dung</p>
			<FormInput
				type="text"
				placeholder="Nhập tiêu đề..."
				name="title"
				onChange={handleChangeInput}
			/>
			<FormInput
				type="text"
				placeholder="Nhập tiêu đề phụ..."
				name="subTitle"
				onChange={handleChangeInput}
			/>
			<SelectValue
				placeholder="Chọn chủ đề..."
				nameSearch="topicSearch"
				toggleModal={handleToogleSelectTopic}
				stateModal={toggleSelectTopic}
				valueSelect={topic?.name}
				onChangeSearch={handleChangeSearchSelect}
				dataFlag={DataTopicContent.filter(
					(x) =>
						x?.name?.includes(topicSearch) ||
						x?.desc?.includes(topicSearch),
				)}
				onClick={handleClickSelect}
			/>
			<EditorTiny
				textInitial="Nội dung trang về chúng tôi..."
				ref={editorHomeRef}
				value=""
			/>
			<p className={`${cx('header_title')}`}>Hình ảnh (Single)</p>
			<div className={`${cx('single_upload_container')}`}>
				<SingleUpload width={'100%'} />
				<img
					src={urlImageSingle}
					alt=""
					className={`${cx('image_single')}`}
					onError={(e) => (e.target.src = LOGO_COMPANY)}
				/>
			</div>
			<p className={`${cx('header_title')}`}>Hình ảnh (Tối đa 5 ảnh)</p>
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
			</div>
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
					onClick={handleCreateContent}
					disabled={
						isProcess ||
						!editorHomeRef?.current?.getContent() ||
						singleFile.length === 0 ||
						multipleFile.length === 0
					}
				>
					Gửi
				</Button>
			</div>
		</div>
	);
}

export default CreateHomeContent;
