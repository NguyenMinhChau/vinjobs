import React from 'react';
import className from 'classnames/bind';
import styles from './MenuPC.module.css';
import { NavLink } from 'react-router-dom';
import { IconHeader, Image } from '..';
import { HeaderMenu } from '../../utils';

const cx = className.bind(styles);

export default function MenuPC() {
    return (
        <ul className={`${cx('list-menu-container')} fwb text-upc fz14`}>
            {HeaderMenu.map((item, index) => {
                return (
                    <NavLink
                        to={item?.link}
                        key={index}
                        className={
                            item?.link
                                ? (nav) =>
                                      cx('menu-item', {
                                          active: nav.isActive,
                                      })
                                : cx('menu-item')
                        }
                    >
                        {item?.logoCompany ? (
                            <Image
                                src={item?.logoCompany}
                                alt=''
                                className={`${cx('logo')}`}
                            />
                        ) : (
                            <div>
                                <span>{item?.name}</span>
                                {item?.children && (
                                    <span>
                                        <IconHeader.ArrowMenuIcon />
                                    </span>
                                )}
                            </div>
                        )}
                        {item?.children && (
                            <>
                                <ul className={`${cx('list-menu-item')}`}>
                                    {item?.children.map((itemChild, index) => {
                                        return (
                                            <NavLink
                                                to={itemChild?.link}
                                                key={index}
                                                className={(nav) =>
                                                    cx('menu-item-child', {
                                                        active: nav.isActive,
                                                    })
                                                }
                                            >
                                                <div
                                                    className={`${cx(
                                                        'x',
                                                        itemChild?.children &&
                                                            'divider'
                                                    )} flex-between`}
                                                >
                                                    <span>
                                                        {itemChild?.name}
                                                    </span>
                                                    {itemChild?.children && (
                                                        <span>
                                                            <IconHeader.ArrowMenuRightIcon />
                                                        </span>
                                                    )}
                                                </div>
                                                {itemChild?.children && (
                                                    <ul
                                                        className={`${cx(
                                                            'list-menu-item-child'
                                                        )}`}
                                                    >
                                                        {itemChild?.children.map(
                                                            (
                                                                itemChildChild,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <NavLink
                                                                        to={
                                                                            itemChildChild?.link
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={(
                                                                            nav
                                                                        ) =>
                                                                            cx(
                                                                                'menu-item-child-child',
                                                                                {
                                                                                    active: nav.isActive,
                                                                                }
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            itemChildChild.name
                                                                        }
                                                                    </NavLink>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                )}
                                            </NavLink>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                    </NavLink>
                );
            })}
        </ul>
    );
}
