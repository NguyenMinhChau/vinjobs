/* eslint-disable no-unused-vars */
import React from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './DetailJobContent.module.css';

const cx = className.bind(styles);

function DetailJobContent() {
	const { idContent } = useParams();
	return <div className={`${cx('container')}`}></div>;
}

export default DetailJobContent;
