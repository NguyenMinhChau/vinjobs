/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
// import Badge from '@mui/material/Badge';
import routers from '../../routers/routers';
import { useAppContext } from '../../utils';
import { Image, AccountMenu } from '../../components';
import styles from './Header.module.css';
import { actions } from '../../app/';

const cx = className.bind(styles);

function Header() {
	const { state, dispatch } = useAppContext();
	const { currentUser } = state.set;
	const { openMenuMobile } = state.toggle;
	const openMenu = () => {
		dispatch(
			actions.toggleModal({
				openMenuMobile: !openMenuMobile,
			}),
		);
	};
	return (
		<div className={`${cx('header-container')}`}>
			<div className={`${cx('icon_menu_container')}`} onClick={openMenu}>
				{!openMenuMobile ? (
					<i class="fa-solid fa-bars"></i>
				) : (
					<i class="fa-solid fa-xmark"></i>
				)}
			</div>
			<Link
				to={
					currentUser?.rule === 'user'
						? routers.homeUser
						: routers.home
				}
				className={`${cx('logo_container')}`}
			>
				<Image
					src="/images/header-logo01.png"
					alt="header_logo"
					className={`${cx('header-logo')}`}
				/>
			</Link>
			<div className={`${cx('header-infouser-container')}`}>
				{/* <TippyHLNotify>
					<Badge badgeContent={10}>
						<Icons.BellIcon className={`${cx('iconsBell')}`} />
					</Badge>
				</TippyHLNotify> */}
				<AccountMenu className={cx('ml10')} />
			</div>
		</div>
	);
}

export default Header;
