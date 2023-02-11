import React from 'react';
import className from 'classnames/bind';
import styles from './SelectValueCp.module.css';
import { useAppContext } from '../../utils';
import { setData } from '../../app/reducer';

const cx = className.bind(styles);

export default function SelectValueCp({
    label,
    value,
    placeholder,
    data,
    nameSet,
    stateSelect,
    setStateSelect,
}) {
    const { dispatch } = useAppContext();
    return (
        <div className={`${cx('select_container')}`}>
            <div className={`${cx('select_label')}`}>{label}</div>
            <div
                className={`${cx('select_form_container')}`}
                onClick={() => setStateSelect(!stateSelect)}
            >
                <div className={`${cx('select_form_value')}`}>
                    {value ? value : placeholder}
                </div>
                <div className={`${cx('select_form_icon')}`}>
                    <i class='fa-solid fa-chevron-down'></i>
                </div>
                {stateSelect && (
                    <div className={`${cx('select_list')}`}>
                        {data.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${cx('select_list_item')}`}
                                    onClick={() => {
                                        dispatch(
                                            setData({
                                                [nameSet]: item,
                                            })
                                        );
                                        setStateSelect(false);
                                    }}
                                >
                                    {item?.name}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
