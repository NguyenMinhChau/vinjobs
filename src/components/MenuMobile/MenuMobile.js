import React from 'react';
import className from 'classnames/bind';
import styles from './MenuMobile.module.css';
import { Link, NavLink } from 'react-router-dom';
import { IconHeader, Image } from '..';
import { routers } from '../../routers';

const cx = className.bind(styles);

export default function MenuMobile({
    HeaderMiddle,
    HeaderMenu,
    toogleMenuMobile,
    isShowMenuMobile,
    isShowMenu,
    MenuChildTrue,
    MenuChildFalse,
    id,
}) {
    return (
        <>
            <Link to={routers.home}>
                <Image
                    src={HeaderMiddle?.logoCompany}
                    alt=''
                    className={`${cx('logo')}`}
                />
            </Link>
            <div className={`${cx('icon-menu')}`} onClick={toogleMenuMobile}>
                <IconHeader.MenuListIcon />
            </div>
            {isShowMenuMobile && (
                <div className={`${cx('menu_mobile')}`}>
                    <div className='text-right' onClick={toogleMenuMobile}>
                        <IconHeader.CloseIcon
                            className={`${cx('icon-close')}`}
                        />
                    </div>
                    <ul className={`${cx('list-menu-mobile-container')}`}>
                        {HeaderMenu.map((item, index) => {
                            return (
                                <>
                                    <NavLink
                                        to={item?.link}
                                        key={index}
                                        className={
                                            item?.link
                                                ? (nav) =>
                                                      cx('menu-item-mobile', {
                                                          active: nav.isActive,
                                                      })
                                                : cx('menu-item-mobile')
                                        }
                                        onClick={
                                            item?.children
                                                ? (e) =>
                                                      MenuChildTrue(e, item?.id)
                                                : toogleMenuMobile
                                        }
                                    >
                                        <div>
                                            <span>{item?.name}</span>
                                            {item?.children && (
                                                <span>
                                                    <IconHeader.ArrowMenuIcon />
                                                </span>
                                            )}
                                        </div>
                                        {item?.children && (
                                            <>
                                                {isShowMenu &&
                                                    item?.id === id && (
                                                        <ul
                                                            className={`${cx(
                                                                'list-menu-item-mobile'
                                                            )}`}
                                                        >
                                                            {item?.children.map(
                                                                (
                                                                    itemChild,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <NavLink
                                                                            to={
                                                                                itemChild?.link
                                                                            }
                                                                            onClick={
                                                                                !isShowMenu
                                                                                    ? (
                                                                                          e
                                                                                      ) => {
                                                                                          MenuChildFalse(
                                                                                              e,
                                                                                              item,
                                                                                              id
                                                                                          );
                                                                                      }
                                                                                    : toogleMenuMobile
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                            className={(
                                                                                nav
                                                                            ) =>
                                                                                cx(
                                                                                    'menu-item-child-mobile',
                                                                                    {
                                                                                        active: nav.isActive,
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                itemChild?.name
                                                                            }
                                                                        </NavLink>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    )}
                                            </>
                                        )}
                                    </NavLink>
                                </>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}
