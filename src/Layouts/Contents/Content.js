/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Content.module.css';
import HomeContent from '../HomeContent/HomeContent';
import JobsContent from '../JobsContent/JobsContent';
import ForumContent from '../ForumContent/ForumContent';
import ContactContent from '../ContactContent/ContactContent';

const cx = className.bind(styles);
const LIST_CONTENTS = [
	{
		id: 1,
		name: 'Về chúng tôi',
		component: <HomeContent />,
	},
	{
		id: 2,
		name: 'Việc làm',
		component: <JobsContent />,
	},
	{
		id: 3,
		name: 'Diễn đàn',
		component: <ForumContent />,
	},
	{
		id: 4,
		name: 'Liên hệ hợp tác',
		component: <ContactContent />,
	},
];

function Content() {
	const [tab, setTab] = useState(1);
	const handleChangeInput = (id) => {
		setTab(id);
	};
	useEffect(() => {
		document.title = `Bài đăng | ${process.env.REACT_APP_TITLE_WEB}`;
	}, []);
	return (
		<div className={`${cx('conatiner')}`}>
			<p className={`${cx('header_title')}`}>Chọn trang:</p>
			<div className={`${cx('container_list_choosen')}`}>
				{LIST_CONTENTS.map((item) => {
					return (
						<div className={`${cx('item_choosen')}`} key={item.id}>
							<input
								type="radio"
								value={item.id}
								id={item.id}
								name="page"
								checked={tab === item?.id}
								onChange={() => handleChangeInput(item?.id)}
							/>
							<label htmlFor={item.id}>{item.name}</label>
						</div>
					);
				})}
			</div>
			<div className={`${cx('container_contents')}`}>
				{LIST_CONTENTS.find((item) => item.id === tab)?.component}
			</div>
		</div>
	);
}

export default Content;
