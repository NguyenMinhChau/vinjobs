const DataWithdrawsHistory = () => {
    return {
        headers: {
            name: process.env.REACT_APP_WITHDRAWS_HISTORY,
            index: {
                title: 'STT',
            },
            h1: {
                title: 'Số tiền rút',
            },
            h2: {
                title: 'Ngày rút',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h3: {
                title: 'Ngân hàng',
            },
            h4: {
                title: 'Người tạo',
            },
            h5: {
                title: 'Trạng thái',
            },
        },
    };
};

export default DataWithdrawsHistory;
