import React from 'react';
import className from 'classnames/bind';
import styles from './SelectDateCp.module.css';
import { useAppContext } from '../../utils';
import DatePicker from 'react-datepicker';
import { setData } from '../../app/reducer';
import 'react-datepicker/dist/react-datepicker.css';

const cx = className.bind(styles);

export default function SelectDateCp({ label, value, nameSet }) {
    const { dispatch } = useAppContext();

    return (
        <div className={`${cx('select_container')}`}>
            <div className={`${cx('select_label')}`}>{label}</div>
            <DatePicker
                selected={value ? value : new Date()}
                onChange={(date) =>
                    dispatch(
                        setData({
                            [nameSet]: date,
                        })
                    )
                }
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                showDisabledMonthNavigation
                showWeekNumbers
                showPopperArrow={false}
            />
        </div>
    );
}
