import React from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import { Button, IconModal } from '../';
import styles from './Modal.module.css';

const cx = className.bind(styles);

function Modal({
	children,
	titleHeader,
	actionButtonText,
	closeModal,
	openModal,
	classNameButton,
	onClick,
	isProcess,
	isProcessCancel,
	hideButton,
	disabled,
	onClickCancel,
	classModalBody,
}) {
	const classed = cx('modal-button-me', classNameButton);
	const classedBody = cx('modal-body-me', classModalBody);

	return (
		<div className={`${cx('modal-container-me')}`} onClick={closeModal}>
			<div className={`${cx('modal-content-me')}`} onClick={openModal}>
				<div className={`${cx('modal-header-me')}`}>
					<div className={`${cx('modal-text-header-me')}`}>
						{titleHeader}
					</div>
					<span
						className={`${cx('modal-icon-header-me')}`}
						onClick={closeModal}
					>
						<IconModal.CloseIcon />
					</span>
				</div>
				<div className={classedBody}>{children}</div>
				{!hideButton && (
					<div className={`${cx('modal-footer-me')}`}>
						<Button
							className="successbgc"
							onClick={onClickCancel ? onClickCancel : closeModal}
							isProcess={isProcessCancel}
							disabled={isProcessCancel}
						>
							Đóng
						</Button>
						{actionButtonText && (
							<Button
								className={classed}
								onClick={onClick}
								isProcess={isProcess}
								disabled={isProcess || disabled}
							>
								{actionButtonText}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

Modal.propTypes = {
	children: PropTypes.node,
	titleHeader: PropTypes.string,
	actionButtonText: PropTypes.string,
	closeModal: PropTypes.func,
	openModal: PropTypes.func,
	classNameButton: PropTypes.string,
	errorMessage: PropTypes.string,
	onClick: PropTypes.func,
};

export default Modal;
