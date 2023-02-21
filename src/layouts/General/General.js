import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { useAppContext } from '../../utils';
import { Search, Button, TableData, IconForm } from '../../components';
import styles from './General.module.css';
import { setData } from '../../app/reducer';
import { refreshPage } from '../../utils/refreshPage';

const cx = className.bind(styles);

function General({
    valueSearch,
    nameSearch,
    noSearch,
    onCreate,
    onUpdateRate,
    linkCreate,
    textBtnNew,
    isRefreshPage,
    textBtnUpdateAllFields,
    dataFlag,
    totalData,
    dataHeaders,
    children,
    className,
    classNameButton,
    classNameButtonUpdateAllFields,
    noActions,
    noRefresh,
    PaginationCus,
    startPagiCus,
    endPagiCus,
    dataPagiCus,
}) {
    const { state, dispatch } = useAppContext();
    const changeSearch = (e) => {
        dispatch(
            setData({
                ...state.set,
                searchValues: {
                    ...state.set.searchValues,
                    [e.target.name]: e.target.value,
                },
            })
        );
    };
    const classed = cx('general-container', className);
    const classedButton = cx('general-button', classNameButton);
    const classedButtonAllFileds = cx(
        'general-button',
        classNameButtonUpdateAllFields
    );
    return (
        <>
            <div className={classed}>
                <div className={`${cx('general-top')}`}>
                    {!noSearch && (
                        <Search
                            name={nameSearch}
                            value={valueSearch}
                            onChange={changeSearch}
                        />
                    )}
                    <div className='flex-center'>
                        {textBtnUpdateAllFields && (
                            <Button
                                className={classedButtonAllFileds}
                                onClick={onUpdateRate}
                            >
                                <span
                                    className={`${cx('general-button-icon')}`}
                                >
                                    <i className='fa-regular fa-pen-to-square'></i>
                                </span>
                                <span
                                    className={`${cx('general-button-text')}`}
                                >
                                    {textBtnUpdateAllFields}
                                </span>
                            </Button>
                        )}
                        {textBtnNew && (
                            <Button
                                className={`${classedButton} mt8-mobile`}
                                onClick={onCreate}
                                to={linkCreate}
                            >
                                <span
                                    className={`${cx('general-button-icon')}`}
                                >
                                    <i className='fa-solid fa-plus'></i>
                                </span>
                                <span
                                    className={`${cx('general-button-text')}`}
                                >
                                    {textBtnNew}
                                </span>
                            </Button>
                        )}
                        {!noRefresh && (
                            <Button
                                className='confirmbgc mt8-mobile'
                                onClick={refreshPage}
                            >
                                <div className='flex-center'>
                                    <IconForm.RefreshIcon className='fz12' />
                                    <span
                                        className={`${cx(
                                            'general-button-text'
                                        )}`}
                                    >
                                        Refresh Page
                                    </span>
                                </div>
                            </Button>
                        )}
                    </div>
                </div>
                <div className={`${cx('general-table-container')}`}>
                    <TableData
                        data={PaginationCus ? dataPagiCus : dataFlag}
                        totalData={totalData}
                        headers={dataHeaders}
                        search={valueSearch ? valueSearch : ''}
                        noActions={noActions}
                        PaginationCus={PaginationCus}
                        startPagiCus={startPagiCus}
                        endPagiCus={endPagiCus}
                    >
                        {children}
                    </TableData>
                </div>
            </div>
        </>
    );
}

General.propTypes = {
    valueSearch: PropTypes.string,
    nameSearch: PropTypes.string,
    onCreate: PropTypes.func,
    linkCreate: PropTypes.string,
    textBtnNew: PropTypes.string,
    dataFlag: PropTypes.array,
    totalData: PropTypes.number,
    dataHeaders: PropTypes.object,
    titleDelModal: PropTypes.string,
    textDelModal: PropTypes.string,
    // typeDataDel: PropTypes.node,
    nameTypeDataDel: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default General;
