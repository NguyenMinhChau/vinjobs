/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import className from 'classnames/bind';
import { IconHeader, LinkHref, MenuMobile, MenuPC } from '../../components';
import { HeaderMenu, useAppContext } from '../../utils/';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { routers } from '../../routers';
import { authLogoutSV } from '../../services/authen';
import { getStore } from '../../utils/localStore/localStore';

const cx = className.bind(styles);

export default function Header() {
	const { state, dispatch } = useAppContext();
	const { currentUser } = state;
	const [isShowMenu, setIsShowMenu] = React.useState(false);
	const [isShowMenuMobile, setIsShowMenuMobile] = React.useState(false);
	const [id, setId] = React.useState();
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const history = useNavigate();
	const MenuChildTrue = (e, id) => {
		e.preventDefault();
		setId(id);
		setIsShowMenu(true);
	};
	const MenuChildFalse = (e, id) => {
		e.preventDefault();
		setId(id);
		setIsShowMenu(false);
	};
	const toogleMenuMobile = (e) => {
		e.stopPropagation();
		setIsShowMenuMobile(!isShowMenuMobile);
		setIsShowMenu(false);
	};
	// lấy phần tử giữa của mảng HeaderMenu
	const middle = Math.floor(HeaderMenu.length / 2);
	// lấy ra mảng không chứa phần tử giữa
	const firstHalf = HeaderMenu.slice(0, middle);
	const secondHalf = HeaderMenu.slice(middle + 1, HeaderMenu.length);
	const handleLogout = async () => {
		await 1;
		authLogoutSV({
			id_user: currentUser?.id,
			history,
			setSnackbar,
			dispatch,
		});
	};
	return (
		<div className={`${cx('container')}`}>
			<div className={`${cx('header_top')}`}>
				<div className={`${cx('header_top_item')} flex-start`}>
					<div
						className={`${cx(
							'header_top_title',
						)} mr8 text-upc fz12 fwb`}
					>
						Hỗ trợ khách hàng
					</div>
					<div className={`${cx('header_top_btn_social')}`}>
						<LinkHref url="##">
							<IconHeader.FacebookIcon />
						</LinkHref>
						<LinkHref url="##">
							<IconHeader.InstagramIcon />
						</LinkHref>
						<LinkHref url="https://youtube.com/">
							<IconHeader.YoutubeIcon />
						</LinkHref>
					</div>
				</div>
				<div className={`${cx('header_top_item')} flex-end`}>
					{!getStore(dispatch) ? (
						<div className="flex-end w100">
							<Link
								to={`${routers.login}`}
								className={`${cx('btn', 'btn_login')} mr4`}
							>
								Đăng nhập
							</Link>
							<Link
								to={`${routers.register}`}
								className={`${cx('btn', 'btn_register')}`}
							>
								Đăng ký
							</Link>
						</div>
					) : (
						<div
							onClick={handleLogout}
							className={`${cx('btn', 'btn_logout')}`}
						>
							Đăng xuất
						</div>
					)}
				</div>
			</div>
			<div className={`${cx('divider')}`}></div>
			<div className={`${cx('header_bottom')}`}>
				<MenuPC />
			</div>
			<div className={`${cx('header_mobile')}`}>
				<MenuMobile
					HeaderMiddle={HeaderMenu[middle]}
					HeaderMenu={[...firstHalf, ...secondHalf]}
					toogleMenuMobile={toogleMenuMobile}
					isShowMenuMobile={isShowMenuMobile}
					isShowMenu={isShowMenu}
					MenuChildTrue={MenuChildTrue}
					MenuChildFalse={MenuChildFalse}
					id={id}
				/>
			</div>
		</div>
	);
}
