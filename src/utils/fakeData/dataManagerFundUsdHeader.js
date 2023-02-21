const DataManagerFundUsdHeader = () => {
    return {
        headers: {
            name: process.env.REACT_APP_MANAGER_FUND_USD_HEADER,
            index: {
                title: 'STT',
            },
            h1: {
                title: 'Mã HD',
            },
            h2: {
                title: 'Kỳ hạn',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h3: {
                title: 'Số tiền gửi',
            },
            h4: {
                title: 'Tiền giải ngân',
            },
            h5: {
                title: 'Trạng thái',
            },
        },
    };
};

export default DataManagerFundUsdHeader;
