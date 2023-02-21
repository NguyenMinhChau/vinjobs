const DataDepositsHistory = () => {
    return {
        headers: {
            name: process.env.REACT_APP_DEPOSITS_HISTORY,
            index: {
                title: 'STT',
            },
            h1: {
                title: 'Số tiền nạp',
            },
            h2: {
                title: 'Ngày nạp',
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

export default DataDepositsHistory;
