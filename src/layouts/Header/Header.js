import React from 'react';
import className from 'classnames/bind';
import { IconHeader, LinkHref, MenuMobile, MenuPC } from '../../components';
import { HeaderMenu } from '../../utils/';
import styles from './Header.module.css';

const cx = className.bind(styles);

export default function Header() {
    const [isShowMenu, setIsShowMenu] = React.useState(false);
    const [isShowMenuMobile, setIsShowMenuMobile] = React.useState(false);
    const [id, setId] = React.useState();
    const toogleMenu = (e, id) => {
        e.preventDefault();
        setId(id);
        setIsShowMenu(!isShowMenu);
    };
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
    return (
        <div className={`${cx('container')}`}>
            <div className={`${cx('header_top')}`}>
                <div
                    className={`${cx(
                        'header_top_title'
                    )} mr8 text-upc fz12 fwb`}
                >
                    Hỗ trợ khách hàng
                </div>
                <div className={`${cx('header_top_btn_social')}`}>
                    <LinkHref url='##'>
                        <IconHeader.FacebookIcon />
                    </LinkHref>
                    <LinkHref url='##'>
                        <IconHeader.InstagramIcon />
                    </LinkHref>
                    <LinkHref url='https://youtube.com/'>
                        <IconHeader.YoutubeIcon />
                    </LinkHref>
                </div>
            </div>
            <div className={`${cx('divider')}`}></div>
            <div className={`${cx('header_bottom')}`}>
                <MenuPC
                    toogleMenu={toogleMenu}
                    isShowMenu={isShowMenu}
                    id={id}
                />
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
