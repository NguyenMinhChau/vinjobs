import React from 'react';
import className from 'classnames/bind';
import { Skeleton } from '@mui/material';
import styles from './styles.module.css';
// const Fade = require('react-reveal/Fade');

const cx = className.bind(styles);

function SkeletonCP() {
	return (
		<div className={`${cx('skeleton_container')}`}>
			<div className={`${cx('skeleton_item')}`}>
				<Skeleton width="100%"></Skeleton>
				<Skeleton width="30%"></Skeleton>
				<Skeleton
					variant="rectangular"
					width="100%"
					height={'150px'}
				></Skeleton>
			</div>
			<div className={`${cx('skeleton_item')}`}>
				<Skeleton
					variant="rectangular"
					width="100%"
					height={'200px'}
				></Skeleton>
			</div>
		</div>
	);
}

export default SkeletonCP;
