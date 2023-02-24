const DataFundUsdHeader = (Icons) => {
    return {
        headers: {
            name: process.env.REACT_APP_FUND_USD_HEADER,
            index: {
                title: 'STT',
            },

            h1: {
                title: 'Tài khoản',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h2: {
                title: 'Mã HD',
            },
            h3: {
                title: 'Kỳ hạn',
            },
            h4: {
                title: 'Số tiền gửi',
            },
            h5: {
                title: 'Trạng thái',
            },
        },
    };
};

export default DataFundUsdHeader;
