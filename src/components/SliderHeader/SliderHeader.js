import React from 'react';
import className from 'classnames/bind';
import styles from './SliderHeader.module.css';

const cx = className.bind(styles);

export default function SliderHeader({
	urlImage,
	title,
	animateName,
	bgiClassName,
	classContainer,
}) {
	const classedBgi = cx('slider-image', bgiClassName);
	const classed = cx('slider-header', classContainer);
	return (
		<div className={classed}>
			<div
				className={classedBgi}
				style={{
					backgroundImage: `url('${urlImage}')`,
				}}
			></div>
			<div className={`${cx('slider-text-container')}`}>
				<div
					className={`${cx(
						'slider-title',
					)} mb8 animate__animated ${animateName}`}
					dangerouslySetInnerHTML={{
						__html: title,
					}}
				></div>
			</div>
		</div>
	);
}
